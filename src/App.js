import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import { Route, Link } from 'react-router-dom';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <div class="grid-container">
          <div id="mySidenav" class="sidenav">
            <h1>Bloc Chat</h1>
            <RoomList
              firebase={firebase}
            />
          </div>
          <div>
            Rooms content will go here
          </div>
        </div>
      </div>
    );
  }
}

export default App;
