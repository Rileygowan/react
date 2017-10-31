import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

  render() {

    const {messages} = this.props;
    const makeMessage = messages.map((message)=> <Message username={message.username} content={message.content}/>)


    return (
    <main className="messages">
      {makeMessage}
    </main>
    );
  }
}
export default MessageList;