import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
/* import { Route, Link } from 'react-router-dom';*/
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDLavZrIRxo3q_YiSbxVl6HYe45iSVDbag",
  authDomain: "bloc-chat-react-7e217.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-7e217.firebaseio.com",
  projectId: "bloc-chat-react-7e217",
  storageBucket: "bloc-chat-react-7e217.appspot.com",
  messagingSenderId: "730942096337"
};
  firebase.initializeApp(config);



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoomKey: '',
      activeRoomName: 'Please select a room from the list on the left',
      user: 'Guest'
    };

  }

  setActiveRoomInfo(roomKey, roomName) {
    this.setState({ activeRoomKey: roomKey, activeRoomName:  roomName});
    console.log(roomKey, roomName);
  }

  setUser(user) {
    this.setState({user: user});
  }

  render() {
    return (
      <div className="App">
        <div className="grid-container">
          <div id="mySidenav" className="sidenav">
            <h1>Bloc Chat</h1>
            <User
              firebase={firebase}
              user={this.state.user}
              setUser={(user) => this.setUser(user)}
            />
            <RoomList
              firebase={firebase}
              setActiveRoomInfo={(roomKey, roomName) => this.setActiveRoomInfo(roomKey, roomName)}
            />
          </div>
          <div>
            <h2> Room: {this.state.activeRoomName} </h2>
            <MessageList
              firebase={firebase}
              activeRoomKey={this.state.activeRoomKey}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
