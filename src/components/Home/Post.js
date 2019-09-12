import React from "react";
import Feelings from "./Feelings";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle(e) {
    e.preventDefault();
    const prevHeight = this.state.height || 0;
    this.setState(
      {
        open: !this.state.open,
        height: this.refs.inner.clientHeight
      },
      () => {
        if (this.state.open) {
          this.props.updateHeightMonth(this.state.height);
          this.props.updateHeightYear(this.state.height);
        } else {
          this.props.updateHeightMonth(-prevHeight);
          this.props.updateHeightYear(-prevHeight);
        }
      }
    );
  }

  render() {
    const { open, height } = this.state;
    const currentHeight = open ? height : 0;
    const untitled = this.props.post.title ? false : true;

    return (
      <div className="Post">
        <div className="title-section" onClick={e => this.handleToggle(e)}>
          <div className={`title untitled-${untitled}`}>{this.props.post.title || "Untitled"}</div>
          <div className="characteristics">
            <div className="feelings-container">
              <Feelings feelings={this.props.post.feelings} />
            </div>
            <div className="day">
              <p>{this.props.post.day}</p>
            </div>
          </div>
        </div>
        <div className="Content" style={{ height: currentHeight + "px" }}>
          <div className="content-outer" ref="inner">
            <div
              className={`Content-inner`}
              dangerouslySetInnerHTML={{ __html: this.props.post.data }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
