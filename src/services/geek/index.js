var { GEEK_HUNTER_API } = process.env

if (!GEEK_HUNTER_API)
  GEEK_HUNTER_API = "https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json"

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
