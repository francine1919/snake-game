import React, { Component } from "react";
import Food from "./Food/Food";
import Snake from "./snake/Snake";

const coordinatesForFood = () => {
  let max = 98;
  let min = 1;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};
const initialState = {
  snakeBody: [
    [0, 0],
    [2, 0],
  ],
  food: coordinatesForFood(),
  directions: "RIGHT",
  movementsSpeed: 200,
};
class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.snakeMovements, this.state.movementsSpeed);
    document.onkeydown = this.onKeyDown;
  }
  componentDidUpdate() {
    this.gameOver();
    this.snakeCollapsed();
    this.snakeEats()
  }
  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ directions: "UP" });
        break;

      case 40:
        this.setState({ directions: "DOWN" });
        break;
      case 37:
        this.setState({ directions: "LEFT" });
        break;
      case 39:
        this.setState({ directions: "RIGHT" });
        break;
    }
  };
  snakeMovements = () => {
    let body = [...this.state.snakeBody];
    let head = body[body.length - 1];
    switch (this.state.directions) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    body.push(head);
    body.shift();
    this.setState({
      snakeBody: body,
    });
  };

  gameOver() {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  onGameOver() {
    if (this.state.snakeBody.length === 2) {
      alert(`Game over, you collected 0 fruits`);
    } else {
      alert(`Game over, you collected ${this.state.snakeBody.length} fruits`);
    }

    this.setState(initialState);
  }

  snakeCollapsed() {
    let snake = [...this.state.snakeBody];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((body) => {
      if (head[0] == body[0] && head[1] == body[1]) {
        this.onGameOver();
      }
    });
  }
  snakeEats() {
    let head = this.state.snakeBody[this.state.snakeBody.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food:coordinatesForFood()
      })
      this.onSnakeGrows();
      this.increaseSpeed()
    }
  }
  onSnakeGrows() {
    let grownSnake = [...this.state.snakeBody];
    grownSnake.unshift([]);
    this.setState({
      snakeBody: grownSnake,
    });
  }
  increaseSpeed() {
    if (this.state.movementsSpeed > 10) {
      this.setState({
        movementsSpeed: this.state.movementsSpeed - 10,
      });
    }
  }
  render() {
    //console.log(this.state.snakeBody.length);
    return (
      <div className="game-field">
        <Snake snakeBody={this.state.snakeBody} />
        <Food dot={this.state.food} />
      </div>
    );
  }
}
export default App;
