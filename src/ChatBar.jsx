import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {
    super(props),
    this.state = {
      username: '',
      content: ''
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"  onKeyPress={this._createNotification} onChange={this._handleUsernameChange} defaultValue={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._createMessage}/>
      </footer>
    );
  }
  //UPDATES THIS.STATE ONCHANGE
  _handleUsernameChange = (event) => {
    this.setState({username: event.target.value})
  }

  //UPDATES THIS.STATE ONKEYPRESS
  //TRIGGERS MESSAGECREATED AFTER TIMEOUT
  _createMessage = (event) => {
    if (event.key === 'Enter') {
      var message = {
        type:     "postMessage",
        content:   event.target.value,
        username:  this.state.username
      };
      // this.setState({content: event.target.value})
      // if (!this.state.username) {
      //   this.setState({username: this.props.currentUser})
      // }
      this.props.messageCreated(message)
    }
  }

  //CREATE NOTIFICATION
  _createNotification = (event) => {
    if (event.key === 'Enter') {
      if (this.state.username != this.props.currentUser) {
        let notification = {
          newUsername: this.state.username,
          type: "postNotification",
          content: `${this.props.currentUser} has changed their name to ${this.state.username}`
        }
        this.props.messageCreated(notification)
      }
    }
  }
}
export default ChatBar;