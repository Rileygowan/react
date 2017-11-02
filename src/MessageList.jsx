import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    const {messages, currentUser, previousUser, notifications} = this.props;
    let notification = notifications.map(n => <div className="message system" key={n.id}>{n.content}</div>)
    const makeMessages = messages.map(message => <Message key={message.id} username={message.username} content={message.content}/>)
    return (
      <main className="messages">
        {notification}
        {makeMessages}
      </main>
    );
  }
}
export default MessageList;