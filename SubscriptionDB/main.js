const express = require('express');
const membersController = require('./controllers/membersController');
const moviesController = require('./controllers/moviesController');
const subscriptionsController = require('./controllers/subscriptionsController');
const cors = require('cors');
const bodyParser = require('body-parser');
let app = express();

require('./configs/database');
require('./configs/initData');

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
app.use(cors());
app.use('/members', membersController);
app.use('/movies', moviesController);
app.use('/subscriptions', subscriptionsController);

app.listen(8090, async () => {
	console.log('Server is up!');
});
