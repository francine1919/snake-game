import React from "react";

export default function Snake(props) {
  return (
    <div>
      {props.snakeBody.map((body, index) => {
        // const styleSnakeBody = {
        //   left: `${body[0]}%`,
        //   top: `${body[2]}%`,
        // };
        const styleSnakeBody = {
          left: `${body[0]}%`,
          top: `${body[1]}%`,
        };
        return (
          <div className="snake-body" key={index} style={styleSnakeBody}></div>
        );
      })}
    </div>
  );
}
