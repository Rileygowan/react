import React, {Component} from 'react';

class Message extends Component {
  render() {
    const {username, content} = this.props;
    return (
      <span>
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
      </span>
    );
  }
}
export default Message;