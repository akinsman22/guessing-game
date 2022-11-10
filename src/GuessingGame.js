import React, { useState, useEffect } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

function GuessingGame() {

  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Start Guessing");
  const [randomNum, setRandomNum] = useState(null);
  const [timeGuessed, setTimeGuessed] = useState(null);

  useEffect(() => {
    if (randomNum === null) {
      setRandomNum(
        JSON.parse(localStorage.getItem("random")) || generateNum()
      )
    }
    if (timeGuessed === null) {
      setTimeGuessed(
        JSON.parse(localStorage.getItem("guesses")) || 0
      )
    }
  }, []);

  function generateNum() {
    let random = Math.floor(Math.random() * 100);
    localStorage.setItem("random", JSON.stringify(random));
    return random;
  }

  function handleSubmit(i) {
    i.preventDefault();
    let parseNum = parseInt(guess);
    console.log(randomNum);
    if (parseNum === randomNum) {
      setMessage("Congratulations! You won!")
    } else if (parseNum > randomNum) {
      setMessage("Sadly your guess is too high.")
    } else {
      setMessage("Sadly your guess is too low.")
    }

    setTimeGuessed(timeGuessed + 1);
    localStorage.setItem("guesses", JSON.stringify(timeGuessed + 1));
  }

  function handleChange(i) {
    if (!isNaN(i.target.value)) {
      setGuess(i.target.value);
    } else {
      alert("Please type a number to play the game.")
    }
    setGuess(i.target.value)
  }

  function reset() {
    setGuess("");
    setMessage("Start Guessing");
    setTimeGuessed(0);
    setRandomNum(generateNum());
    localStorage.removeItem("guesses");
  }


  return (
    <div style={{ textAlign: 'center' }}>

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>
            I am thinking of a number between 1 and 100. Guess the Lucky Number!
          </Form.Label>
          <br />
          <Form.Label> You have made {timeGuessed} guesses </Form.Label>
          <FormControl
            type="test"
            onChange={handleChange}
            value={guess}
            name="guess"
          />
          <br />
          <Button type="submit" size="lg" variant="outline-primary"> Guess </Button>
          <br />
          <br />
          <Button onClick={reset} type="button" size="md" variant="outline-success"> Reset </Button>
          <br />
          <br />
          <Form.Label> {message} </Form.Label>
        </Form.Group>


      </Form>

    </div>
  );
}

export default GuessingGame;
