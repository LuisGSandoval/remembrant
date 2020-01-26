const router = require('express').Router();
const User = require('../../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateLogin = require('../../validation/LoginValidation');
const validateVisitorRegistration = require('../../validation/validateVisitorRegistration');

/**
 * @route POST /api/access/login
 * @desc Login de usuarios
 * @access Public
 */

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'Este usuario no existe';
        return res.status(400).json(errors);
      }

      /* Check password */
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            email: user.email
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 36000 },
            (err, token) => {
              res.json({
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.password = 'Contraseña incorrecta';
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => {
      errors.msg = 'Ocurrió un error';
      errors.type = 'danger';
      errors.data = err;
      return res.status(400).json(errors);
    });
});

/**
 * @route POST /api/access/register
 * @desc Create a new user
 * @access Public
 */
router.post('/register', (req, res) => {
  const { errors, isValid } = validateVisitorRegistration(req.body);

  if (!isValid) {
    errors.type = 'danger';
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user !== null) {
        errors.msg = 'Este usuario ya está registrado';
        errors.type = 'info';
        return res.status(400).json(errors);
      }

      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }

          newUser.password = hash;

          newUser
            .save()
            .then(() => {
              res.json({
                msg: 'Usuario creado exitosamente',
                type: 'success'
              });
              return;
            })
            .catch(err => {
              errors.msg = 'Ocurrió un error';
              errors.type = 'danger';
              errors.data = err;
              return res.status(400).json(errors);
            });
        });
      });
    })
    .catch(err => res.json(err));
});

module.exports = router;
