import React from "react";
// Components JS
import Grid from "./components/Grid";
// CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <section className="container mt-4">
        <Grid />
      </section>
    );
  }
}
export default App;
