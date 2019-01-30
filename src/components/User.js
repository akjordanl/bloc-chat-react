import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    /* State would go here */

    /* Other things go here */
  }

  /* Methods go here */

  signIn () {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ) /* Chain below */
    .then( (result) => {
      // var user = result.user;
      // this.props.setUser(user);
    })
    .catch( (error) => {
      var errorCode = error.code;
      var errorMessage = error.Message;
    })
  }

  signOut () {
    this.props.firebase.auth().signOut()
    .then( () => {
      this.props.setUser(null);
    })
    .catch( (error) => {
    });
  }

  componentDidMount () {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    })
  }

  render() {
    return (
      <div>
        <div> Current user: {this.props.user ? this.props.user.displayName : 'Guest'} </div>
        <span>
          <button
            type="button"
            onClick={() => this.signIn()}
          >
            Log in
          </button>
        </span>
        <span>
          <button
            type="button"
            onClick={() => this.signOut()}
          >
            Log out
          </button>
        </span>
      </div>
    )
  };
}

export default User;
