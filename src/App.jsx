import React, { useMemo, useState } from 'react';

function usePuzzle() {
  // Hidden target string (letters only)
  const target = 'STARLING';

  // Step 1: Riddle that yields one letter
  const riddleQuestion = 'I speak without a mouth and hear without ears. What am I?';
  const riddleAnswer = 'ECHO';
  const riddleLetter = 'O';

  // Step 2: Checkbox cipher (select primes) -> yields letters by index
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const primeIndices = new Set([2, 3, 5, 7, 11]);
  const cipherLetters = 'TRSLNGAI'; // shuffled selection to produce letters

  // Step 3: Anagram hint produces final ordering
  const anagramHint = 'Align the stars to greet the swift small songbird.';

  return {
    target,
    riddle: { question: riddleQuestion, answer: riddleAnswer, letter: riddleLetter },
    alphabet,
    numbers,
    primeIndices,
    cipherLetters,
    anagramHint,
  };
}

export default function App() {
  const { target, riddle, numbers, primeIndices, cipherLetters, anagramHint } = usePuzzle();
  const [opened, setOpened] = useState(false);
  const [riddleInput, setRiddleInput] = useState('');
  const [selected, setSelected] = useState(new Set());

  const riddleSolved = riddleInput.trim().toUpperCase() === riddle.answer;

  const primeSelectionOk = useMemo(() => {
    // Expect exactly primes: 2,3,5,7,11
    if (selected.size !== primeIndices.size) return false;
    for (const n of selected) if (!primeIndices.has(n)) return false;
    return true;
  }, [selected, primeIndices]);

  const lettersFromCheckboxes = useMemo(() => {
    // Map the chosen prime positions to letters in cipherLetters
    // Order by ascending number to get stable result
    const primes = Array.from(selected).filter(n => primeIndices.has(n)).sort((a,b) => a - b);
    // map primes [2,3,5,7,11] -> indexes in cipherLetters [0..]
    const mapIndex = {2:0,3:1,5:2,7:3,11:4};
    const letters = primes.map(p => cipherLetters[mapIndex[p]]).join('');
    return letters;
  }, [selected, primeIndices, cipherLetters]);

  const progressLetters = useMemo(() => {
    const part1 = riddleSolved ? riddle.letter : '·';
    const part2 = primeSelectionOk ? lettersFromCheckboxes : '·····';
    // Final assembly hint (anagram). Here we just reveal progressively.
    return `${part1}${part2}`;
  }, [riddleSolved, riddle.letter, primeSelectionOk, lettersFromCheckboxes]);

  const solved = useMemo(() => progressLetters.replace(/·/g, '').length >= 6, [progressLetters]);

  function toggle(n) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n); else next.add(n);
      return next;
    });
  }

  return (
    <div className="wrapper">
      <div className="card">
        <div className="title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l2.39 7.36H22l-6.2 4.5 2.37 7.36L12 16.72 5.83 21.22 8.2 13.86 2 9.36h7.61L12 2z" fill="url(#g)"/>
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="24" y2="24">
                <stop stopColor="#7c5cff"/>
                <stop offset="1" stopColor="#00d4ff"/>
              </linearGradient>
            </defs>
          </svg>
          <h2 style={{margin:0}}>Cryptic Button</h2>
        </div>
        <p className="subtitle">Press the sigil and follow the ritual. Gather the letters. When you have them, send the resulting string to Karl.</p>

        <div className="grid">
          <div className="panel half">
            <h3>Sigil</h3>
            <p>It does not open by force. Only those who answer and align may enter.</p>
            <button className="sigil-btn" onClick={() => setOpened(v => !v)}>
              {opened ? 'The gate hums…' : 'Press the sigil'}
            </button>
            {opened && (
              <div className="code-bar">
                {progressLetters.split('').map((c, i) => (
                  <span key={i} className="code-chip">{c}</span>
                ))}
              </div>
            )}
          </div>

          <div className="panel half">
            <h3>Step 1: The whisper</h3>
            <p>{riddle.question}</p>
            <div className="row">
              <input
                className="riddle-input"
                placeholder="your answer"
                value={riddleInput}
                onChange={e => setRiddleInput(e.target.value)}
              />
              <span className={riddleSolved ? 'ok' : 'warn'}>
                {riddleSolved ? 'correct' : 'waiting'}
              </span>
            </div>
            <p className="footer-note">Solve this to claim the first letter.</p>
          </div>

          <div className="panel">
            <h3>Step 2: Choose the true numbers</h3>
            <p>Select only those that are prime. The sigil yields five more letters.</p>
            <div className="checkbox-grid">
              {numbers.map(n => (
                <label key={n}>
                  <input
                    type="checkbox"
                    checked={selected.has(n)}
                    onChange={() => toggle(n)}
                    aria-label={`select ${n}`}
                  />
                  <span>{n}</span>
                </label>
              ))}
            </div>
            <p className="footer-note">Hint: there are exactly five between 1 and 12.</p>
          </div>

          <div className="panel">
            <h3>Step 3: Align</h3>
            <p>{anagramHint}</p>
            {solved ? (
              <p>
                The string reveals itself: <strong>{target}</strong>
              </p>
            ) : (
              <p className="footer-note">Collect all letters to reveal the final string.</p>
            )}
          </div>

          <div className="panel">
            <h3>What to do</h3>
            <p>When you have the string, <strong>send it to Karl</strong>. He will know what to do next.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

