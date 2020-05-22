'use strict';

const Hapi = require('@hapi/hapi');
const port = process.env.PORT || 3000;
const routes = require('./src/routes/routes.js');

exports.init = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port
    });

    routes(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
