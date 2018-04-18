var db_config = {
    test: {
        uri : process.env.MONGODB_URI+'test' || 'mongodb://localhost/test',
        database: {
            host:   '127.0.0.1',
            port:   '27017',
            db:     'test'
        },
    },
    dev: {
        uri : process.env.MONGODB_URI+'goober' || 'mongodb://localhost/goober',
        database: {
            host: '127.0.0.1',
            port: '27017',
            db:   'goober'
        },
    },
    prod: {
        uri: 'mongodb://admin:password@ds213229.mlab.com:13229/goober',
        database:{
            host: 'ds213229.mlab.com',
            port: '13229',
            db: 'goober'
        },
    }
};

module.exports = db_config;
