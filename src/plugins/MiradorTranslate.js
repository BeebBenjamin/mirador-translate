import React from 'react';
import MiradorTranslateButton from './MiradorTranslateButton';

class MiradorTranslate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: true,
      arabicAnnotations: null,
      englishAnnotations: null,
      savedAnnotations: null,
      canvasId: this.props.canvasId,
      annotationId: this.props.annotationId,
      languageRoute: '/en/',
      languageSwap: '/ar/',
    };
  }

  _buildArabicAnnotationPayload(annotationId, json) {
    //console.log(json);
    let arabicPayload = JSON.parse(
      JSON.stringify(this.props.state.annotations)
    );
    //arabicPayload[this.state.canvasId][this.props.annotationId] = arabicPayload[this.state.canvasId][annotationId];
    console.log(arabicPayload);
    arabicPayload[this.state.canvasId][this.props.annotationId]['json'] = json;
    delete arabicPayload[this.state.canvasId][annotationId];
    return arabicPayload;
  }

  _buildEnglishAnnotationPayload(annotationId, json) {
    // it seems this.props.state.annotations is mutable (even though it shouldn't be, so do a deep copy to prevent mutation)
    let englishPayload = JSON.parse(
      JSON.stringify(this.props.state.annotations)
    );
    englishPayload[this.state.canvasId][annotationId] =
      englishPayload[this.state.canvasId][this.props.annotationId];
    englishPayload[this.state.canvasId][annotationId]['json'] = json;
    delete englishPayload[this.state.canvasId][this.props.annotationId];
    return englishPayload;
  }

  onClickHandler() {
    this.setState((prevState) => ({ translate: !prevState.translate }));
    const languageRoute = '/en/';
    const languageSwap = '/ar/';
    const annotationId = this.props.annotationId.replace(
      languageSwap,
      languageRoute
    );
    if (this.state.translate) {
      this.props.updateAnnotations(
        this.props.canvasId,
        this.props.annotationId,
        this.state.englishAnnotations
      );
    } else {
      this.props.updateAnnotations(
        this.props.canvasId,
        this.props.annotationId,
        this.state.arabicAnnotations[this.props.canvasId][
          this.props.annotationId
        ].json
      );
    }
  }

  componentDidMount() {
    if (this.props.annotationId) {
      const languageRoute = '/en/';
      const languageSwap = '/ar/';
      const annotationId = this.props.annotationId.replace(
        languageSwap,
        languageRoute
      );
      fetch(annotationId)
        .then((respo) => {
          return respo.json();
        })
        .then((data) => {
          this.setState({
            englishAnnotations: data,
            arabicAnnotations: this.props.state.annotations,
            canvasId: this.props.canvasId,
            annotationId: annotationId,
          });
        })
        .catch((error) => {
          this.setState({
            englishAnnotations: null,
            arabicAnnotations: null,
            canvasId: this.props.canvasId,
            annotationId: annotationId,
          });
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.annotationId !== this.props.annotationId) {
      if (this.state.englishAnnotations === null) {
        if (this.props.annotationId) {
          const languageRoute = '/en/';
          const languageSwap = '/ar/';
          const annotationId = this.props.annotationId.replace(
            languageSwap,
            languageRoute
          );
          fetch(annotationId)
            .then((respo) => {
              return respo.json();
            })
            .then((data) => {
              this.setState({
                englishAnnotations: data,
                arabicAnnotations: this.props.state.annotations,
                canvasId: this.props.canvasId,
                annotationId: annotationId,
              });
            })
            .catch((error) => {
              this.setState({
                englishAnnotations: null,
                arabicAnnotations: null,
                canvasId: this.props.canvasId,
                annotationId: annotationId,
              });
            });
        }
      }
    }
  }

  render() {
    const {
      canvases,
      config,
      switchToSingleCanvasView,
      TargetComponent,
      targetProps,
      windowViewType,
    } = this.props;
    return (
      <div style={{ display: 'flex' }}>
        <TargetComponent
          {...targetProps} // eslint-disable-line react/jsx-props-no-spreading
        />
        <MiradorTranslateButton
          onClick={() => this.onClickHandler()}
          translate={this.state.translate}
        />
      </div>
    );
  }
}

export default MiradorTranslate;
