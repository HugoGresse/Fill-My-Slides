import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import gapi from "../gapi";
import ShapeChooser from "./ShapeChooser";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { generateScreenshots } from "./utils/ScreenshotsProcess";
import CircularProgress from "@material-ui/core/CircularProgress";
import getTextShape from "./utils/getTextShape";
import getImageShape from "./utils/getImageShape";

const styles = (theme) => ({
  card: {
    padding: 20,
    textAlign: "left",
  },
  numberContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 16,
    width: 40,
    height: 40,
    lineHeight: "40px",
    background: "#8888FF",
    color: "#fff",
    borderRadius: 20,
  },
  previewContainer: {
    border: "1px solid #eee",
    borderRadius: 5,
    padding: 5,
  },
  textArea: {
    width: "100%",
  },
  lastBlock: {
    marginBottom: 40,
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    "& > div": {
      display: "flex",
      alignItems: "center",
      "& > p": {
        marginLeft: 10,
      },
    },
  },
});

class FillMySlideUI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presentationId: null,
      textShapes: [],
      imageShapes: [],
    };
  }

  onPresentationLinkChange(e) {
    const value = e.target.value;

    if (!value.startsWith("https://docs.google.com")) {
      this.setState({
        error: "Presentation URL not valid",
      });
      return;
    }

    const id = value.substring(
      value.lastIndexOf("presentation/d/") + "presentation/d/".length,
      value.lastIndexOf("/edit")
    );

    this.setState({
      presentationId: id,
    });

    this.fetchSlides(id);
  }

  fetchSlides(presentationId) {
    gapi.client.slides.presentations
      .get({
        presentationId: presentationId,
      })
      .then(
        (response) => {
          if (!response.result.slides || response.result.slides.length === 0) {
            this.setState({
              error: "No slide in this presentation",
            });
          }
          const firstSlide = response.result.slides[0];
          this.setState({
            slideTitle: response.result.title,
            pageObjectId: firstSlide.objectId,
            textShapes: getTextShape(firstSlide),
            imageShapes: getImageShape(firstSlide),
          });
          this.getReferenceThumbnail(
            this.state.presentationId,
            firstSlide.objectId
          );
        },
        (response) => {
          console.error(response);
        }
      );
  }

  getReferenceThumbnail(presentationId, pageObjectId) {
    // noinspection JSDeprecatedSymbols
    gapi.client.slides.presentations.pages
      .getThumbnail({
        presentationId: presentationId,
        pageObjectId: pageObjectId,
        "thumbnailProperties.mimeType": "PNG",
        "thumbnailProperties.thumbnailSize": "SMALL",
      })
      .then((response) => {
        if (response.status !== 200) {
          this.setState({
            error:
              "Failed to get reference screenshots: " +
              JSON.stringify(response.statusText),
          });
          return;
        }
        this.setState({
          referenceThumbnail: response.result.contentUrl,
        });
      });
  }

  onSelectedTextShape(data) {
    this.setState({
      selectedTextShape: data,
    });
  }

  onSelectedImageShape(data) {
    this.setState({
      selectedImageShape: data,
    });
  }

  onReplacementDataChange(data) {
    const replacementData = JSON.parse(data);
    this.setState({
      replacementData: replacementData,
      totalItems: replacementData.length,
    });
  }

  onGenerateClick() {
    if (!this.state.replacementData) {
      this.setState({
        error: "No json",
      });
      return;
    }
    if (!this.state.presentationId) {
      this.setState({
        error: "No presentation",
      });
      return;
    }
    if (!this.state.selectedTextShape && !this.state.selectedImageShape) {
      this.setState({
        error: "No selected text/image to be replaced",
      });
      return;
    }

    const state = this.state;
    generateScreenshots(
      state.presentationId,
      state.pageObjectId,
      state.replacementData,
      state.selectedTextShape,
      state.selectedImageShape,
      (progress) => {
        this.setState({
          progress: progress,
        });
      },
      (result) => {
        this.setState({
          progress: 0,
        });
      },
      (inProgress) => {
        this.setState({
          zipProgress: inProgress,
        });
      }
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={1} className={classes.lastBlock}>
        <Grid item xs={1} className={classes.numberContainer}>
          <div className={classes.number}>1</div>
        </Grid>
        <Grid item xs={11}>
          <Paper className={classes.card}>
            <Grid container>
              <Grid item xs={12}>
                <Typography>Fill your presentation URL</Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoFocus
                  required
                  id="presentation url"
                  name="Presentation URL"
                  label="Presentation URL"
                  fullWidth
                  onChange={(e) => this.onPresentationLinkChange(e)}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={1} className={classes.numberContainer}>
          <div className={classes.number}>2</div>
        </Grid>

        <Grid item xs={11}>
          <Paper className={classes.card}>
            <Typography>Select the text/image you want to replace</Typography>
            <Typography variant="caption">
              (the order you select them are important)
            </Typography>

            <Grid container>
              <Grid item xs={6}>
                <ShapeChooser
                  shapes={this.state.textShapes}
                  onShapeSelected={(selectedTextShape) =>
                    this.onSelectedTextShape(selectedTextShape)
                  }
                />
                <ShapeChooser
                  shapes={this.state.imageShapes}
                  onShapeSelected={(selectedTextShape) =>
                    this.onSelectedImageShape(selectedTextShape)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                {this.state.slideTitle && (
                  <div className={classes.previewContainer}>
                    <Typography>{this.state.slideTitle}</Typography>
                    {this.state.referenceThumbnail && (
                      <img
                        src={this.state.referenceThumbnail}
                        alt="Slide preview"
                      />
                    )}
                  </div>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={1} className={classes.numberContainer}>
          <div className={classes.number}>3</div>
        </Grid>
        <Grid item xs={11}>
          <Paper className={classes.card}>
            <Typography>Paste your data here</Typography>
            <Typography variant="caption">
              {JSON.stringify(
                [
                  {
                    key1: "value1",
                    key2: "value2",
                  },
                  {
                    key1: "value3",
                    key2: "value4",
                  },
                  {
                    "...": "...",
                  },
                ],
                null,
                4
              )}
            </Typography>
            <br />
            <Typography variant="caption">
              Images should be an http(s) url, "imageId" is the id of the image
              in the final zip file
            </Typography>

            <TextField
              id="replacementData"
              label="json"
              multiline
              rows="5"
              rowsMax="20"
              className={classes.textArea}
              onChange={(data, value) =>
                this.onReplacementDataChange(data.target.value)
              }
              margin="normal"
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          {this.state.error && (
            <Grid item xs={12}>
              <Paper className={classes.card}>
                <Typography>{this.state.error}</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>

        <Grid item xs={1} className={classes.numberContainer}>
          <div className={classes.number}>4</div>
        </Grid>
        <Grid item xs={11}>
          <Paper className={classes.card}>
            <Grid container>
              <Grid item xs={4}>
                <Button
                  disable={(this.state.progress > 0).toString()}
                  variant="contained"
                  onClick={() => this.onGenerateClick()}
                >
                  Generate
                </Button>
              </Grid>

              <Grid item xs={8} className={classes.progressContainer}>
                {this.state.progress > 0 && (
                  <div>
                    <CircularProgress
                      variant="static"
                      value={
                        (100 * (this.state.progress / 2)) /
                        this.state.totalItems
                      }
                    />
                    <Typography>
                      {this.state.progress / 2} / {this.state.totalItems}
                    </Typography>
                  </div>
                )}

                {this.state.zipProgress && <Typography>Zipping...</Typography>}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(FillMySlideUI);
