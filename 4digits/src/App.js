import { useState } from 'react';
import _ from 'lodash';
import { randomSecret, guessResult, isGameOver, isGameWon } from './game';

import 'milligram';
import './App.css';

function ActiveGame({reset, secret, guesses, setGuesses}) {
  const [currentGuess, setCurrentGuess] = useState("");

  function guess() {
    // Check that the input was a 4-digit number with unique digits
    if (!currentGuess.match(/^[1-9][0-9]{3}$/)) {
      alert("Guess must be a 4-digit number.");
    } else if (_.uniq(currentGuess).length !== currentGuess.length) {
      alert("Four digits must be unique.");
    } else {
      // Emulate the behavior of a set (unique elements only)
      // using the example from https://stackoverflow.com/a/52173482.
      // Sets behave weirdly when used as React states, as described
      // in https://dev.to/ganes1410/using-javascript-sets-with-react-usestate-39eo.
      const newGuesses = _.concat(guesses, currentGuess);
      setGuesses(_.uniq(newGuesses));
    }
  }

  // Update functions based on code from lecture from 2021-01-29: 
  // https://github.com/NatTuck/scratch-2021-01/blob/master/4550/0129/hangman/src/App.js
  function updateGuess(ev) {
    let guess = ev.target.value;
    setCurrentGuess(guess);
  }

  function keyPress(ev) {
    if (ev.key === "Enter") {
      guess();
    }
  }

  function displayGuess(guess, index) {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{guess}</td>
        <td>{guessResult(secret, guess)}</td>
      </tr>
    );
  }
  
  return (
    <div className="App">
      <h1>4digits</h1>
      <p>Guess a 4 digit number:</p>
      <div>
        <input type="text"
               value={currentGuess}
               onChange={updateGuess}
               onKeyPress={keyPress} />
        <button onClick={guess}>
          Guess
        </button>
      </div>
      <button className="button button-outline" onClick={reset}>
        Reset Game
      </button>
      <h2>Guesses:</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Guess</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {guesses.map((guess, index) => displayGuess(guess, index))}
        </tbody>
      </table>
    </div>
  );
}

function GameOver({reset, secret}) {
  return (
    <div className="App">
      <h1>Game Over!</h1>
      <p>You failed to guess the secret number, which was {secret}.</p>
      <button onClick={reset}>
        Reset Game
      </button>
    </div>
  );
}

function GameWon({reset, secret}) {
  return (
    <div className="App">
      <h1>You won!</h1>
      <p>You correctly guessed the secret number, which was {secret}.</p>
      <button onClick={reset}>
        Play Again
      </button>
    </div>
  );
}

function App() {
  const [secret, setSecret] = useState(randomSecret());
  const [guesses, setGuesses] = useState([]);

  function reset() {
    setSecret(randomSecret());
    setGuesses([]);
  }

  if (isGameOver(guesses)) {
    return (
      <GameOver reset={reset} secret={secret} />
    );
  } else if (isGameWon(guesses, secret)) {
    return (
      <GameWon reset={reset} secret={secret} />
    );
  }
  else {
    return (
      <ActiveGame reset={reset}
                  secret={secret}
                  guesses={guesses}
                  setGuesses={setGuesses} />
    );
  }
}

export default App;
