const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  fullTransaction: {
    type: String,
  },
  referenceId: {
    type: String,
  },
  transactionId: {
    type: String,
  },
  description: {
    type: String,
  },
  dateRegistered: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Transaction = mongoose.model(
  'transactions',
  TransactionSchema
);
