import React, { Component } from "react";
import pictures from "./Array";
import Card from "./Card";
import "../css/Array.css";
import Clock from "./Clock";
import swal from "sweetalert2";
import Moves from "./Moves";

class App extends Component {
  constructor(props) {
    super(props);
    this.Selector = this.Selector.bind(this);
    this.Matched = this.Matched.bind(this);
    this.NotMatched = this.NotMatched.bind(this);
    this.sweetAlert = this.sweetAlert.bind(this);
    this.Restart = this.Restart.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.startTimerOnFirstClick = this.startTimerOnFirstClick.bind(this);
  }
  state = {
    pictures: pictures,
    currentlyOpened: "",
    pairs: 0,
    moves: 0,
    seconds: 0,
    minutes: 0,
    counter: 0
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
    shuffle(this.state.pictures);
  }

  sweetAlert() {
    swal({
      title: "Matched",
      text: "Do you want to continue?",
      type: "success",
      button: {
        text: "OK",
        value: true,
        closeModal: true
      }
    }).then(result => {
      if (result.value) {
        this.Restart();
      }
    });
  }

  Restart = () => {
    pictures.map(item => (item.open = false));
    var state = {
      pictures: pictures,
      currentlyOpened: "",
      pairs: 0,
      moves: 0,
      seconds: 0,
      minutes: 0
    };
    this.setState(state);
  };

  startTimer = () => {
    this.myInterval = setInterval(() => {
      this.setState({
        seconds: this.state.seconds + 1
      });
      if (this.state.seconds % 60 == 0) {
        this.setState({
          seconds: 0,
          minutes: this.state.minutes + 1
        });
      }
    }, 1000);
  };

  Matched = () => {
    this.setState(
      state => {
        state.currentlyOpened = null;
        state.pairs += 1;
        state.moves += 1;
        return state;
      },
      _ => {
        if (this.state.pairs === 6) {
          this.sweetAlert();
          clearInterval(this.myInterval);
        }
      }
    );
  };

  NotMatched = index => {
    setTimeout(() => {
      this.setState(state => {
        state.pictures[index].open = false;
        state.currentlyOpened.open = false;
        state.currentlyOpened = null;
        state.moves += 1;
        return state;
      });
    }, 300);
  };

  startTimerOnFirstClick() {
    this.setState(
      state => {
        return (state.counter += 1);
      },
      _ => {
        if (this.state.counter === 1) {
          this.startTimer();
        }
      }
    );
  }

  Selector = (currentCard, id) => {
    let pictures = this.state;
    let currentlyOpened = this.state.currentlyOpened;
    let pairs = this.state.pairs;
    var index = this.state.pictures.findIndex(a => {
      return a.objectId === id;
    });
    this.setState(
      k => {
        return (k.pictures[index].open = true);
      },
      _ => {
        if (currentlyOpened) {
          if (currentlyOpened.type === currentCard.type) {
            this.Matched();
          } else {
            this.NotMatched(index);
          }
        } else {
          this.setState(
            y => {
              return (y.currentlyOpened = currentCard);
            },
            _ => {
              this.startTimerOnFirstClick();
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
          {this.state.pictures.map(item => {
            return (
              <div key={item.objectId}>
                <Card Selector={this.Selector} value={item} open={item.open} />
              </div>
            );
          })}
        </div>
        <Clock seconds={this.state.seconds} minutes={this.state.minutes} />
        <Moves move={this.state.moves} />
        <div>{this.clearInterval}</div>
      </div>
    );
  }
}

export default App;
