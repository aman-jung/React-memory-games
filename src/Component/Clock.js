import React, { Component } from "react";
import "../css/Array.css";

class Clock extends Component {
  render() {
    return (
      <div className="flex-container">
        <h1 style={{ color: "black" }}>
          Time - {this.props.minutes} min : {this.props.seconds} sec
        </h1>
      </div>
    );
  }
}

export default Clock;
