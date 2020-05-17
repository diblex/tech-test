/**
 * DO NOT MODIFY THIS FILE FOR THE EXERCISE
 */

import {describe, it} from 'mocha'
import * as request from 'request-promise'
import {init as appInit} from 'app'
import {findIndex} from 'lodash'
import should from 'should'

const baseUrl = 'http://localhost:3000'
let app;

describe('Running tests', () => {
  before(async () => {
    console.info = () => {}
    app = await appInit()
  })
  after(() => {
    process.exit(0)
  })

  describe('GET /order/:id', () => {
    it('should return an order', async () => {
      let orderId = 2
      let opts = {
        json: {},
        headers: {},
        resolveWithFullResponse: true
      }
      let res = await request.get(`${baseUrl}/order/${orderId}`, opts)
      should(res.statusCode).eql(200)
      should(res.body.id).eql(2)
      should(res.body.createdAt).eql('2020-08-16T11:58:37.315Z')
      should(res.body.deliveredAt).eql('2020-08-16T12:18:37.315Z')
    })

    it('should return an order including its items', async () => {
      let orderId = 1
      let opts = {
        json: {},
        headers: {},
        resolveWithFullResponse: true
      }
      let res = await request.get(`${baseUrl}/order/${orderId}`, opts)
      should(res.statusCode).eql(200)
      should(res.body.createdAt).eql('2020-05-16T16:58:37.315Z')
      should(res.body.deliveredAt).eql('2020-05-16T17:18:37.315Z')
      should(findIndex(res.body.items, {
        id: 1,
        name: 'coke',
        price: 1,
        currency: 'CHF'
      })).not.eql(-1)
      should(findIndex(res.body.items, {
        id: 2,
        name: 'shoe',
        price: 35,
        currency: 'CHF'
      })).not.eql(-1)
    })
  })

  describe('GET /order', () => {
    it('should return a list of orders', async () => {
      let opts = {
        json: {},
        headers: {},
        resolveWithFullResponse: true
      }
      let res = await request.get(`${baseUrl}/order`, opts)
      should(res.statusCode).eql(200)
      should(res.body.length).eql(8)
      should(findIndex(res.body, {
        "id": 2,
        "createdAt": "2020-08-16T11:58:37.315Z",
        "deliveredAt": "2020-08-16T12:18:37.315Z",
        "itemsIds": [3]
      })).not.eql(-1)
    })
  })

  describe('GET /order?page=<x>&limit=<x>', () => {
    it('should return a paginated list of orders', async () => {
      let opts = {
        json: {},
        headers: {},
        resolveWithFullResponse: true
      }
      let res = await request.get(`${baseUrl}/order?page=3&limit=3`, opts)
      should(res.statusCode).eql(200)
      should(res.body.length).eql(2)
      should(findIndex(res.body, {
        "id": 8,
        "createdAt": "2020-10-21T11:58:37.315Z",
        "deliveredAt": "2020-10-21T12:18:37.315Z",
        "itemsIds": [1,2,3]
      })).not.eql(-1)
    })
  })

  describe('GET /order?page=0&limit=<x>', () => {
    it('should return the first page', async () => {
      let opts = {
        json: {},
        headers: {},
        resolveWithFullResponse: true
      }
      let res = await request.get(`${baseUrl}/order?page=0&limit=3`, opts)
      should(res.statusCode).eql(200)
      should(res.body.length).eql(3)
      should(findIndex(res.body, {
        "id": 1,
        "createdAt": "2020-05-16T16:58:37.315Z",
        "deliveredAt": "2020-05-16T17:18:37.315Z",
        "itemsIds": [1, 2]
      })).not.eql(-1)
    })
  })

  describe('GET /order?page=<x>&limit=<x>&sort=createdAt&order=asc', () => {
    it('should return a list of orders paginated and sorted by createdAt and with ascendent order', async () => {
      let opts = {
        json: {},
        headers: {},
        resolveWithFullResponse: true
      }
      let res = await request.get(`${baseUrl}/order?page=7&limit=1&sort=createdAt&order=asc`, opts)
      should(res.statusCode).eql(200)
      should(res.body.length).eql(1)
      should(findIndex(res.body, {
        "id": 3,
        "createdAt": "2020-09-16T12:58:37.315Z",
        "deliveredAt": "2020-09-16T13:18:37.315Z",
        "itemsIds": [1]
      })).not.eql(-1)
    })
  })

  describe('GET /order?page=<x>&limit=<x>&sort=createdAt&order=asc', () => {
    it('should return a list of orders paginated and sorted by deliveredAt and with descendent order', async () => {
      let opts = {
        json: {},
        headers: {},
        resolveWithFullResponse: true
      }
      let res = await request.get(`${baseUrl}/order?page=2&limit=1&sort=deliveredAt&order=desc`, opts)
      should(res.statusCode).eql(200)
      should(res.body.length).eql(1)
      should(findIndex(res.body, {
        "id": 3,
        "createdAt": "2020-09-16T12:58:37.315Z",
        "deliveredAt": "2020-09-16T13:18:37.315Z",
        "itemsIds": [1]
      })).not.eql(-1)
    })
  })
})
