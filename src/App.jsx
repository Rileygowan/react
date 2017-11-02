import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    //Alternate way of binding
    // this._sendMessage = this._sendMessage.bind(this)
    this.state = {
      currentUser: {name: "Anonymous"},
      previousUser: {name: "Anonymous"},
      messages: [],
      notifications: []
    };
  }

  //INITIALIZE CONNECTION WITH SERVER
  componentDidMount() {
    const chattySocket = new WebSocket("ws://localhost:3001");
    this.setState({chattySocket})
    chattySocket.onopen = (event) => {
      console.log("Connected to server.")


      // RECEIVE MESSAGE FROM SERVER
      chattySocket.onmessage = (event) => {
        const newData = JSON.parse(event.data);
          switch(newData.type) {
            case "incomingMessage":
              const messages = this.state.messages.concat(newData)
              this.setState({messages})
              break;
            case "incomingNotification":
              const notifications = this.state.notifications.concat(newData)
              this.setState({notifications})
              break;
            default:
              console.log('This is not supposed to happen')
            throw new Error("Unknown event type " + data.type);
          // const messages = this.state.messages.concat(newMessage)
          // this.setState({messages})
        }
      }
    };
  }

  //SEND MESSAGE TO SERVER
  _sendMessage = (data) => {
    if (data.newUsername){this.state.currentUser.name = data.newUsername;}
    this.state.chattySocket.send(JSON.stringify(data))
  }
   //  var msg = {
   //    type:     "message",
   //    content:   data.content,
   //    username:  data.username,
   //  };
   // if (this.state.currentUser.name != data.username) {
   //    this.state.previousUser.name = this.state.currentUser.name;
   //    this.state.currentUser.name = data.username;
   //  }
   //  this.state.chattySocket.send(JSON.stringify(msg));
  // }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList notifications={this.state.notifications} previousUser={this.state.previousUser.name} currentUser={this.state.currentUser.name} messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} messageCreated={this._sendMessage}/>
      </div>
    );
  }
}
export default App;