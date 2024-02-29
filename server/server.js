const express = require('express');
const mongoose = require('mongoose');
const routesApp= require('./passport/auth/index')
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy=require('./passport/localStrategy')
const session = require('express-session');
mongoose.Promise = global.Promise;

const MONGO_LOCAL_URL = 'mongodb+srv://nishchitha:Nishu123@cluster0.3sbraky.mongodb.net/pills';
const MONGODB_URI = process.env.MONGODB_URI || MONGO_LOCAL_URL;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(`There was an error connecting to the database: ${err}`);
});

db.once('open', () => {
  console.log(`You have successfully connected to your mongo database: ${MONGODB_URI}`);
});

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	session({
	  secret: 'your-secret-key',
	  resave: false,
	  saveUninitialized: false,
	})
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Use the local strategy
  passport.use(localStrategy);
  
  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
	done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
	  done(err, user);
	});
  });
app.use('/', routesApp);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, db }; // Exporting both the app and db for potential usage elsewhere in your application
