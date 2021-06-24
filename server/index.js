const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({db});

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
})

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'my secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
})

sessionStore.sync();
db.sync();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});

module.exports = app;
