const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ResultSchema = new Schema({
  status: {
    type: String,
    required: true,
    enum: ["Queued", "In Progress", "Success", "Failure"]
  },
  repositoryName: {
    type: String,
    required: true
  },
  findings: [mongoose.SchemaTypes.Mixed],
  queuedAt: {
    type: Date,
    required: true
  },
  scanningAt: {
    type: Date,
    required: true
  },
  finishedAt: {
    type: Date,
    required: true
  }
});

const model = mongoose.model("Result", ResultSchema);

function ResultStore() {

  this.save = function (result) {
    return model.create(result);
  };

  this.getAll = function () {
    return this.getByParam();
  };

  this.getByParam = function (filter = {}) {
    return model.find(filter);
  }
}

module.exports = new ResultStore();