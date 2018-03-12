var db_config = {
    test: {
        uri : 'mongodb://localhost/test',
        database: {
            host:   '127.0.0.1',
            port:   '27017',
            db:     'test'
        },
    },
    dev: {
        uri : process.env.MONGODB_URI || 'mongodb://localhost/goober',
        database: {
            host: '127.0.0.1',
            port: '27017',
            db:   'goober'
        },
    }
};

module.exports = db_config;
