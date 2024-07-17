import React from 'react';
import ChatBubble from '@material-ui/icons/ChatBubble';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import { MiradorMenuButton } from 'mirador/dist/es/src/components/MiradorMenuButton';
import PropTypes from 'prop-types';

/**
 * The MiradorTranslateButton component is the main plug-in button used to toggle translated annotations on or off.
 * The icon used by the component toggles with its open state.
 */
class MiradorTranslateButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { translate, onClick } = this.props;
    return (
      <MiradorMenuButton
        aria-label={
          translate
            ? 'Translate annotations into English'
            : 'Turn annotations back to Arabic'
        }
        style={{
          float: 'left',
          clear: 'both',
        }}
        onClick={onClick}
      >
        {translate ? <ChatBubble /> : <ChatBubbleOutline />}
      </MiradorMenuButton>
    );
  }
}

MiradorTranslateButton.propTypes = {
  /** The translate prop tells the button to render as if the annotations are translated or not **/
  translate: PropTypes.bool.isRequired,
  /** The onClick prop is a function used to manage component behaviour when the component is clicked **/
  onClick: PropTypes.func.isRequired,
};

export default MiradorTranslateButton;
