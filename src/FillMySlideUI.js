import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import gapi from './gapi'
import ShapeChooser from "./ShapeChooser"
import withStyles from "@material-ui/core/styles/withStyles"
import { serialPromise } from "./serialPromise"

const styles = theme => ({
    textArea: {
        width: '100%'
    }
})

class FillMySlideUI extends Component {

    constructor(props) {
        super(props)

        this.state = {
            presentationId: "1oA1-goIekTarbBHI9Vbzks8hVanXApOxd3Bbk-GIuII",
            textShapes: []
        }
    }

    onFetchClick() {
        gapi.client.slides.presentations.get({
            presentationId: this.state.presentationId
        }).then((response) => {
            if (!response.result.slides || response.result.slides.length === 0) {
                this.setState({
                    error: "No slide in this presentation"
                })
            }
            this.setState({
                textShapes: this.getTextShape(response.result.slides[0])
            })
        }, (response) => {
            console.error(response)
        });

    }

    getTextShape = (slide) => {
        this.setState({
            pageObjectId: slide.objectId
        })
        console.log(slide)

        return slide.pageElements.filter(e => {
            if (!e.shape) return 0
            return e.shape.shapeType === "TEXT_BOX"
        }).map(pageElement => {
            const text = pageElement.shape.text.textElements.reduce((acc, textElement) => {
                if (!textElement.textRun || !textElement.textRun.content) return acc
                acc += textElement.textRun.content
                return acc
            }, '')

            return {
                objectId: pageElement.objectId,
                text: text
            }
        })
    }

    onPresentationLinkChange(e) {
        const value = e.target.value
        const id = value.substring(
            value.lastIndexOf("presentation/d/") + "presentation/d/".length,
            value.lastIndexOf("/edit")
        );

        this.setState({
            presentationId: id
        })
        console.log(id)
    }

    selectedShapes(data) {
        this.setState({
            selectedShapes: data
        })
        console.log(data)
    }

    onReplacementDataChange(data) {
        this.setState({
            replacementData: JSON.parse(data)
        })
    }

    onGenerateClick() {
        console.log(this.state)

        const promises = []

        this.state.replacementData.forEach(data => {
            promises.push(gapi.client.slides.presentations.batchUpdate({
                presentationId: this.state.presentationId,
                requests: this.generateRequest(data)
            }))

            // noinspection JSDeprecatedSymbols
            promises.push(gapi.client.slides.presentations.pages.getThumbnail({
                "presentationId": this.state.presentationId,
                "pageObjectId": this.state.pageObjectId,
                "thumbnailProperties.mimeType": "PNG",
                "thumbnailProperties.thumbnailSize": "LARGE"
            }))
        })

        serialPromise(promises, status => {
            console.log("position: " + status)
        }).then(results => {
            console.log("promise done", results)
            results.forEach(result => {
                if(result.contentUrl) {
                    console.log(result.contentUrl)
                }
            })
        })

        /*
        const requests = this.generateRequest();

        gapi.client.slides.presentations.batchUpdate({
            presentationId: this.state.presentationId,
            requests: requests
        }).then((batchUpdateResponse) => {
            console.log(batchUpdateResponse)
        });*/
    }

    generateRequest(data) {
        const requests = []

        const keys = Object.keys(data)

        this.state.selectedShapes.forEach((shape, index) => {
            requests.push({
                deleteText: {
                    objectId: shape.objectId,
                    textRange: {
                        type: 'ALL'
                    }
                }
            })
            requests.push({
                insertText: {
                    objectId: shape.objectId,
                    insertionIndex: 0,
                    text: data[keys[index]]
                }
            })
        })

        return requests
    }

    screenshot() {
        // noinspection JSDeprecatedSymbols
        return gapi.client.slides.presentations.pages.getThumbnail({
            "thumbnailProperties.mimeType": "PNG",
            "thumbnailProperties.thumbnailSize": "LARGE"
        })
    }

    render() {
        const {classes} = this.props

        return (
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="presentation url"
                        name="Presentation URL"
                        label="Presentation URL"
                        fullWidth
                        onChange={e => this.onPresentationLinkChange(e)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ShapeChooser
                        shapes={this.state.textShapes}
                        onShapeSelected={(selectedShapes) => this.selectedShapes(selectedShapes)}/>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="replacementData"
                        label="Multiline"
                        multiline
                        rowsMax="20"
                        className={classes.textArea}
                        onChange={(data, value) => this.onReplacementDataChange(data.target.value)}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={() => this.onFetchClick()}>1. Fetch</Button><br/>
                    2. Fill the replacementData<br/>
                    <Button variant="contained" onClick={() => this.onGenerateClick()}>3. Generate</Button><br/>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(FillMySlideUI);
