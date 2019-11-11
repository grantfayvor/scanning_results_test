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
  findings: [
    {
      type: {
        type: String,
        required: true
      },
      ruleId: {
        type: String,
        required: true
      },
      location: {
        path: {
          type: String,
          required: true
        },
        positions: {
          begin: {
            line: {
              type: Number,
              required: true
            }
          }
        }
      },
      metadata: {
        description: {
          type: String,
          required: true
        },
        severity: {
          type: String,
          required: true
        }
      }
    }
  ],
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