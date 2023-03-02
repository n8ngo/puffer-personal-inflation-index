const express = require('express');
const db = require('../models/dbConnect.js')
const router = express.Router();

//GET ALL Expenses
router.get('/', (req, res, next) => {
  db.query('SELECT expense.*, category AS category_name From expense LEFT OUTER JOIN category ON category._id = exp_category')
    .then(data => {
      res.locals.allExpenses = data.rows;
      console.log(data.rows);
      return next();
    })
    .catch((e) => {
      return next({
        log: 'Error in solo/GET',
        message: e,
      });
    });
},
(req, res) => {
  console.log('inside last middleware')
  res.status(200).json(res.locals.allExpenses);
}
);

//ADD Expense
router.post('/', (req, res, next) => {
  const {exp_name, exp_amt, exp_created, exp_category, exp_note} = req.body;
  const queryText = 'INSERT INTO expense (exp_name, exp_amt, exp_created, exp_category, exp_note) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const params = [
    exp_name,
    exp_amt,
    exp_created,
    exp_category,
    exp_note
  ];
  db.query(queryText, params)
    .then((data) => {
      res.locals.addResult = data.rows;
      return next();
    });
},
(req, res) => {
  // res.status(200).json(res.locals.addResult);
  res.sendStatus(200);
}
);

router.delete('/:id', (req, res, next) => {
  const params = [req.params.id];
  db.query('DELETE FROM expense WHERE _id = $1', params)
  .then(data => {
      if (data.rowCount === 0) {
        return next({
          log: 'Delete Failed, ID not found',
          message: data
        });
      }
      console.log('DELETE ROWCOUNT', data.rowCount);
      res.locals.delete = data.rowCount;
      return next();
    });
},
(req, res) =>{
  res.status(200).json(res.locals.delete);
});

router.get('/cats', (req, res, next) => {
  db.query('SELECT category, _id FROM category')
  .then(data => {
    // console.log('MIDDLEWARE', data.rows)
    res.locals.cats = data.rows;
    res.status(200).json(res.locals.cats)
  })
})


module.exports = router;
