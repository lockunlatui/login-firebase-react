import './App.css';
import firebase from 'firebase/app';
import React from 'react';
import 'firebase/auth';

function App() {
  // TODO: Replace the following with your app's Firebase project configuration
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field

  React.useEffect(() => {
    const initAppFireBase = () => {
      const firebaseConfig = {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: '',
      };

      // Initialize Firebase
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        firebase.app(); // if already initialized, use that one
      }
    };
    initAppFireBase();
  }, []);

  function loginGoogle() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          console.log(`result:`, result);
        })
        .catch(function (error) {
          var errorCode = error.code;

          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert(
              'You have already signed up with a different auth provider for that email.'
            );
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
        });
    } else {
      firebase.auth().signOut();
    }
  }

  function loginFacebook() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('user_birthday');
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          console.log('result facebook', result);
        })
        .catch(function (error) {
          var errorCode = error.code;

          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert(
              'You have already signed up with a different auth provider for that email.'
            );
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
        });
    } else {
      firebase.auth().signOut();
    }
  }

  function loginAzure() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.OAuthProvider('microsoft.com');
      provider.setCustomParameters({
        prompt: 'consent',
        tenant: 'tenantId',
      });
      provider.addScope('User.Read');
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          // This gives you a Microsoft Access Token. You can use it to access the Microsoft API.
          console.log('microsoft result', result);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;

          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert(
              'You have already signed up with a different auth provider for that email.'
            );
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
        });
    } else {
      firebase.auth().signOut();
    }
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={() => loginGoogle()}>Login Google </button>
        <button onClick={() => loginFacebook()}>Login Facebook </button>
        <button onClick={() => loginAzure()}>Login Azure </button>
      </header>
    </div>
  );
}

export default App;
