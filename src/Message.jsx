import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log('Rendering <Message/>')
    return (
      <span>
      <div className="message">
        <span className="message-username">Anonymous1</span>
        <span className="message-content">I won&#39;t be impressed with technology until I can download food.</span>
      </div>
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
      </span>
    );
  }
}
export default Message;