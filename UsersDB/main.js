const express = require('express');
const usersDataController = require('./controllers/usersDataController');
const subscriptionsController = require('./controllers/subscriptionsController');
const moviesController = require('./controllers/moviesController');
const membersController = require('./controllers/membersController');
const accountsController = require('./controllers/accountsController');
const cors = require('cors');
const bodyParser = require('body-parser');
let app = express();

require('./configs/database');
require('./configs/initusers');

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
app.use(cors());
app.use('/users', usersDataController);
app.use('/members', membersController);
app.use('/movies', moviesController);
app.use('/subscriptions', subscriptionsController);
app.use('/accounts', accountsController);

app.listen(8080, async () => {
	console.log('Server is up!');
});
