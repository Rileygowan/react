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
        <input className="chatbar-username" placeholder="Your Name (Optional)"  onChange={this._handleUsernameChange} defaultValue={this.props.currentUser} />
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
      this.setState({content: event.target.value})
      if (!this.state.username) {
        this.setState({username: this.props.currentUser})
      }
      setTimeout(() => { this.props.messageCreated(this.state) }, 1);
    }
  }
}
export default ChatBar;