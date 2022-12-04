import logo from './logo.svg';
import './App.css';
import '@aws-amplify/ui-react/styles.css'
import { Amplify, Auth, Hub } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import aws_exports from './aws-exports';
import React,{useCallback, useEffect, useState} from'react';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
//import awsconfig from './aws-exports';

Amplify.configure(aws_exports);

function App() {
  const [user, setUser] = useState(null);
  const [customState, setCustomState] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      // eslint-disable-next-line default-case
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          break;
        case "customOAuthState":
          setCustomState(data);
      }
    });

    Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

  const funcSignOut = useCallback(() => Auth.signOut(), []);
  const funcLoginGoogle = useCallback(() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google }), []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          <li><button onClick={funcLoginGoogle}>Open Google</button></li>
          <li><button onClick={funcSignOut}>Sign Out</button></li>
        </ul>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
