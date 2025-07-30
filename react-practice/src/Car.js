import React from "react";

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "綠色" };
    this.buttonHandler = this.buttonHandler.bind(this); //綁定
  }

  componentDidMount() {
    console.log("車子有被render");
  }

  componentDidUpdate() {
    console.log("車子有被update");
  }

  buttonHandler() {
    this.setState({ color: "紅色" });
  }

  render() {
    return (
      <div>
        <h2>
          {this.props.brand}
          {this.state.color}車子餔餔
        </h2>
        <button onClick={this.buttonHandler}>改變顏色</button>
      </div>
    );
  }
}

export default Car;
