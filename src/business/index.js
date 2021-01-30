module.exports = ({ repository, services }) => {

  const listCandidates = async () => {
    try {
      const response = await repository.listCandidates()

      return response
    } catch (error) {
      return error
    }
  }

  const listCandidatesByLocal = async (city) => {
    try {
      const response = await repository.listCandidatesByLocal(city)

      return response
    } catch (error) {
      return error
    }
  }

  const listJobs = async () => {
    try {
      const response = await services.geekService.getJobs()

      return response
    } catch (error) {
      return error
    }
  }

  const listLocations = async () => {
    try {
      const { candidates, jobs } = await services.geekService.getAll()

      const candidateCities = []
      candidates.forEach((candidate) => {
        candidateCities.push(candidate.city)
      })

      const jobCities = []
      jobs.forEach((job) => {
        jobCities.push(job.city)
      })

      const cities = [...candidateCities, ...jobCities]

      const noRepeatCities = [...new Set(cities)]

      noRepeatCities.sort((a, b) => a.localeCompare(b))

      return noRepeatCities
    } catch (error) {
      return error
    }
  }

  const listTechs = async () => {
    try {
      const candidates = await services.geekService.getCandidates()

      const candidateTechs = []
      candidates.forEach((candidate) => {
        candidateTechs.push(...candidate.technologies)
      })

      const techs = []
      candidateTechs.forEach((skill) => {
        techs.push(skill.name)
      })

      const noRepeatTechs = [...new Set(techs)]

      noRepeatTechs.sort((a, b) => a.localeCompare(b))

      return noRepeatTechs
    } catch (error) {
      return error
    }
  }

  const getMatchedCandidates = async (profile) => {
    try {
      const candidates = await repository.listCandidatesByLocal(profile.city)

      if (candidates.length <= 5)
        return candidates

      const regex = RegExp("\\d{0,2}", "g")
      const filterExperience = candidates.filter((candidate) => {
        let aux = candidate.experience.match(regex)
        let time = aux.filter(value => value !== "")

        if (time.lenght > 1) {
          return time[0] >= profile.minimumExperience && time[1] <= profile.maxExperience
        }

        if (profile.maxExperience) {
          return time[0] >= profile.minimumExperience && time[0] <= profile.maxExperience
        }

        return time[0] >= profile.minimumExperience
      })

      if (filterExperience.length <= 5)
        return filterExperience

      const filterTechnologies = filterExperience.filter((candidate) => {
        const techs = []
        for (const tech of profile.technologies) {
          let temp = candidate.technologies.find(skill => {
            return skill.name === tech
          })

          if (temp)
            techs.push(temp)
        }

        if (techs.length === profile.technologies.length) {
          return true
        }

        return false
      })

      return filterTechnologies
    } catch (error) {
      return error
    }
  }

  return {
    listCandidates,
    listCandidatesByLocal,
    listJobs,
    listLocations,
    listTechs,
    getMatchedCandidates
  }

}
