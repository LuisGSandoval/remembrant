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
});

module.exports = Transaction = mongoose.model(
  'transactions',
  TransactionSchema
);
