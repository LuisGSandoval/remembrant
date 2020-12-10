const router = require('express').Router();
const Transaction = require('../../models/Transaction');

/**
 * @route POST /api/transactions/new
 * @desc Shows all the transactions that have been done with wompi
 * @access Public
 */

router.post('/new', (req, res) => {
  const { data } = req.body;
  const { transaction } = data;
  const { id, reference } = transaction;

  const newTransaction = new Transaction({
    transactionId: id,
    referenceId: reference,
    description: JSON.stringify(req.body),
  });

  newTransaction
    .save()
    .then((data) => {
      res.json({
        msg: 'Transacción exitosa',
        type: 'success',
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        msg: 'Error al crear la transaccón',
        type: 'danger',
        data: err,
      });
    });
});

module.exports = router;
