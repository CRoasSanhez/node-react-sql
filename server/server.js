const express = require('express');
const app = express();
const session = require('express-session')
const bodyParser = require('body-parser');
const PORT = 4200;
const cors = require('cors');
const uuid = require('uuid/v4')
const mariadb = require('mariadb')
const initiDB = require("./init_db")

const countryRouter = require('./routes/CountriesRoutes');
const usersRouter = require('./routes/UsersRoutes');
const tracksRouter = require('./routes/TracksRoutes');
const albumsRouter = require('./routes/AlbumsRoutes');

mariadb.createConnection({
  port: 3306,
  database: "bquate_test_musica",
  user: "admin",
  password: 'password'
})
  .then(conn => {
    console.log("connected ! connection id is " + conn.threadId);
    try {
      initiDB.init(conn);
    } catch (err) {
      console.log(err)
    }
  })
  .catch(err => {
    console.log("not connected due to error: " + err);
  });


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  user: null,
  secret: 'testChallenge',
  resave: false,
  saveUninitialized: true
}))

app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/country', countryRouter);
app.use('/albums', albumsRouter);

// Hanbdle 404 request
app.get('*', function (req, res) {
  res.status(404).send('Return to the light side young master!!!');
});


app.listen(PORT, function () {
  console.log('Server is running on Port: ', PORT);
});