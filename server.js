const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

//Connect to mongoDB
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.log('DB error', err));

// Body parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// use routes
const access = require('./routes/api/accessRoute');
const notes = require('./routes/api/notesRoute');

app.use('/api/access', access);
app.use('/api/notes', notes);

// Passport
require('./config/passport')(passport);
app.use(passport.initialize());

//Use static (front end) files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

port = process.env.PORT || 5011;
app.listen(port, () => console.log(`http://localhost:${port}`));
