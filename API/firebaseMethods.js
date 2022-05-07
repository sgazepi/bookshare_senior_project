import * as firebase from 'firebase/compat';
import {Alert} from 'react-native';

export const registration = async (email, password, lastName, firstName, phoneNumber) => {
  if (email.endsWith("@yale.edu")){
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      userCredentials.user.updateProfile({
          displayName: firstName
      }).then(() => {
          userCredentials.user.sendEmailVerification()
          .then(() => {    
            const db = firebase.firestore();
            db.collection("users")
              .doc(userCredentials.user.uid)
              .set({
                uid: userCredentials.user.uid,
                email: userCredentials.user.email,
                lastName: lastName,
                firstName: firstName,
                phoneNumber: phoneNumber,
              });
            return true;
          });
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
      });
    })
  } else {
    this.setState({ errorMessage: 'Please use your "yale.edu" address.'})
  }
}
export const signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password).then(() => {
        return true;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
      });
}

export const loggingOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}
