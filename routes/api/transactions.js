const router = require('express').Router();
const passport = require('passport');
const Transaction = require('../../models/Transaction');

/**
 * @route POST /api/transactions/new
 * @desc Shows all the transactions that have been done with wompi
 * @access Public
 */

router.post('/new', (req, res) => {
  const { data } = req.body;
  const { transaction } = data;
  const {
    id,
    reference,
    customer_email,
    user_legal_id_type,
    user_legal_id,
    customer_data,
    status,
  } = transaction;

  const newTransaction = new Transaction({
    transactionId: transactionId,
    referenceId: reference,
    description: JSON.stringify(req.body),
  });

  let bodyToUpdate = {
    // Bank data
    customerNameBank: customer_data.full_name,
    customerEmailBank: customer_email,
    customerDocTypeBank: user_legal_id_type,
    customerDocNumBank: user_legal_id,
    customerPhoneNumberBank: customer_data.phone_number,
    customerPaymentStatusBank: status,
    // for logistical purposes inside website
    bankReferenceId: id,
  };

  newTransaction
    .save()
    .then(() => {
      Appointment.findOneAndUpdate(
        {
          paymentReferenceId: reference,
        },
        {
          $set: {
            ...bodyToUpdate,
            appointmentStatus: 'after bank payment process',
          },
        },
        { new: true, useFindAndModify: false }
      )
        .then((updatedAppointment) => {
          res.json({
            msg: 'Cita agendada exitosamente',
            type: 'success',
            data: updatedAppointment,
          });
        })
        .catch((err) =>
          res.status(400).json({
            msg: 'Error al agendada la cita',
            type: 'error',
            data: err,
          })
        );
    })
    .catch((err) => {
      const newAppointment = new Appointment({
        ...bodyToUpdate,
        appointmentStatus: 'ref not found / after bank payment process',
      });
      newAppointment
        .save()
        .then(() => {})
        .catch(
          res.status(400).json({
            msg: 'Error al guardar data',
            type: 'danger',
            data: err,
          })
        );
    });
});

module.exports = router;
