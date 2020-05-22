'use strict';

module.exports = function (server) {

    const repos = require('../controllers/repositoriesController');
    const JoiBase = require('@hapi/joi');
    const JoiDate = require('@hapi/joi-date');

    const Joi = JoiBase.extend(JoiDate);

    server.route({
        method: 'GET',
        path: '/',
        handler: repos.list_repositories,
        options: {
            tags: ['api'],
            description: 'repositories',
            notes: 'Get list of trending Github repositories based on parameters passed by query string',
            validate: {
                query: Joi.object({
                    limit: Joi.number()
                        .description('Limit the amount of returned repositories.')
                        .equal(10, 50, 100)
                        .default(10),
                    creation_date: Joi.date()
                        .description('Date of creation of a repository. Format allowed: (YYYY-MM-DD).')
                        .format('YYYY-MM-DD')
                        .raw(),
                    language: Joi.string()
                        .description('Programming language.')
                })
            }
        }
    });
};
