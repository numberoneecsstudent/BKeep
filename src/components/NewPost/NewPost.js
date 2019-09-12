import React from "react";
import { connect } from "react-redux";
import NewEditor from "./NewEditor";
import { UserSession } from "blockstack";
import { savePost, getPosts, saveYear, getYears } from "../../actions/index";
import Loader from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import "./NewPost.scss";
import { Power1 } from "gsap/src/uncompressed/TweenMax";
import TimelineMax from "gsap/src/uncompressed/TimelineMax";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        id: null,
        date: null,
        data: null,
        month: null,
        year: null,
        day: null,
        feelings: {
          happy: false,
          normal: false,
          angry: false,
          sad: false
        },
        title: ""
      }
    };
    this.userSession = new UserSession();
    this.myTween = null;
    this.feeling = null;
    this.editor = null;
    this.date = null;
    this.save = null;
    this.title = null;
    this.timeline = new TimelineMax({ paused: true });
  }

  componentDidMount() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const timestamp = date.getTime();

    this.props.getPosts(this.userSession).then(() => {
      this.setState({
        post: {
          ...this.state.post,
          id: timestamp,
          date: `${day} ${months[month]} ${year}`,
          data: null,
          month: `${months[month]}`,
          year: `${year}`,
          day: `${day}`,
          feelings: {
            happy: false,
            normal: false,
            angry: false,
            sad: false
          },
        }
      });

      this.props.getYears(this.userSession).then(() => {
        this.timeline
          .from(this.title, 0.4, {
            autoAlpha: 0,
            delay: 0.3,
            ease: Power1.easeIn
          })
          .from(this.editor, 0.4, {
            autoAlpha: 0,
            y: 25,
            ease: Power1.easeInOut
          })
          .from(this.feeling, 0.3, {
            autoAlpha: 0,
            ease: Power1.easeIn
          })
          .from(this.save, 0.3, {
            autoAlpha: 0,
            ease: Power1.easeIn
          })
          .from(this.date, 0.3, {
            delay: 0.3,
            autoAlpha: 0,
            ease: Power1.easeIn
          });
        this.timeline.play();
      });
    });
  }

  savePost = event => {
    event.preventDefault();
    const data = localStorage.getItem("data");
    const posts = this.props.posts;
    this.setState(
      {
        post: {
          ...this.state.post,
          data: data
        }
      },
      () => {
        let postIndex = posts.findIndex(post => post.id == this.state.post.id);
        if (postIndex === -1) {
          posts.unshift(this.state.post);
        } else {
          posts.splice(postIndex, 1, this.state.post);
        }

        this.props.savePost(this.userSession, posts).then(() => {
          const postYears = this.props.postYears;
          let yearExists = false;
          let monthExists = false;

          if (postYears.length === 0) {
            const firstYear = {
              year: this.state.post.year,
              months: [this.state.post.month]
            };
            postYears.push(firstYear);

          } else {
            postYears.map(postYear => {
              if (postYear.year === this.state.post.year) {
                yearExists = true;
                postYear.months.map(month => {
                  if (month === this.state.post.month) {
                    monthExists = true;
                  }
                });
              }
            });

            if (yearExists) {
              if (!monthExists) {
                postYears.map(postYear => {
                  if (postYear.year === this.state.post.year) {
                    postYear.months.push(this.state.post.month);
                  }
                });
              }
            } else {
              postYears.push({
                year: this.state.post.year,
                months: [this.state.post.month]
              });
            }
          }
          this.props.saveYear(this.userSession, postYears);
        });
      }
    );
  };

  reverseTimeline = event => {
    event.preventDefault();
    this.timeline.reverse().timeScale(2);
    const timelineDuration = (this.timeline.duration() * 1000) / 2;
    setTimeout(() => {
      this.props.history.push("/home");
    }, timelineDuration);
  };

  toggleFeeling = (event, feeling) => {
    event.preventDefault();

    let currentFeeling = null;
    if (feeling == "happy") {
      currentFeeling = this.state.post.feelings.happy;
    } else if (feeling == "normal") {
      currentFeeling = this.state.post.feelings.normal;
    } else if (feeling == "angry") {
      currentFeeling = this.state.post.feelings.angry;
    } else {
      currentFeeling = this.state.post.feelings.sad;
    }

    this.setState({
      post: {
        ...this.state.post,
        feelings: {
          ...this.state.post.feelings,
          [feeling]: !currentFeeling
        }
      }
    });
  };

  handleTitle = (event) => {
    event.preventDefault();
    this.setState({
      post: {
        ...this.state.post,
        title: event.target.value
      }
    })
  }

  render() {
    const { happy, normal, angry, sad } = this.state.post.feelings;

    return (
      <div className="NewPost-container">
        <div className="Navigation">
          <NavLink
            onClick={e => this.reverseTimeline(e)}
            className="home"
            to={`/home`}
          >
            <p>home</p>
          </NavLink>
          <h2>diario</h2>
          <NavLink className="newpost" to={`/newpost`}>
            <p>new post</p>
          </NavLink>
        </div>

        {this.props.gettingYears || this.props.gettingPosts ? (
          <div className="Loading">
            <div className="Loader">
              <Loader type="ThreeDots" color="#000000" height="15" width="30" />
            </div>
          </div>
        ) : this.props.gettingPostsError || this.props.gettingYearsError ? (
          <div className="Error">
            <p>
              Oops! We had a problem retrieving your info. Please try again
              later.
            </p>
          </div>
        ) : (
          <>
            <div ref={div => (this.title = div)} className="post-title">
              <input maxLength="90" onChange={(e) => this.handleTitle(e)} value={this.state.post.title} type="text" placeholder="Title" />
            </div>
            <div ref={div => (this.editor = div)} className="Editor">
              <NewEditor />
            </div>
            <div ref={div => (this.date = div)} className="Date">
              <p>{this.state.post.date}</p>
            </div>
            <div className="Below-Editor">
              <div ref={div => (this.feeling = div)} className="Feeling">
                <div
                  onClick={e => this.toggleFeeling(e, "happy")}
                  className={`emoji-${happy}`}
                >
                  <span class="ec ec-sunglasses" />
                </div>
                <div
                  onClick={e => this.toggleFeeling(e, "normal")}
                  className={`emoji-${normal}`}
                >
                  <span class="ec ec-neutral-face" />
                </div>
                <div
                  onClick={e => this.toggleFeeling(e, "angry")}
                  className={`emoji-${angry}`}
                >
                  <span class="ec ec-rage" />
                </div>
                <div
                  onClick={e => this.toggleFeeling(e, "sad")}
                  className={`emoji-${sad}`}
                >
                  <span class="ec ec-disappointed" />
                </div>
              </div>
              <div ref={div => (this.save = div)} className="Save">
                <button onClick={e => this.savePost(e)}>
                  {this.props.savingPost || this.props.savingYear ? (
                    <Loader
                      type="ThreeDots"
                      color="#000000"
                      height="10"
                      width="20"
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
            <div className="saveError">
              {this.props.savingYearsError || this.props.savingPostError ? (
                <div className="Error">
                  <p>Oops! We had a problem saving your post. Please retry.</p>
                </div>
              ) : (
                <div />
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  savingPost: state.postsReducer.savingPost,
  savingYear: state.postsReducer.savingYear,
  postYears: state.postsReducer.postYears,
  gettingPostsError: state.postsReducer.gettingPostsError,
  gettingYearsError: state.postsReducer.gettingYearsError,
  gettingPosts: state.postsReducer.gettingPosts,
  gettingYears: state.postsReducer.gettingYears,
  savingPostError: state.postsReducer.savingPostError,
  savingYearsError: state.postsReducer.savingYearsError
});

export default connect(
  mapStateToProps,
  {
    savePost,
    getPosts,
    saveYear,
    getYears
  }
)(NewPost);
