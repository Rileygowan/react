import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    const {messages, currentUser, previousUser} = this.props;
    const makeMessages = messages.map(message => <Message key={message.id} type={message.type} username={message.username} content={message.content}/>)
    return (
      <main className="messages">
        {makeMessages}
      </main>
    );
  }
}
export default MessageList;