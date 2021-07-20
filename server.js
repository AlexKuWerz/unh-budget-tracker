const express = require('express');
const logger = require('morgan');
const path = require('path');
const compression = require('compression');
const mongoose = require('./config/connection');
const routes = require('./controllers');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(compression());
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}!`);
    });
});
