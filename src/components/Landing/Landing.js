import React from "react";
import "./Landing.scss";
import { Power1 } from "gsap/src/uncompressed/TweenMax";
import TimelineMax from "gsap/src/uncompressed/TimelineMax";
import { UserSession } from 'blockstack'
import Loader from "react-loader-spinner";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.timeline = new TimelineMax({ paused: true });
    this.title = null;
    this.btn = null;
    this.subtitle = null;
    this.userSession = new UserSession();
  }

  componentDidMount() {
    const session = this.userSession;

    if (!session.isSignInPending()) {
      this.timeline
      .from(this.logo, 0.4, {
        autoAlpha: 0,
        delay: 0.3,
        ease: Power1.easeIn
      })
      .from(this.subtitle, 0.4, {
        autoAlpha: 0,
        y: 25,
        ease: Power1.easeInOut
      })
      .from(this.btn, 0.3, {
        autoAlpha: 0,
        ease: Power1.easeIn
      });

    this.timeline.play();
    }
  }

  signIn(e) {
    e.preventDefault();
    this.userSession.redirectToSignIn();
  }

  render() {
    return (
      <div className="landing-container">
        {this.userSession.isSignInPending() ? (
          <div className="loading">
            <Loader type="ThreeDots" color="#000000" height="15" width="30" />
          </div>
        ) : (
          <div className="landing-content">
            <h1 ref={div => (this.logo = div)}>diario</h1>
            <h2 ref={div => (this.subtitle = div)}>A new kind of diary.</h2>
            <div ref={div => (this.btn = div)}>
              <button onClick={this.signIn.bind(this)}>Start writing!</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Landing;
