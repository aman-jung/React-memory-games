import React, { Component } from "react";
import "../css/Array.css";

class Clock extends Component {
  state = {
    count: 0
  };

  startTimer = () => {
    this.myInterval = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.myInterval);
  };

  render() {
    return (
      <div className="flex-container">
        <div className="mouseCursor" onClick={this.startTimer}>
          <h1 style={{ color: "black" }}>
            Time:
            {this.state.count}
          </h1>
        </div>
        <div className="mouseCursor" onClick={this.stopTimer}>
          <h1 style={{ color: "black" }}>
            stop
            {clearInterval()}
          </h1>
        </div>
      </div>
    );
  }
}

export default Clock;
