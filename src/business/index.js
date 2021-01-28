module.exports = ({ repository, services }) => {

  const listCandidates = async () => {
    const response = await repository.listCandidates()

    return response
  }

  const listCandidatesByLocal = async (city) => {
    const response = await repository.listCandidatesByLocal(city)

    return response
  }

  const listJobs = async () => {
    const response = await services.geekService.getJobs()

    return response
  }

  const listLocations = async () => {
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
  }

  const listTechs = async () => {
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
  }

  const getMatchedCandidates = async (profile) => {
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
