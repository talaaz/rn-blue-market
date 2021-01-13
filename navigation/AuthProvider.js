import React, { createContext, useState } from "react";

import { firebase } from "../firebase";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log(user.email);
      // ...
    } else {
      // User is signed out
      // ...
      console.log("User signed out.");
    }
  });
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        loginAnonymously: async () => {
          setLoading(true);
          await firebase
            .auth()
            .signInAnonymously()
            .then((user) => {
              //TODO set up anonymous user locally.
            })
            .catch((error) => {
              console.log(error);
            });
          setLoading(false);
        },
        loginWithEmailAndPassword: async (email, password) => {
          setLoading(true);

          //TODO Firebase Login check
          await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
              // Signed in
              // ...
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(error);
            });

          setLoading(false);
        },
        register: async (displayName, email, password) => {
          setLoading(true);

          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((credential) => {
                credential.user
                  .updateProfile({ displayName: displayName })
                  .then(async () => {
                    // TODO start a user chat session and log the user in
                  });
              });
          } catch (e) {
            console.log(e);
          }

          setLoading(false);
        },
        logout: async () => {
          // TODO
          setLoading(true);

          try {
            await firebase.auth().signOut();
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
