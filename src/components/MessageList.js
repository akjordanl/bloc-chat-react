import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: ''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');

  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  handleChange (e) {
    this.setState( {newMessage: e.target.value });
  }

  sendMessage (e) {
    e.preventDefault();
    const newMessage = this.state.newMessage;
    console.log(newMessage, this.state.newMessage);
    this.messagesRef.push({
      content: newMessage,
      username: this.props.user ? this.props.user.displayName : 'Guest',
      roomId: this.props.activeRoomKey,
      sentAt: Date(this.props.firebase.database.ServerValue.TIMESTAMP)
    });
    this.setState( { newMessage: ''} );
  }

  render() {

    const activeRoom = this.state.messages.filter(
      message => message["roomId"] == this.props.activeRoomKey
      );

    return (
      <div>
        <table>
          <tr>
            <th>Username</th>
            <th>Content</th>
            <th>Time</th>
          </tr>
          { activeRoom.map( (message) =>
             <tr>
               <td> { message["username"] } </td>
               <td> { message["content"] } </td>
               <td> { message["sentAt"] } </td>
             </tr>
          )}
         </table>
         <div>
           <form onSubmit={ (e) => this.sendMessage(e) }>
             <textarea
               name="message"
               placeholder="Type your message here"
               rows="3"
               value={this.state.newMessage}
               onChange={ (e) => this.handleChange(e) }
               >
             </textarea>
             <input type="submit"/>
           </form>
         </div>
      </div>
    )
  };

}

export default MessageList;
