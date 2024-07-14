import React from 'react';
import MiradorTranslateButton from './MiradorTranslateButton';

class MiradorTranslate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onClickHandler() {
    this.setState((prevState) => ({ open: !prevState.open }));
  }
  render() {
    return (
      <MiradorTranslateButton
        onClick={() => this.onClickHandler()}
        open={this.state.open}
      />
    );
  }
}

export default MiradorTranslate;
