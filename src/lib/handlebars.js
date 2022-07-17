const timeago = require('timeago.js');
const timeagoInstance = timeago;

// objeto que puedo utilizar desde las vistas:
const hlepers = {};

hlepers.timeago = (timestamps) => {
    return timeagoInstance.format(timestamps);
};

module.exports = hlepers; 