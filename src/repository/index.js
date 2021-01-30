module.exports = ({ moongose }) => {

  const { Schema } = moongose;

  const CandidateSchema = new Schema({
    id: Number,
    city: String,
    experience: String,
    technologies: [
      {
        name: String,
        is_main_tech: Boolean
      }
    ]
  });

  const Candidates = moongose.model('candidates', CandidateSchema);

  const listCandidates = async () => {
    try {
      return await Candidates.find({})
    } catch (error) {
      return error
    }
  }

  const listCandidatesByLocal = async (city) => {
    try {
      return await Candidates.find({ city: city })
    } catch (error) {
      return error
    }
  }

  const listCandidatesByExperience = async (experience) => {
    try {
      return await Candidates.find({ experience })
    } catch (error) {
      return error
    }
  }

  return {
    listCandidates,
    listCandidatesByLocal,
    listCandidatesByExperience
  }

}
