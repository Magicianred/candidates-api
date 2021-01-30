const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai")

const data = require('./data.json')

chai.use(sinonChai);

const { assert } = chai

const sandbox = sinon.createSandbox()

const repository = {
  listCandidates: sinon.stub(),
  listCandidatesByLocal: sinon.stub(),
  listCandidatesByExperience: sinon.stub()
}

const services = {
  geekService: {
    getAll: sinon.stub(),
    getCandidates: sinon.stub(),
    getJobs: sinon.stub()
  }
}

const {
  listCandidates,
  listCandidatesByLocal,
  listJobs,
  listLocations,
  listTechs,
  getMatchedCandidates
} = require('../business')({ repository, services })

describe('business methods', function () {
  beforeEach(() => {
    sandbox.reset()
    repository.listCandidates.resolves([{
      id: 1,
      city: 'Rio de Janeiro - RJ',
      experience: '1-2 years',
      technologies: [{
        name: "Java",
        is_main_tech: true
      }]
    }])
    repository.listCandidatesByLocal.resolves(data)
    repository.listCandidatesByExperience.resolves([{
      id: 1,
      city: 'Rio de Janeiro - RJ',
      experience: '1-2 years',
      technologies: [{
        name: "Java",
        is_main_tech: true
      }]
    }])
    services.geekService.getAll.resolves({
      candidates: [{
        id: 1,
        city: 'Rio de Janeiro - RJ',
        experience: '1-2 years',
        technologies: [{
          name: "Java",
          is_main_tech: true
        }]
      },
      {
        id: 2,
        city: 'Rio de Janeiro - RJ',
        experience: '3-4 years',
        technologies: [{
          name: "Javascript",
          is_main_tech: true
        },
        {
          name: "HTML5",
          is_main_tech: false
        }]
      }],
      jobs: [{
        id: 42,
        city: 'São Paulo - SP',
        experience: '4-5 years',
        technologies: [
          "Java", "HTML5"
        ]
      }]
    })
    services.geekService.getCandidates.resolves([{
      id: 1,
      city: 'Rio de Janeiro - RJ',
      experience: '1-2 years',
      technologies: [{
        name: "Java",
        is_main_tech: true
      }]
    },
    {
      id: 2,
      city: 'Rio de Janeiro - RJ',
      experience: '3-4 years',
      technologies: [{
        name: "Javascript",
        is_main_tech: true
      },
      {
        name: "HTML5",
        is_main_tech: false
      }]
    }]
    )
    services.geekService.getJobs.resolves({ jobs: [{}] })
  })

  it('return successful listCandidates', async () => {
    const response = await listCandidates()

    assert.isArray(response)
    assert.hasAllKeys(response[0], ['id', 'city', 'experience', 'technologies'])
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(repository.listCandidates.called, true)
  })

  it('return no result listCandidates', async () => {
    repository.listCandidates.reset()
    repository.listCandidates.resolves([])
    const response = await listCandidates()

    assert.isArray(response)
    assert.isEmpty(response)
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(repository.listCandidates.called, true)
  })

  it('return error listCandidates', async () => {
    repository.listCandidates.reset()
    repository.listCandidates.rejects(new Error('Error'))
    const response = await listCandidates()

    assert.strictEqual(response instanceof Error, true)
    assert.strictEqual(repository.listCandidates.called, true)
  })

  it('return successful listCandidatesByLocal', async () => {
    const response = await listCandidatesByLocal({ city: 'Rio de Janeiro - RJ' })

    assert.isArray(response)
    assert.hasAllKeys(response[0], ['_id', 'id', 'city', 'experience', 'technologies'])
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(repository.listCandidatesByLocal.called, true)
  })

  it('return no result from listCandidatesByLocal', async () => {
    repository.listCandidatesByLocal.reset()
    repository.listCandidatesByLocal.resolves([])

    const response = await listCandidatesByLocal({ city: 'Porto Alegre - RS' })

    assert.isArray(response)
    assert.isEmpty(response)
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(repository.listCandidatesByLocal.called, true)
  })

  it('return successful listJobs', async () => {
    const response = await listJobs()

    assert.isObject(response)
    assert.hasAllKeys(response, ['jobs'])
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(services.geekService.getJobs.called, true)
  })

  it('return error from listJobs', async () => {
    services.geekService.getJobs.reset()
    services.geekService.getJobs.rejects(new Error('Error'))
    const response = await listJobs()

    assert.strictEqual(response instanceof Error, true)
    assert.strictEqual(services.geekService.getJobs.called, true)
  })

  it('return successful listLocations', async () => {
    const response = await listLocations()

    assert.isArray(response)
    assert.strictEqual(response.length, 2)
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(services.geekService.getAll.called, true)
  })

  it('return error from listLocations', async () => {
    services.geekService.getAll.reset()
    services.geekService.getAll.rejects(new Error('Error'))
    const response = await listLocations()

    assert.strictEqual(response instanceof Error, true)
    assert.strictEqual(services.geekService.getAll.called, true)
  })

  it('return successful listTechs', async () => {
    const response = await listTechs()

    assert.isArray(response)
    assert.strictEqual(response.length, 3)
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(services.geekService.getCandidates.called, true)
  })

  it('return error from listTechs', async () => {
    services.geekService.getCandidates.reset()
    services.geekService.getCandidates.rejects(new Error('Error'))
    const response = await listTechs()

    assert.strictEqual(response instanceof Error, true)
    assert.strictEqual(services.geekService.getCandidates.called, true)
  })

  it('return successful getMatchedCandidates', async () => {
    const response = await getMatchedCandidates({
      maxExperience: "6",
      minimumExperience: "4",
      city: "Rio de Janeiro - RJ",
      technologies: [
        "JavaScript",
        "HTML5",
        "PHP"
      ]
    })

    assert.isArray(response)
    assert.strictEqual(response.length, 1)
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(repository.listCandidatesByLocal.called, true)
  })

  it('return no result getMatchedCandidates', async () => {
    repository.listCandidatesByLocal.reset()
    repository.listCandidatesByLocal.resolves([])
    const response = await getMatchedCandidates({
      maxExperience: "10",
      minimumExperience: "4",
      city: "Remote",
      technologies: [
        "JavaScript",
        "HTML5",
        "PHP"
      ]
    })

    assert.isArray(response)
    assert.isEmpty(response)
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(repository.listCandidatesByLocal.called, true)
  })

  it('return error from getMatchedCandidates', async () => {
    repository.listCandidatesByLocal.reset()
    repository.listCandidatesByLocal.rejects(new Error('Error'))
    const response = await getMatchedCandidates({

    })

    assert.strictEqual(response instanceof Error, true)
    assert.strictEqual(repository.listCandidatesByLocal.called, true)
  })
})
