import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"

class ShapeChooser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedShapes: [],
        }
    }

    onShapeSelected = (e, item) => {
        let selectedShapes = this.state.selectedShapes
        if (e) {
            selectedShapes.push(item)
        } else {
            selectedShapes = selectedShapes.filter(e => e.objectId !== item.objectId)
        }
        this.setState({
            selectedShapes: selectedShapes
        })
        this.props.onShapeSelected(selectedShapes)
    }

    render() {
        return (
            <Grid container>
                {this.props.shapes.map(shape => {
                    return <Grid item xs={12} key={shape.objectId}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={(e, checked) => this.onShapeSelected(checked, shape)}
                                    value={shape.text}
                                    color="primary"
                                />
                            }
                            label={shape.text}
                        />
                    </Grid>
                })}
            </Grid>
        );
    }
}

export default ShapeChooser;
