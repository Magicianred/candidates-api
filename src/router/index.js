module.exports = ({ router, controller }) => {

  const endpoints = {
    healthCheck: {
      url: '/',
      method: 'GET'
    },
    listCandidates: {
      url: '/candidates',
      method: 'GET'
    },
    listCandidatesByLocal: {
      url: '/candidates/city',
      method: 'GET'
    },
    listJobs: {
      url: '/jobs',
      method: 'GET'
    },
    listLocations: {
      url: '/locals',
      method: 'GET'
    },
    listTechs: {
      url: '/techs',
      method: 'GET'
    },
    getMatchedCandidates: {
      url: '/match',
      method: 'POST'
    }
  }

  router.get(endpoints.healthCheck.url, (req, res, next) => {
    res.send('OK')
  })

  router.get(endpoints.listCandidates.url, controller.listCandidates)
  router.get(endpoints.listCandidatesByLocal.url, controller.listCandidatesByLocal)

  router.get(endpoints.listJobs.url, controller.listJobs)
  router.get(endpoints.listLocations.url, controller.listLocations)
  router.get(endpoints.listTechs.url, controller.listTechs)

  router.post(endpoints.getMatchedCandidates.url, controller.getMatchedCandidates)

  return router
}
