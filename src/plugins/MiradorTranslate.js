import React from 'react';
import MiradorTranslateButton from './MiradorTranslateButton';

class MiradorTranslate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: false,
      englishAnnotations: null
    };
  }

  onClickHandler() {
    this.setState((prevState) => ({ translate: !prevState.translate  }));
    const translate = this.state.translate;
    const languageRoute = translate ? '/en/' : '/ar/';
    const languageSwap = translate ?  '/ar/' : '/en/';
    const canvasId = this.props.canvas.id;  // get current canvas ID
    console.log(this.state.englishAnnotations);
    // get annotation using URL

    //console.log(languageRoute, languageSwap, translate, canvasId, annotationId);
    //this.props.toggleTranslate(translate, canvasId, annotation);

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.annotationId !== this.props.annotationId) {
      if (this.props.annotationId) {
        fetch(this.props.annotationId)
            .then((respo) => {
              return respo.json();
            })
            .then((data) => {
              this.setState({englishAnnotations: data});
            });
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
        <div style={{display: "flex"}}>
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
