import React from 'react';
import PropTypes from 'prop-types';
import MiradorTranslateButton from './MiradorTranslateButton';

class MiradorTranslate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arabicAnnotations: {},
      englishAnnotations: {},
    };
    this.annotationId = this.props.annotationId;
    this.translate = false;
  }

  onClickHandler() {
    this.translate = !this.translate;

    if (this.translate) {
      this.props.updateAnnotations(
        this.props.canvasId,
        this.props.annotationId,
        this.state.englishAnnotations
      );
    } else {
      this.props.updateAnnotations(
        this.props.canvasId,
        this.props.annotationId,
        this.state.arabicAnnotations
      );
    }
  }

  getEnglishAnnotations(annotationId) {
    fetch(annotationId)
      .then((respo) => {
        return respo.json();
      })
      .then((data) => {
        this.setState({
          englishAnnotations: data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getArabicAnnotations(annotationId) {
    fetch(annotationId)
      .then((respo) => {
        return respo.json();
      })
      .then((data) => {
        this.setState({
          arabicAnnotations: data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.annotationId) {
      if (this.translate) {
        this.translate = false;
      }
      const languageRoute = '/en/';
      const languageSwap = '/ar/';
      const annotationId = this.props.annotationId.replace(
        languageSwap,
        languageRoute
      );
      this.getEnglishAnnotations(annotationId);
      this.getArabicAnnotations(this.props.annotationId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.annotationId !== this.props.annotationId) {
      if (this.translate) {
        this.translate = false;
        this.props.updateAnnotations(
          prevProps.canvasId,
          prevProps.annotationId,
          prevState.arabicAnnotations
        );
      }
      if (this.props.annotationId) {
        const languageRoute = '/en/';
        const languageSwap = '/ar/';
        const annotationId = this.props.annotationId.replace(
          languageSwap,
          languageRoute
        );
        this.getEnglishAnnotations(annotationId);
        this.getArabicAnnotations(this.props.annotationId);
      }
    }
  }

  render() {
    const { TargetComponent, targetProps } = this.props;
    return (
      <div style={{ display: 'flex' }}>
        <TargetComponent
          {...targetProps} // eslint-disable-line react/jsx-props-no-spreading
        />
        <MiradorTranslateButton
          onClick={() => this.onClickHandler()}
          translate={this.translate}
        />
      </div>
    );
  }
}

MiradorTranslate.propTypes = {
  /** **/
  canvasId: PropTypes.string.isRequired,
  /** **/
  annotationId: PropTypes.string.isRequired,
  /** **/
  state: PropTypes.object.isRequired,
  /** **/
  updateAnnotations: PropTypes.func.isRequired,
  /** **/
  TargetComponent: PropTypes.func.isRequired,
  /** **/
  targetProps: PropTypes.object.isRequired,
};

export default MiradorTranslate;
