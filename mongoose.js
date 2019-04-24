const mongoose = require('mongoose');

module.exports = function (connStr) {
    mongoose.connect(connStr, { useNewUrlParser: true });
    mongoose.Promise = global.Promise;

    //Get the default connection
    var defConn = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    defConn.on('error', console.error.bind(console, 'MongoDB connection error:'));    
};