import React, { Component } from "react";
import Pictures from "./Array";
import Card from "./Card";
import "../css/Array.css";
import Clock from "./Clock";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
import Moves from "./Moves";

let time = new Date().toLocaleString();

function sweetAlert() {
  swal({
    title: "Matched",
    text: "Do you want to continue?",
    type: "success",
    button: {
      text: "OK",
      value: true,
      visible: true,
      className: "",
      closeModal: true
    }
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.Selector = this.Selector.bind(this);
  }
  state = {
    Pictures: Pictures,
    currentlyOpened: "",
    pairs: 0,
    moves: 0
  };

  componentWillMount() {
    function shuffle(arr) {
      let range = arr.length;
      while (range > 0) {
        let index = Math.floor(Math.random() * range);
        range--;
        let temp = arr[range];
        arr[range] = arr[index];
        arr[index] = temp;
      }
      return arr;
    }
    shuffle(this.state.Pictures);
  }

  Selector = (currentCard, id) => {
    let Pictures = this.state;
    let currentlyOpened = this.state.currentlyOpened;
    let pairs = this.state.pairs;
    var index = this.state.Pictures.findIndex(a => {
      return a.objectId === id;
    });
    this.setState(
      k => {
        return (k.Pictures[index].open = true);
      },
      _ => {
        if (currentlyOpened) {
          if (currentlyOpened.type === currentCard.type) {
            console.log("Matched");
            this.setState(
              state => {
                state.currentlyOpened = null;
                state.pairs += 1;
                state.moves += 1;
                return state;
              },
              _ => {
                if (this.state.pairs === 6) {
                  sweetAlert();
                }
              }
            );
          } else {
            setTimeout(() => {
              this.setState(state => {
                state.Pictures[index].open = false;
                state.currentlyOpened.open = false;
                state.currentlyOpened = null;
                state.moves += 1;
                return state;
              });
            }, 300);
          }
        } else {
          this.setState(
            y => {
              return (y.currentlyOpened = currentCard);
            },
            _ => {
              console.log("First Click");
            }
          );
        }
      }
    );
  };

  render() {
    return (
      <div className="container">
        <h1>Bird Matching Games</h1>
        <div className="display">
          {this.state.Pictures.map(item => {
            return (
              <div key={item.objectId}>
                <Card Selector={this.Selector} value={item} open={item.open} />
              </div>
            );
          })}
        </div>
        <Clock />
        <Moves move={this.state.moves} />
      </div>
    );
  }
}

export default App;
