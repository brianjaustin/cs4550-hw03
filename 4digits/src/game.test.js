import * as gameHelpers from './game';
import { expect } from 'chai';
import _ from 'lodash';

test('randomSecret generates a 4-digit number with no repeats', () => {
    for (let i = 0; i < 100; i++) {
        let result = gameHelpers.randomSecret();
        expect(result).to.be.above(999);
        expect(result).to.be.below(10000);
        expect(result.toString()).to.equal(_.uniq(result.toString()).join(''))
    }
});

test('validateGuess secret=1234, guess=4444', () => {
    let result = gameHelpers.validateGuess(1234, "4444");
    expect(result.correct).to.equal(1);
    expect(result.displaced).to.equal(3);
});

test('validateGuess secret=4444, guess=1234', () => {
    let result = gameHelpers.validateGuess(4444, "1234");
    expect(result.correct).to.equal(1);
    expect(result.displaced).to.equal(0);
});

test('validateGuess secret=1234, guess=4567', () => {
    let result = gameHelpers.validateGuess(1234, "4567");
    expect(result.correct).to.equal(0);
    expect(result.displaced).to.equal(1);
});

test('validateGuess secret=1234, guess=1324', () => {
    let result = gameHelpers.validateGuess(1234, "1324");
    expect(result.correct).to.equal(2);
    expect(result.displaced).to.equal(2);
});

test('validateGuess secret=1234, guess=5678', () => {
    let result = gameHelpers.validateGuess(1234, "5678");
    expect(result.correct).to.equal(0);
    expect(result.displaced).to.equal(0);
});

test('validateGuess secret=1234, guess=1234', () => {
    let result = gameHelpers.validateGuess(1234, "1234");
    expect(result.correct).to.equal(4);
    expect(result.displaced).to.equal(0);
});

test('guessResult returns the expected string', () => {
    let secret = gameHelpers.randomSecret();
    let guess = "1234";
    let counts = gameHelpers.validateGuess(secret, guess);
    let result = gameHelpers.guessResult(secret, guess);
    expect(result).to.equal(`${counts.correct}A${counts.displaced}B`);
});

test('isGameOver behaves as expected', () => {
    let guess1 = [1234];
    let guess7 = [1, 2, 3, 4, 5, 6, 7];
    let guess8 = [1, 2, 3, 4, 5, 6, 7, 8];
    let guess9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    expect(gameHelpers.isGameOver(guess1)).to.be.false;
    expect(gameHelpers.isGameOver(guess7)).to.be.false;
    expect(gameHelpers.isGameOver(guess8)).to.be.true;
    expect(gameHelpers.isGameOver(guess9)).to.be.true;
});

test('isGameWon behaves as expected', () => {
    let secret = 4567;
    let guessWithoutSecret = [1234, 4321];
    let guessWithSecret = [1234, 4321, secret];
    
    expect(gameHelpers.isGameWon(guessWithoutSecret, secret)).to.be.false;
    expect(gameHelpers.isGameWon(guessWithSecret, secret)).to.be.true;
});
