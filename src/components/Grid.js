// !------------------------------- IMPORTS -------------------------------- //
import React from "react";
import Button from "./Button";
import { Icon } from "@iconify/react"; // Cats icons (Copyright Concats)

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      player1: "X", // Player 1
      player2: "O", // Player 2
      player1Turn: true, // Boolean to alternate between player 1 and Player 2

      // Changing the display of our text in the render dynamically,
      // according to the game scenarios :
      display: "none",
      displayP1Won: "none",
      displayP2Won: "none",
      displayDraw: "none",
      displayRESTART: "none",
      clickedBtns: [],
      checkedBtnPlayer1: [], // Player 1's history of checked buttons
      checkedBtnPlayer2: [], // Player 2's history of checked buttons
      disabled: false,
      winner: false, // Boolean to check if a player has won

      // List of the winning combination lines :
      winningLines: [
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["0", "4", "8"],
        ["2", "4", "6"],
      ],
    };

    // Bind functions
    this.handleClick = this.handleClick.bind(this);
    this.checkIfWinP1 = this.checkIfWinP1.bind(this);
    this.checkIfWinP2 = this.checkIfWinP2.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  // !------------------------------- FUNCTIONS -------------------------------- //

  // Creating 2 functions that will create our users history of checked buttons (checkedBtnPlayer1 and checkedBtnPlayer2 arrays) and check if they contain any winning line at at every turn : the first user that has any of the winning lines wins and the game ends.

  // Function to check if Player 2 has won :
  checkIfWinP2() {
    //Creating a map method that will iterate into the array of winning lines and check if any of them are inside the array of player 2's clicked buttons (checkedBtnPlayer2) : if so, the const containsAll return True, if not, it returns False :
    this.state.winningLines.map((line) => {
      const containsAll = line.every((elem) => {
        return this.state.checkedBtnPlayer2.includes(elem);
      });

      //If the variable containsAll returns True, a winning notification get displayed in the page :
      if (containsAll === true) {
        this.setState({
          displayP2Won: "initial",
          displayRESTART: "initial",
          displayDraw: "none",
          winner: true,
        });
        //Creating a loop that will check every button : if it's part of the winning line, the background color turns into green :
        for (let i = 0; i < line.length; i++) {
          let id = line[i];
          let allButtons = document.querySelectorAll("input");

          allButtons.forEach((button) => {
            if (button.id === id) {
              button.style.background = "rgba(26, 175, 73, 0.5)";
            }
          });
        }
        return console.log(" Bravo ! Player 2 a gagné ", containsAll);
      }
      return null;
    });
  }
  // Function to check if Player 1 has won :
  checkIfWinP1() {
    //Creating a map method that will iterate into the array of winning lines and check if any of them are inside the array of player 1's clicked buttons (checkedBtnPlayer1) : if so, the const containsAll return True, if not, it returns False :
    this.state.winningLines.map((line) => {
      const containsAll = line.every((elem) => {
        return this.state.checkedBtnPlayer1.includes(elem);
      });
      if (containsAll === true) {
        this.setState({
          displayP1Won: "initial",
          displayRESTART: "initial",
          displayDraw: "none",
          winner: true,
        });

        //Creating a loop that will check every button : if it's part of the winning line, the background color turns into red :
        for (let i = 0; i < line.length; i++) {
          let id = line[i];
          let allButtons = document.querySelectorAll("input");

          allButtons.forEach((button) => {
            if (button.id === id) {
              button.style.background = "rgba(175, 26, 26, 0.4)";
            }
          });
        }

        return console.log(" Bravo ! Player 1 a gagné ", containsAll);
      }
      return null;
    });
  }

  handleClick(e) {
    // If the button's value is not empty, it means that the button is already clicked => the user can't select it and gets an error message :
    if (e.target.value !== "") {
      return this.setState(
        {
          display: "initial",
        },
        () => {
          // Creating a setTimeOut method to remove the error message after 2 seconds :
          setTimeout(() => {
            this.setState({ display: "none" });
          }, 1900);
        }
      );
    }
    // ---------------- PLAYER 2 ----------------- //

    // Creating a condition to check whose turn it is (Player1's turn or Player2's turn): if the boolean Player1Turn is true, it means that the next move will be a "X" for Player 1. If Player1Turn is false, the next move will be a "O" for Player 2:

    if (this.state.player1Turn === false) {
      const copyArray2 = [...this.state.checkedBtnPlayer2, e.target.id];
      this.setState(
        {
          player1Turn: true,
        },
        () => {
          this.setState({ checkedBtnPlayer2: copyArray2 }, () => {
            console.log("test Array player2: ", this.state.checkedBtnPlayer2);
            e.target.value = this.state.player2;
            e.target.className = "styleO m-1 border"; //style for O
            this.checkIfWinP2();
          });
        }
      );
      // ---------------- PLAYER 1 ---------------- //
    } else if (this.state.player1Turn === true) {
      const copyArray1 = [...this.state.checkedBtnPlayer1, e.target.id];
      this.setState(
        {
          player1Turn: false,
        },
        () => {
          this.setState({ checkedBtnPlayer1: copyArray1 }, () => {
            console.log("test Array player1: ", this.state.checkedBtnPlayer1);
            e.target.value = this.state.player1;
            e.target.className = "styleX m-1 border"; //style for X
            this.checkIfWinP1();
          });
        }
      );
    }
    const copyClickedBtns = this.state.clickedBtns; // Creating a copy of the clicked buttons's array
    copyClickedBtns.push(e.target.id); // Adding the last clicked button to our copy array
    this.setState({ clickedBtns: copyClickedBtns }); // Replacing our clicked buttons array with our updated copyArray

    // Checking if the clicked buttons array is full (i.e, if it contains all of our buttons id) and if we do not have any winner : if so, we get a draw and the game is over. => a "RESTART" button is displayed

    if (this.state.clickedBtns.length === 9 && this.state.winner === false) {
      this.setState({ displayRESTART: "initial", displayDraw: "initial" });
      console.log("match nul");
    }
  }

  // Checking if we have a winner : if so, the button are disabled so that the player cant keep playing.
  componentDidUpdate(_prevProps, prevState) {
    if (prevState.winner !== this.state.winner) {
      if (this.state.winner === true) {
        this.setState({ disabled: true });
      }
    }
  }

  // Function that resets our buttons and elements at the end of a round  :
  handleReset() {
    this.setState({ disabled: false });
    let clearbuttons = document.querySelectorAll("input"); //we select every input

    //If the inputs dont contain "RESET" nor "RESTART" we reset their value :
    clearbuttons.forEach((button) => {
      if (button.value !== "RESET" && button.value !== "RESTART") {
        button.value = "";
        button.style.background = "transparent";
      }
    });
    this.setState({
      checkedBtnPlayer1: [],
      checkedBtnPlayer2: [],
      clickedBtns: [],
      player1Turn: true,
      winner: false,
    });
    this.setState({
      displayP2Won: "none",
      displayP1Won: "none",
      displayDraw: "none",
      displayRESTART: "none",
    });

    console.log("RESET");
  }

  // !------------------------------- RENDER -------------------------------- //

  render() {
    return (
      <section className="container-lg pt-4">
        {/* TITLE  */}
        <h1 className="title text-center display-2">
          T<span className="span-title">i</span>c T
          <span className="span-title-red">a</span>c{" "}
          <span className="span-bg-black"> Toe</span>
        </h1>
        <div className="row justify-content-center ">
          <div className="col-lg-3 col-md-6  order-1 order-lg-1 rounded p-3 text-center m-2 d-flex flex-column justify-content-center align-items-center">
            {this.state.player1Turn ? (
              <p>
                Your turn <span className="red">Player1</span> :{" "}
                <span className="span-title-red ">X</span>
              </p>
            ) : (
              <p>
                Your turn <span className="green">Player2</span> :{" "}
                <span className="span-title">O</span>
              </p>
            )}
            <input
              className={`btn btn-dark m-1 col-lg-7 col-md-6 col-sm-6 col-6`}
              type="reset"
              value="RESET"
              onClick={this.handleReset}
            />
          </div>
          {/* Div containing our Button components */}
          <div className="col-lg-5 col-md-6  order-3 order-lg-3 rounded p-3 m-2  d-flex flex-column  justify-content-center align-items-center">
            <div style={{ display: "flex" }}>
              <Button
                onclick={this.handleClick}
                id="0"
                disabled={this.state.disabled}
              />
              <Button
                onclick={this.handleClick}
                id="1"
                disabled={this.state.disabled}
              />
              <Button
                onclick={this.handleClick}
                id="2"
                disabled={this.state.disabled}
              />
            </div>

            <div style={{ display: "flex" }}>
              <Button
                onclick={this.handleClick}
                id="3"
                disabled={this.state.disabled}
              />
              <Button
                onclick={this.handleClick}
                id="4"
                disabled={this.state.disabled}
              />
              <Button
                onclick={this.handleClick}
                id="5"
                disabled={this.state.disabled}
              />
            </div>

            <div style={{ display: "flex" }}>
              <Button
                onclick={this.handleClick}
                id="6"
                disabled={this.state.disabled}
              />
              <Button
                onclick={this.handleClick}
                id="7"
                disabled={this.state.disabled}
              />
              <Button
                onclick={this.handleClick}
                id="8"
                disabled={this.state.disabled}
              />
            </div>
          </div>
          {/* Div containing are end of game messages */}
          <div className="col-lg-3 col-md-6 order-3 order-lg-3 rounded p-3 m-2 d-flex flex-column justify-content-center align-items-center">
            <p style={{ display: this.state.displayP2Won }}>Player 2 won !!</p>
            <p style={{ display: this.state.displayP1Won }}>Player 1 won !!</p>
            <p style={{ display: this.state.displayDraw }}>
              It's a draw... Play again?
            </p>
            <input
              className={`btn m-1 col-lg-7 col-md-6 col-sm-6 col-6 btn-danger`}
              style={{ display: this.state.displayRESTART }}
              type="button"
              value="RESTART"
              onClick={this.handleReset}
            />
          </div>
        </div>
        <div className="row div-warning">
          <p
            className="warning align-center"
            style={{ display: this.state.display }}
          >
            Box already ticked ! Please, select another one.
          </p>
        </div>
        {/* Div footer */}
        <div className="row div-concats">
          <p className="align-center concats">
            {" "}
            &copy; Made by Les Concats
            <br></br>
            <Icon icon="emojione:cat-face" inline={true} className="cat" />
            <Icon icon="emojione:cat-face" inline={true} className="cat" />
            <Icon icon="emojione:cat-face" inline={true} className="cat" />
            <Icon icon="emojione:cat-face" inline={true} className="cat" />
          </p>
        </div>
      </section>
    );
  }
}

export default Grid;
