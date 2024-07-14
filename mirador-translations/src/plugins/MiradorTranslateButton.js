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
    const { open, onClick } = this.props;
    return (
      <MiradorMenuButton
        aria-label={
          open
            ? 'Turn annotations back to Arabic'
            : 'Translate annotations into English'
        }
        style={{
          float: 'left',
          clear: 'both',
        }}
        onClick={onClick}
      >
        {open ? ChatBubbleOutline: ChatBubble}
      </MiradorMenuButton>
    );
  }
}

MiradorTranslateButton.propTypes = {
  /** The open prop tells the button to render as if the tool menu is expanded or closed **/
  open: PropTypes.bool.isRequired,
  /** The onClick prop is a function used to manage component behaviour when the component is clicked **/
  onClick: PropTypes.func.isRequired,
};

export default MiradorTranslateButton;
