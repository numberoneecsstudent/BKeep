import React from "react";
import "./Landing.scss";
import { Power1 } from "gsap/src/uncompressed/TweenMax";
import TimelineMax from "gsap/src/uncompressed/TimelineMax";
import { UserSession } from 'blockstack'
import Loader from "react-loader-spinner";
import { Provider, Heading, Subhead, Flex, Feature } from 'rebass'
import { Hero, ScrollDownIndicator } from 'react-landing-page'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
          <Provider
            theme={{
              fonts: {
                sans: '"Avenir Next", Helvetica, sans-serif'
              },
              fontSizes: [12, 16, 24, 36, 48, 72]
            }}
          >
            <Hero
              color="white"
              bg="black"
              backgroundImage="https://bit.ly/2mbdNbH"
              bgOpacity={0.5}
            >
              <Heading>B-Keep</Heading>
              <Subhead fontSize={[2, 3]}>
                Sign in to your BlockStack to get Started
              </Subhead>
              <div ref={div => (this.btn = div)}>
                <button onClick={this.signIn.bind(this)}>Sign In!</button>
              </div>
              <ScrollDownIndicator />
            </Hero>
            <Heading textAlign="center">What is inside?</Heading>
            <Flex flexWrap="wrap" justifyContent="center">
              <Feature icon={<FontAwesomeIcon icon="far fa-file-alt"/>} description="What your users see first">
                Hero
              </Feature>
              <Feature icon="🔥" description="What your app can do">
                Features
              </Feature>
              <Feature icon="📩" description="How to keep in touch">
                Sign Up
              </Feature>
            </Flex>
          </Provider>
        )}
      </div>
    );
  }
}

export default Landing;

