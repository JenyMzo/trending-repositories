'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { init } = require('../app');

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();

describe('GET /', () => {

    let server;

    beforeEach({ timeout: 500 }, async () => {

        server = await init();
    });

    afterEach(async () => {

        await server.stop();
    });

    it('responds with 200', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/'
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result.items).to.have.length(10);
    });

    it('responds with 200 when limit is 50', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/?limit=50'
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result.items).to.have.length(50);
    });

    it('responds with 200 when limit is 100', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/?limit=100'
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result.items).to.have.length(100);
    });

    it('responds with 400 when limit is 30', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/?limit=30'
        });
        expect(res.statusCode).to.equal(400);
        expect(res.statusMessage).to.equals('Bad Request');
    });

    it('responds with 200 when sets a future date', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/?creation_date=2020-06-03'
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result.items).to.have.length(0);
    });

    it('responds with 200 when sets a date', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/?creation_date=2018-01-12'
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result.items).to.have.length(10);
    });

    it('responds with 400 when sets a an invalid date', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/?creation_date=2019.04.20'
        });
        expect(res.statusCode).to.equal(400);
        expect(res.statusMessage).to.equals('Bad Request');
    });

    it('responds with 200 when sets a programming language', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/?language=ruby'
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result.items).to.have.length(10);
    });

    it('responds with 400 when sends a random parameter', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/?random=true'
        });
        expect(res.statusCode).to.equal(400);
        expect(res.statusMessage).to.equals('Bad Request');
    });

    it('responds with 200 when sends all the valid parameters', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/?limit=50&creation_date=2019-01-12&language=javascript'
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result.items).to.have.length(50);
    });
});
