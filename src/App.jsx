import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser:  {
        name: "Anonymous",
        color: null
      },
      messages: []
    };
  }

//INITIALIZE CONNECTION WITH SERVER
componentDidMount() {
  const chattySocket = new WebSocket("ws://localhost:3001");
  this.setState({chattySocket});
  chattySocket.onopen = (event) => {
    console.log("Connected to server.");

    // RECEIVE MESSAGE FROM SERVER
    chattySocket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
        switch(newData.type) {
          case "incomingMessage":
            let messages = this.state.messages.concat(newData);
            this.setState({messages});
            break;
          case "incomingNotification":
            messages = this.state.messages.concat(newData);
            this.setState({messages});
            break;
          case "color":
            this.state.currentUser.color = newData.color;
            break;
          case "users":
            let users = newData.data;
            this.setState({users});
            break;
          default:
            console.log('This is not supposed to happen');
          throw new Error("Unknown event type " + newData.type);
          }
        };
      };
    }

  //SEND MESSAGE TO SERVER
  _sendMessage = (data) => {
    if (data.newUsername){this.state.currentUser.name = data.newUsername;}
    this.state.chattySocket.send(JSON.stringify(data))
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            AndChat
            <div className="current-users">
              {this.state.users}
            </div>
          </a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} messageCreated={this._sendMessage}/>
      </div>
    );
  }
}
export default App;