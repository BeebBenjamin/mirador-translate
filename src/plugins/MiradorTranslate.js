import React from 'react';
import MiradorTranslateButton from './MiradorTranslateButton';

class MiradorTranslate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: false,
      englishAnnotations: null,
    };
  }

  onClickHandler() {
    this.setState((prevState) => ({ translate: !prevState.translate }));
    console.log(this.state.englishAnnotations);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.annotationId !== this.props.annotationId ||
      prevState.translate !== this.state.translate
    ) {
      if (this.props.annotationId) {
        console.log(this.state.translate);
        const languageRoute = this.state.translate ? '/ar/' : '/en/';
        const languageSwap = this.state.translate ? '/en/' : '/ar/';
        const annotationId = this.props.annotationId.replace(
          languageSwap,
          languageRoute
        );
        console.log(annotationId);

        fetch(annotationId)
          .then((respo) => {
            return respo.json();
          })
          .then((data) => {
            this.setState({ englishAnnotations: data });
          })
          .catch((error) => {
            this.setState({ englishAnnotations: null });
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
