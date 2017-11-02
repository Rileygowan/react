import React, {Component} from 'react';

class Message extends Component {
  render() {
    const {username, content, type, color} = this.props;
    if (type === "incomingNotification"){
      return (
      <div className="message system">{content}</div>
      );
    } else {
      return (
          <div className="message">
            <span style={{color}} className="message-username">{username}</span>
            <span className="message-content">{content}</span>
          </div>
      );
    }
  }
}
export default Message;