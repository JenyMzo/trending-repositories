'use strict';

const Hapi = require('@hapi/hapi');

const port = process.env.PORT || 3000;

const Routes = require('./src/routes/routes.js');

const Inert = require('@hapi/inert');

const Vision = require('@hapi/vision');

const HapiSwagger = require('hapi-swagger');

const Pack = require('./package');

const swaggerOptions = {
    info: {
        title: 'Trending Github Repositories',
        version: Pack.version
    }
};

exports.init = async () => {

    const server = Hapi.server({
        host: 'localhost',
        port
    });

    Routes(server);

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
