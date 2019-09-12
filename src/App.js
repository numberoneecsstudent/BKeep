import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./App.scss";
import { UserSession } from "blockstack";
import NewPost from "./components/NewPost/NewPost";
import Landing from "./components/Landing/Landing";
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";

class App extends Component {
  constructor() {
    super();
    this.userSession = new UserSession();
    this.state = {
      signedIn: this.userSession.isUserSignedIn()
    };
  }

  componentWillMount() {
    const session = this.userSession;
    if (!session.isUserSignedIn() && session.isSignInPending()) {
      session.handlePendingSignIn().then(userData => {
        if (!userData.username) {
          throw new Error("This app requires a username.");
        }
        this.props.history.push("/newpost");
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/newpost"
          render={(routeProps) =>
            this.userSession.isUserSignedIn()
              ? <NewPost {...routeProps} userSession={this.userSession} />
              : <Landing />
          }
        />
        <Route
          exact
          path="/home"
          render={(routeProps) =>
            this.userSession.isUserSignedIn()
              ? <Home {...routeProps} userSession={this.userSession} />
              : <Landing />
          }
        />
        <Route
          exact
          path="/"
          render={() =>
            this.userSession.isUserSignedIn()
              ? <Redirect to={"/newpost"} />
              : <Landing />
          }
        />
      </div>
    );
  }
}

export default withRouter(App);
