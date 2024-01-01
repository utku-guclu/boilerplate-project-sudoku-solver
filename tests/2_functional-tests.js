const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  // Solve a puzzle with valid puzzle string
  test('Solve a puzzle with valid puzzle string', (done) => {
    chai
      .request(app)
      .post('/api/solve')
      .send({ puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'solution');
        assert.equal(
          res.body.solution,
          '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
        );
        done();
      });
  });

  // Solve a puzzle with missing puzzle string
  test('Solve a puzzle with missing puzzle string', (done) => {
    chai
      .request(app)
      .post('/api/solve')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Required field missing');
        done();
      });
  });

  // Solve a puzzle with invalid characters
  test('Solve a puzzle with invalid characters', (done) => {
    chai
      .request(app)
      .post('/api/solve')
      .send({ puzzle: '83..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....X..16' })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });

  // Solve a puzzle with incorrect length
  test('Solve a puzzle with incorrect length', (done) => {
    chai
      .request(app)
      .post('/api/solve')
      .send({ puzzle: '53..7....6..195....98....6.8...6...34..8.3..17...' })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });

  // Solve a puzzle that cannot be solved
  test('Solve a puzzle that cannot be solved', (done) => {
    chai
      .request(app)
      .post('/api/solve')
      .send({ puzzle: '83..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....7..16' })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Puzzle cannot be solved');
        done();
      });
  });

  // Check a puzzle placement with all fields
  test('Check a puzzle placement with all fields', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({ puzzle: '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....7..16', coordinate: 'A1', value: '2' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'valid');
        assert.equal(res.body.valid, true);
        done();
      });
  });

  // Add more functional tests for the remaining cases...

  // Check a puzzle placement with invalid characters
  test('Check a puzzle placement with invalid characters', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({
        puzzle: '83..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....X..16',
        coordinate: 'A1',
        value: '2',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });

  // Check a puzzle placement with incorrect length
  test('Check a puzzle placement with incorrect length', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({
        puzzle: '53..7....6..195....98....6.8...6...34..8.3..17...',
        coordinate: 'A1',
        value: '2',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });

  // Check a puzzle placement with invalid placement coordinate
  test('Check a puzzle placement with invalid placement coordinate', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({
        puzzle: '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....7..16',
        coordinate: 'Z1',
        value: '2',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid coordinate');
        done();
      });
  });

  // Check a puzzle placement with invalid placement value
  test('Check a puzzle placement with invalid placement value', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({
        puzzle: '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....7..16',
        coordinate: 'A1',
        value: '10',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid value');
        done();
      });
  });

  // Check a puzzle placement with invalid characters
  test('Check a puzzle placement with invalid characters', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({
        puzzle: '83..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....X..16',
        coordinate: 'A1',
        value: '2',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid characters in puzzle');
        done();
      });
  });

  // Check a puzzle placement with incorrect length
  test('Check a puzzle placement with incorrect length', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({
        puzzle: '53..7....6..195....98....6.8...6...34..8.3..17...',
        coordinate: 'A1',
        value: '2',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
        done();
      });
  });

  // Check a puzzle placement with invalid placement coordinate
  test('Check a puzzle placement with invalid placement coordinate', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({
        puzzle: '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....7..16',
        coordinate: 'Z1',
        value: '2',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid coordinate');
        done();
      });
  });

  // Check a puzzle placement with invalid placement value
  test('Check a puzzle placement with invalid placement value', (done) => {
    chai
      .request(app)
      .post('/api/check')
      .send({
        puzzle: '53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....7..16',
        coordinate: 'A1',
        value: '10',
      })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid value');
        done();
      });
  });

  
});
