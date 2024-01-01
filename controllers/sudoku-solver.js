class SudokuSolver {
  validate(puzzleString) {
    // Check if the puzzle string is not empty and contains only digits and dots
    const isValid = /^[0-9.]{81}$/.test(puzzleString);

    if (!isValid) {
      throw new Error('Invalid puzzle string. It should be a string of 81 characters containing only digits (1-9) and dots.');
    }
  }

  isSafe(board, row, col, num) {
    const rowP = this.checkRowPlacement(board, row, col, num);
    const colP = this.checkColPlacement(board, row, col, num);
    const regP = this.checkRegionPlacement(board, row, col, num);

    return rowP && colP && regP;
  }

  checkRowPlacement(board, row, col, value) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(board, row, col, value) {
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(board, row, col, value) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === value) {
          return false;
        }
      }
    }
    return true;
  }

  solve(puzzleString) {
    try {
      this.validate(puzzleString);
    } catch (error) {
      return error.message; // Return the validation error message
    }
    
    const board = this.parsePuzzleString(puzzleString);

    const emptyCell = this.findEmptyCell(board);

    if (!emptyCell) {
      return this.boardToString(board);
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
      if (this.isSafe(board, row, col, num)) {
        board[row][col] = num;

        const result = this.solve(this.boardToString(board));

        if (result) {
          return result;
        }

        board[row][col] = 0;
      }
    }

    return false;
  }

  parsePuzzleString(puzzleString) {
    const board = [];

    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        const char = puzzleString.charAt(i * 9 + j);
        row.push(char === '.' ? 0 : parseInt(char, 10));
      }
      board.push(row);
    }

    return board;
  }

  boardToString(board) {
    let puzzleString = '';
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        puzzleString += board[i][j] === 0 ? '.' : String(board[i][j]);
      }
    }
    return puzzleString;
  }

  findEmptyCell(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return null;
  }
}

module.exports = SudokuSolver;
