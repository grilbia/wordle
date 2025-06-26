import React, { useEffect, useState } from 'react';

const Wordle = () => {
  const [word, setWord] = useState('');
  const [arr1, setArr1] = useState([]); // Holds random word as char array
  const [randWord, setRandWord] = useState('');
  const [colorizedRow, setColorizedRow] = useState([]); // Stores colored feedback
  const [showFeedback, setShowFeedback] = useState(false); // Whether to show colors

  useEffect(() => {
    generateWord();
  }, []);

  const generateWord = async () => {
    try {
      const res = await fetch('https://random-word-api.herokuapp.com/word?length=5');
      const data = await res.json();
    

      if(isRamvalid){
      const random = data[0].toUpperCase();
      setRandWord(random);
      setArr1(random.split(''));}
      
    } catch (error) {
      console.error("Error fetching random word.");
    }
  };

  const TestWord = async (test) => {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${test}`);
      return res.ok;
    } catch (error) {
      console.error("Word validation failed.");
      return false;
    }
  };

  const handleInput = (target) => {
    const upper = target.toUpperCase();
    setWord(upper);
    setShowFeedback(false);
  };

  const handleAns = async () => {
    const input = word.toUpperCase();
    const isvalid = await TestWord(input.toLowerCase());

    if (isvalid) {
      const guessArr = input.split('');
      const feedback = [];

      for (let i = 0; i < 5; i++) {
        const char = guessArr[i];
        if (char === arr1[i]) {
          feedback.push({ char, color: 'green' });
        } else if (arr1.includes(char)) {
          feedback.push({ char, color: 'goldenrod' });
        } else {
          feedback.push({ char, color: 'gray' });
        }
      }

      setColorizedRow(feedback);
      setShowFeedback(true);
    } else {
      alert("Invalid word.");
    }
  };

  return (
    <>
      <div className="container">
        <h2>Wordle Clone</h2>

        <div className="gridlayout">
          <div className="gridcol">
            {!showFeedback
              ? word.padEnd(5).split('').map((char, i) => (
                  <span key={i} className="card">
                    {char}
                  </span>
                ))
              : colorizedRow.map((cell, i) => (
                  <span key={i} className="card" style={{ backgroundColor: cell.color }}>
                    {cell.char}
                  </span>
                ))}
          </div>
        </div>

        <div className="inputsec">
          <input
            type="text"
            maxLength={5}
            value={word}
            onChange={(e) => handleInput(e.target.value)}
          />
          <button onClick={handleAns}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default Wordle;
