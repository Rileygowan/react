import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const {currentUser} = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;