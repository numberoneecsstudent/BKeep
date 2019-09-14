import React from "react";
import "./Landing.scss";
import { UserSession } from 'blockstack'
import Loader from "react-loader-spinner";
import { Provider, Heading, Subhead, Flex, Feature } from 'rebass'
import { Hero, ScrollDownIndicator, CallToAction, Section } from 'react-landing-page'
import { FaLock, FaFeatherAlt } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { IoIosGitNetwork } from "react-icons/io";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.userSession = new UserSession();
    this.state = {
      services: [
        {
          icon: <TiDocumentText />,
          title: "Write, edit, and save Notes",
          info:
            "With Block Stacks secure Blockchain technology confidently save all your Notes and reminders securely"
        },
        {
          icon: <FaLock />,
          title: "Secure Notes",
          info:
            "Secure your personal notes, entries, or sensitive information with Blockstack's secure block chain encryption technology"
        },
        {
          icon: <FaFeatherAlt />,
          title: "Light and Fast",
          info:
            "Quickly and easily jot down important notes"
        },
        {
          icon: <IoIosGitNetwork />,
          title: "Be one of the first to adopt Blockchain Technology in your everyday life",
          info:
            "Blockchain is the fastest growing technology and you will be one of the first to adopt tnd use it"
        }
      ]
    };
  }

  componentDidMount() {
    const session = this.userSession;
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
              <Section
                heading="B-Keep"
                subhead="A Blockchain Powered NoteTaker"
                width={1}
              >
                <CallToAction mt={3} onClick={this.signIn.bind(this)}>
                  {" "}
                  Get Started!
                </CallToAction>
              </Section>
            </Hero>
            <section className="services">
              <div className="services-center">
                {this.state.services.map(item => {
                  return (
                    <article key={`item-${item.title}`} className="service">
                      <span>{item.icon}</span>
                      <h6>{item.title}</h6>
                      <p>{item.info}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          </Provider>
        )}
      </div>
    );
  }
}

export default Landing;

