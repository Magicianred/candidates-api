const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require("sinon-chai")

chai.use(sinonChai);

const { assert } = chai

const sandbox = sinon.createSandbox()

const moongose = {
  Schema: sandbox.stub(),
  model: function () {
    return Candidates
  }
}

const Candidates = {
  find: sandbox.stub()
}

const {
  listCandidates,
  listCandidatesByLocal,
  listCandidatesByExperience
} = require('../repository')({ moongose })

describe('listCandidates with its filters', function () {
  beforeEach(() => {
    sandbox.reset()
    Candidates.find.resolves([{
      id: 1,
      city: 'Rio de Janeiro - RJ',
      experience: '1-2 years',
      technologies: [{
        name: "Java",
        is_main_tech: true
      }]
    }])
  })

  it('return successful list of all candidates', async () => {
    const response = await listCandidates()

    assert.isArray(response)
    assert.hasAllKeys(response[0], ['id', 'city', 'experience', 'technologies'])
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(Candidates.find.called, true)
  })

  it('return error list of all candidates', async () => {
    Candidates.find.reset()
    Candidates.find.rejects(new Error('Error'))
    const response = await listCandidates()

    assert.strictEqual(response instanceof Error, true)
    assert.strictEqual(Candidates.find.called, true)
  })

  it('return successful list of candidates filtered by local', async () => {
    const response = await listCandidatesByLocal({ city: 'Rio de Janeiro - RJ' })

    assert.isArray(response)
    assert.hasAllKeys(response[0], ['id', 'city', 'experience', 'technologies'])
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(Candidates.find.called, true)
  })

  it('return no result from list of candidates filtered by local', async () => {
    Candidates.find.reset()
    Candidates.find.resolves([])

    const response = await listCandidatesByLocal({ city: 'Porto Alegre - RS' })

    assert.isArray(response)
    assert.isEmpty(response)
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(Candidates.find.called, true)
  })

  it('return successful list of candidates filtered by experience', async () => {
    const response = await listCandidatesByExperience({ experience: '1-2 years' })

    assert.isArray(response)
    assert.hasAllKeys(response[0], ['id', 'city', 'experience', 'technologies'])
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(Candidates.find.called, true)
  })

  it('return no result from list of candidates filtered by experience', async () => {
    Candidates.find.reset()
    Candidates.find.resolves([])

    const response = await listCandidatesByExperience({ experience: '2-3 years' })

    assert.isArray(response)
    assert.isEmpty(response)
    assert.strictEqual(typeof (response), 'object')
    assert.strictEqual(Candidates.find.called, true)
  })
})
