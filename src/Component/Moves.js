import React, { Component } from "react";

class Moves extends Component {
  render() {
    return (
      <div>
        <h1>
          Move:
          {this.props.move}
        </h1>
      </div>
    );
  }
}

export default Moves;
