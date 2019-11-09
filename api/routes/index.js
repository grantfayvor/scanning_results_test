const express = require('express'),
  router = express.Router(),
  resultStore = require('../stores/ResultStore');

router.get('/', async function (req, res, next) {
  try {
    let results = await resultStore.getAll();
    res.json({
      data: {
        items: results,
        total: results.length
      }
    });
  } catch (err) {
    res.status(500).send({ message: "An error occurred", err });
  }
});

router.post('/', async function (req, res, next) {
  try {
    let result = await resultStore.save(req.body.result);
    res.json({
      data: result
    });
  } catch (err) {
    res.status(500).send({ message: "An error occurred", err });
  }
});

module.exports = router;
