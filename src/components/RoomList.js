import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleChange (e) {
    this.setState( {newRoomName: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    const newRoomName = this.state.newRoomName;
    console.log(newRoomName, this.state.newRoomName);
    this.roomsRef.push({
      name: newRoomName});
    console.log(this.state.rooms);
  }


  render () {
    return (
      <div>
        <div>
          <form onSubmit={ (e) => this.createRoom(e) }>
            <p>Create new room</p>
            <label>
              New room name:
              <input
                type="text"
                onChange= { (e) => this.handleChange(e) }
                />
            </label>
            <input type="submit"/>
          </form>
        </div>
        <div>
          <ul>
            { this.state.rooms.map( (room) =>
              <li
                key={room.key}
                onClick={ () => this.props.setActiveRoomInfo(room.key, room["name"]) }
              >
                {room["name"]}
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  };
}

  export default RoomList;
