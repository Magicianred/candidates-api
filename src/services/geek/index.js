const { GEEK_HUNTER_API } = process.env

module.exports = ({ axios }) => {

  const getAll = async () => {
    try {
      const { data } = await axios.get(GEEK_HUNTER_API)

      return data
    } catch (error) {
      return error
    }
  }

  const getCandidates = async () => {
    try {
      const { data } = await axios.get(GEEK_HUNTER_API)

      return data.candidates
    } catch (error) {
      return error
    }
  }

  const getJobs = async () => {
    try {
      const { data } = await axios.get(GEEK_HUNTER_API)

      return data.jobs
    } catch (error) {
      return error
    }
  }

  return {
    getAll,
    getCandidates,
    getJobs
  }
}
