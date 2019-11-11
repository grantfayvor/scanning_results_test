const express = require('express'),
  router = express.Router(),
  resultStore = require('../stores/ResultStore');

router.route('/')
  .get(async (req, res) => {
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
  })
  .post(async (req, res) => {
    try {
      let result = await resultStore.save(req.body.result);
      res.json({
        data: result
      });
    } catch (err) {
      res.status(500).send({ message: "An error occurred", err });
    }
  });

router.get('/:repositoryName', async function (req, res) {
  try {
    let repositories = await resultStore.getByParam({ repositoryName: new RegExp(req.params.repositoryName, "gi") });
    res.json({
      data: {
        items: repositories,
        total: repositories.length
      }
    });
  } catch (err) {
    res.status(500).send({ message: "An error occurred", err });
  }
});

module.exports = router;
