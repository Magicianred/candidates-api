const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai")

chai.use(sinonChai)

const { assert } = chai

const sandbox = sinon.createSandbox()

const getAxios = sandbox.stub()

const axios = {
  get: getAxios
}

const { getAll, getCandidates, getJobs } = require('../services/geek')({ axios })

describe('getAll', function () {
  beforeEach(() => {
    sandbox.reset()
    getAxios.resolves({ data: { candidates: [{}], jobs: [{}] } })
  })

  it('expect getAll to be successful called', async () => {
    const data = await getAll()

    assert.isObject(data)
    assert.hasAllKeys(data, ['candidates', 'jobs'])
    assert.strictEqual(typeof (data), 'object')
    assert.strictEqual(getAxios.called, true)
  })

  it('expect getAll get an error', async () => {
    getAxios.reset()
    getAxios.rejects(new Error('Error'))

    const response = await getAll().catch(err => err)

    assert.strictEqual(response instanceof Error, true)
    assert.strictEqual(getAxios.called, true)
  })
})

describe('getCandidates', function () {
  beforeEach(() => {
    sandbox.reset()
    getAxios.resolves({
      data: {
        candidates: [{
          id: 1,
          city: 'Rio de Janeiro - RJ',
          experience: '1-2 years',
          technologies: [{
            name: "Java",
            is_main_tech: true
          }]
        }], jobs: [{}]
      }
    })
  })

  it('expect getCandidates to be called', async () => {
    const candidates = await getCandidates()

    assert.isArray(candidates)
    assert.hasAllKeys(candidates[0], ['id', 'city', 'experience', 'technologies'])
    assert.strictEqual(typeof (candidates), 'object')
    assert.strictEqual(getAxios.called, true)
  })

  it('expect getCandidates get an error', async () => {
    getAxios.reset()
    getAxios.rejects(new Error('Error'))

    const response = await getCandidates().catch(err => err)

    assert.strictEqual(response instanceof Error, true)
    assert.strictEqual(getAxios.called, true)
  })
})

describe('getJobs', function () {
  beforeEach(() => {
    sandbox.reset()
    getAxios.resolves({
      data: {
        candidates: [{}],
        jobs: [{
          id: 33922,
          city: "São Paulo - SP",
          technologies: [
            null,
            null
          ],
          experience: "2-4 years"
        }]
      }
    })
  })

  it('expect getJobs to be called', async () => {
    const jobs = await getJobs()

    assert.isArray(jobs)
    assert.hasAllKeys(jobs[0], ['id', 'city', 'experience', 'technologies'])
    assert.strictEqual(typeof (jobs), 'object')
    assert.strictEqual(getAxios.called, true)
  })

  it('expect getJobs get an error', async () => {
    getAxios.reset()
    getAxios.rejects(new Error('Error'))

    const response = await getJobs().catch(err => err)

    assert.strictEqual(response instanceof Error, true)
    assert.strictEqual(getAxios.called, true)
  })
})
