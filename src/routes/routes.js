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
      validate: {
        query: Joi.object({
          limit: Joi.number()
            .equal(10, 50, 100)
            .default(10),
          created_on: Joi.date()
            .format("YYYY-MM-DD")
            .raw()
            .default('2019-01-10'),
          language: Joi.string()
        })
      }
    }
  });
}
