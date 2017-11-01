import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    const {messages, currentUser, previousUser} = this.props;
    const makeMessages = messages.map(message => <Message key={message.id} username={message.username} content={message.content}/>)
    return (
      <main className="messages">
        {makeMessages}
        <div className="message system">
          {previousUser} changed their name to {currentUser}.
        </div>
      </main>
    );
  }
}
export default MessageList;