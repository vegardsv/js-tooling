import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: [],
      input: ""
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/animals`)
      .then(response => response.json())
      .then(json =>
        this.setState({
          animals: json
        })
      );
  }

  render() {
    return (
      <div className="App">
        <form
          onSubmit={e => {
            e.preventDefault();
            fetch(`${process.env.REACT_APP_API_URL}/animals`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ animal: this.state.input })
            })
              .then(() => fetch(`${process.env.REACT_APP_API_URL}/animals`))
              .then(response => response.json())
              .then(json =>
                this.setState({
                  animals: json
                })
              );

            this.setState({ input: "" });
          }}
        >
          <input
            type="text"
            value={this.state.input}
            onChange={e => this.setState({ input: e.target.value })}
          />
          <input type="submit" value="+" />
        </form>

        <ul>
          {this.state.animals.map(({ id, animal }) => (
            <li key={id}>{animal}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
