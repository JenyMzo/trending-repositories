'use strict';

const getRepos = require('../services/github.service.js');
const defaultDate = '2019-01-10'

exports.list_repositories = function (req, h) {
    const limit = req.query.limit;
    const date = req.query.created_on || defaultDate;

    let params = { limit, date };

    if(req.query.language !== undefined) {
        const language = req.query.language;
        params = {...params, language}
    }

    return getRepos(params).then((data) => {
        return h.response({
            items: JSON.parse(data).items
        }).code(200);
    }).catch((error) => {
        return h.response({
            error: error.message
        }).code(422);
    });
};
