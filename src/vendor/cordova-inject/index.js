module.exports = {
    name: 'cordova-inject',

    contentFor: function(type) {
        if (type === 'cordova-inject') {
            return '<script src="cordova.js"></script>';
        }
    }
};
