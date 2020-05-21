'use strict';

const got = require('got');

module.exports = async function getRepos(params) {
    try {
        const query = generateQuery(params);
        const response = await got('https://api.github.com/search/repositories', query)
        return response.body;
    } catch (error) {
        throw error;
    }
};

function generateQuery(params) {
    let query = {
        searchParams: {
            sort: 'stars',
            order: 'desc'
        }
    }

    let queryString = '';

    query.searchParams.per_page = params.limit;

    if( params.date !== undefined ) {
        const createdFrom = `created:>${params.date}`;
        queryString = getQueryString(queryString, createdFrom);
    }

    if( params.language !== undefined ) {
        const lang = `language:${params.language}`
        queryString = getQueryString(queryString, lang);
    }

    if(queryString) {
        query.searchParams.q = queryString;
    }

    return query;
}

function getQueryString(queryString, param) {
    if (queryString === '') {
        return param;
    }

    return `${queryString} ${param}`;
}
