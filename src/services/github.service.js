'use strict';

const Got = require('got');

module.exports = async function getRepos(params) {

    try {
        const query = generateQuery(params);
        const response = await Got('https://api.github.com/search/repositories', query);
        return response.body;
    }
    catch (error) {
        throw error;
    }
};

const generateQuery = (params) => {

    const query = {
        searchParams: {
            sort: 'stars',
            order: 'desc'
        }
    };

    let queryString = '';

    query.searchParams.per_page = params.limit;

    const createdFrom = `created:>${params.date}`;
    queryString = getQueryString(queryString, createdFrom);

    if ( params.language !== undefined ) {

        const lang = `language:${params.language}`;
        queryString = getQueryString(queryString, lang);
    }

    query.searchParams.q = queryString;

    return query;
};

const getQueryString = (queryString, param) => {

    if (queryString === '') {
        return param;
    }

    return `${queryString} ${param}`;
};
