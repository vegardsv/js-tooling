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
          id="animal-form"
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
            id="animal-form__input"
            className="animal-form__input"
            type="text"
            value={this.state.input}
            onChange={e => this.setState({ input: e.target.value })}
          />
          <input id="animal-form-submit" type="submit" value="+" />
        </form>

        <ul className="animal-list">
          {this.state.animals.map(({ id, animal }) => (
            <li className="animal-list__item" key={id}>
              {animal}
              <button> Slett </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
