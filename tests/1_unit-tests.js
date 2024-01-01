const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {
  setup(() => {
    solver = new Solver();
  });

  test('Valid Puzzle 1', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    const solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
    assert.equal(solver.solve(puzzle), solution);
  });

  test('Valid Puzzle 2', () => {
    const puzzle = '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3';
    const solution = '568913724342687519197254386685479231219538467734162895926345178473891652851726943';
    assert.equal(solver.solve(puzzle), solution);
  });

  test('Valid Puzzle 3', () => {
    const puzzle = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1';
    const solution = '218396745753284196496157832531672984649831257827549613962415378185763429374928561';
    assert.equal(solver.solve(puzzle), solution);
  });

  test('Valid Puzzle 4', () => {
    const puzzle = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
    const solution = '473891265851726394926345817568913472342687951197254638734162589685479123219538746';
    assert.equal(solver.solve(puzzle), solution);
  });

  test('Valid Puzzle 5', () => {
    const puzzle = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
    const solution = '827549163531672894649831527496157382218396475753284916962415738185763249374928651';
    assert.equal(solver.solve(puzzle), solution);
  });

  // Validation errors should throw the expected errors
  test('Required field missing in validation', () => {
    
    assert.throws(() => solver.validate(), 'Required field missing');
  });

  test('Expected puzzle length error in validation', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.3';
    assert.throws(() => solver.validate(puzzle), 'Expected puzzle to be 81 characters long');
  });

  test('Invalid characters in puzzle error in validation', () => {
    const puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....92691A.37.';
    assert.throws(() => solver.validate(puzzle), 'Invalid characters in puzzle');
  });

  test('Unsolvable Puzzle', () => {
    const puzzle = '..73.5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.equal(solver.solve(puzzle), false);
  });

  /* FFC */

  // Logic handles a valid puzzle string of 81 characters
  test('Logic handles a valid puzzle string of 81 characters', () => {
    const puzzleString = '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....7..16';
    assert.isTrue(solver.validate(puzzleString));
  });

  // Logic handles a puzzle string with invalid characters (not 1-9 or .)
  test('Logic handles a puzzle string with invalid characters', () => {
    const invalidPuzzleString = '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....41X..5....7..16';
    assert.throws(() => solver.validate(invalidPuzzleString), 'Invalid characters in puzzle');
  });

  // Logic handles a puzzle string that is not 81 characters in length
  test('Logic handles a puzzle string that is not 81 characters in length', () => {
    const invalidLengthPuzzleString = '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....4';
    assert.throws(() => solver.validate(invalidLengthPuzzleString), 'Expected puzzle to be 81 characters long');
  });

  // ... Other tests ...

  // Valid puzzle strings pass the solver
  test('Valid puzzle strings pass the solver', () => {
    const validPuzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    const solution = solver.solve(validPuzzleString);
    assert.isTrue(solver.validate(solution));
  });

  // Invalid puzzle strings fail the solver
  test('Invalid puzzle strings fail the solver', () => {
    const invalidPuzzleString = '83..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....7..16';
    const result = solver.solve(invalidPuzzleString);
    assert.strictEqual(result, false);
  });

  // Solver returns the expected solution for an incomplete puzzle
  test('Solver returns the expected solution for an incomplete puzzle', () => {
    const incompletePuzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    const expectedSolution =
      '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
    assert.equal(solver.solve(incompletePuzzleString), expectedSolution);
  });

  // Solver returns the expected solution for a completed puzzle
test('Solver returns the expected solution for a completed puzzle', () => {
  const completedPuzzleString = '361357629849463812577284596136945178328129745357824196473298561581673429269145378';
  assert.equal(solver.solve(completedPuzzleString), completedPuzzleString);
});

// Solver returns false for an unsolvable puzzle
test('Solver returns false for an unsolvable puzzle', () => {
  const unsolvablePuzzleString = '..73.5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
  assert.strictEqual(solver.solve(unsolvablePuzzleString), false);
});

});
