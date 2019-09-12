import React from "react";
import Month from "./Month";

class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({
      open: !this.state.open,
      height: this.refs.inner.clientHeight
    });
  }

  updateHeight = (monthHeight) => {
    this.setState({
      ...this.state,
      height: this.state.height + monthHeight 
    });
  }

  render() {
    const { open, height } = this.state;
    const currentHeight = open ? height : 0;

    return (
      <div className="Year-Container">
        <div onClick={e => this.handleToggle(e)} className="Year">
          <h2>{this.props.year.year}</h2>
        </div>
        <div className={`MonthList`} style={{ height: currentHeight + "px" }}>
          <div className="Month-Container" ref="inner">
            {this.props.year.months.map(month => (
              <Month
                yearRef={this.refs.inner}
                updateHeightYear={this.updateHeight}
                year={this.props.year.year}
                month={month}
                posts={this.props.posts}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Year;
