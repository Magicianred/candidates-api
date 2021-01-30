module.exports = ({ business }) => {

  return {
    listCandidates: async (req, res, next) => {
      try {
        const response = await business.listCandidates()

        res.send({ response, statusCode: 200 })
      } catch (error) {
        res.send({ error, statusCode: 500 })
      }
    },

    listCandidatesByLocal: async (req, res, next) => {
      try {
        const { city } = req.body

        const response = await business.listCandidatesByLocal(city)

        res.send({ response, statusCode: 200 })
      } catch (error) {
        res.send({ error, statusCode: 500 })
      }
    },

    listJobs: async (req, res, next) => {
      try {
        const response = await business.listJobs()

        res.send({ response, statusCode: 200 })
      } catch (error) {
        res.send({ error, statusCode: 500 })
      }
    },

    listLocations: async (req, res, next) => {
      try {
        const response = await business.listLocations()

        res.send({ response, statusCode: 200 })
      } catch (error) {
        res.send({ error, statusCode: 500 })
      }
    },

    listTechs: async (req, res, next) => {
      try {
        const response = await business.listTechs()

        res.send({ response, statusCode: 200 })
      } catch (error) {
        res.send({ error, statusCode: 500 })
      }
    },

    getMatchedCandidates: async (req, res, next) => {
      try {
        const profile = req.body
        const response = await business.getMatchedCandidates(profile)

        res.send({ response, statusCode: 200 })
      } catch (error) {
        res.send({ error, statusCode: 500 })
      }
    }
  }
}
