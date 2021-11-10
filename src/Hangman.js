import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./assets/0.jpg";
import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";
import img4 from "./assets/4.jpg";
import img5 from "./assets/5.jpg";
import img6 from "./assets/6.jpg";
import { randomWord } from "./words";
import { Result } from "./components/Result";
import { Button } from "./components/Button";
import { createPortal } from "react-dom";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  //Reset the game
  reset() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  }

  /** render: render game */

  render() {
    let stillPlaying = this.state.nWrong < this.props.maxWrong;
    const isWinner = !this.guessedWord().includes("_");
    let gameState = this.generateButtons();
    if (isWinner) gameState = null;
    if (!stillPlaying) gameState = "You lose!";
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={`${this.state.nWrong} guesses wrong`}
        />
        <Result value={this.state.nWrong} />
        <p className="Hangman-word">
          {!stillPlaying ? this.state.answer : this.guessedWord()}
        </p>
        {isWinner &&
          createPortal(
            <p className="win">You won {"🤩"} Congrats!</p>,
            document.querySelector("#win")
          )}
        <p className="Hangman-btns">{gameState}</p>

        <Button text="Restart?" onClick={this.reset} />
      </div>
    );
  }
}

export default Hangman;
