import logo from './logo.svg';
import './App.css';
import '@aws-amplify/ui-react/styles.css'
import { Amplify, Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import aws_exports from './aws-exports';
import React,{useCallback} from'react';

Amplify.configure(aws_exports);

function App() {
  const funcSignOut = useCallback(() => Auth.signOut(), []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            <button onClick={funcSignOut}>Sign Out</button>
        </p>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
