import React, { Component } from "react";
import "../css/Array.css";

class Card extends Component {
  ImageClick = (v, id) => {
    console.log(id);
    const { Selector } = this.props;
    Selector(v, id);
  };
  render() {
    const { value } = this.props;
    return (
      <div
        className="mouse"
        onClick={() =>
          this.props.open ? null : this.ImageClick(value, value.objectId)
        }
      >
        <img
          src={value.thumbnail}
          width="100px"
          height="100px"
          alt="No Image to display"
          style={{
            visibility: this.props.open ? "visible" : "hidden"
          }}
        />
      </div>
    );
  }
}

export default Card;
