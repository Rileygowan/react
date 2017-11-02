import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"  onKeyPress={this._createNotification} defaultValue={this.props.currentUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this._createMessage}/>
      </footer>
    );
  }

  //UPDATES THIS.STATE ONKEYPRESS
  //TRIGGERS MESSAGECREATED AFTER TIMEOUT
  _createMessage = (event) => {
    if (event.key === 'Enter') {
      var message = {
        type:     "postMessage",
        content:   event.target.value,
        username:  this.props.currentUser
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
      if (event.target.value != this.props.currentUser) {
        if (event.target.value === '') {
          event.target.value = 'Anonymous';
        }
        let notification = {
          newUsername: event.target.value,
          type: "postNotification",
          content: `${this.props.currentUser} has changed their name to ${event.target.value}`
        }
        this.props.messageCreated(notification)
      }
    }
  }
}
export default ChatBar;