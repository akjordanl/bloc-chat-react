import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
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
      </div>
    )
  };

}

export default MessageList;
