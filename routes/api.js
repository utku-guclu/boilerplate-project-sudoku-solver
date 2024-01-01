'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
  .post((req, res) => {
    const { puzzle, coordinate, value } = req.body;

    if (!puzzle || !coordinate || !value) {
      return res.status(400).json({ error: 'Required field(s) missing' });
    }

    try {
      solver.validate(puzzle);
    } catch (error) {
      if (error.message === "Required field missing" || error.message === "Expected puzzle to be 81 characters long" || error.message === "Invalid characters in puzzle") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Validate the coordinate format
    if (!/^[A-I][1-9]$/.test(coordinate)) {
      return res.status(400).json({ error: 'Invalid coordinate' });
    }

    // Validate the value
    if (!/^[1-9]$/.test(value)) {
      return res.status(400).json({ error: 'Invalid value' });
    }

    const row = coordinate.charCodeAt(0) - 65;
    const col = parseInt(coordinate.substring(1)) - 1;

    const board = solver.parsePuzzleString(puzzle);

    // Check if the value is already placed in the puzzle on that coordinate
    if (board[row][col] == value) {
      return res.json({ valid: true });
    }

    const validCol = solver.checkColPlacement(board, row, col, value);
    const validRow = solver.checkRowPlacement(board, row, col, value);
    const validReg = solver.checkRegionPlacement(board, row, col, value);

    if (validCol && validRow && validReg) {
      return res.json({ valid: true });
    }

    const conflicts = [];

    if (!validCol) {
      conflicts.push('column');
    }
    if (!validRow) {
      conflicts.push('row');
    }
    if (!validReg) {
      conflicts.push('region');
    }

    return res.json({ valid: false, conflict: conflicts });
  });

  app.route('/api/solve')
  .post((req, res) => {
    const puzzle = req.body.puzzle;

    if (!puzzle) {
      return res.status(400).json({ error: 'Required field missing' });
    }

    try {
      solver.validate(puzzle);
    } catch (error) {
      if (error.message === "Required field missing" || error.message === "Expected puzzle to be 81 characters long" || error.message === "Invalid characters in puzzle") {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const solution = solver.solve(puzzle);

    if (!solution) {
      return res.status(400).json({ error: 'Puzzle cannot be solved' });
    }

    return res.json({ solution });
  });
};
