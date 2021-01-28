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
    return await Candidates.find({})
  }

  const listCandidatesByLocal = async (city) => {
    return await Candidates.find({ city: city })
  }

  const listCandidatesByExperience = async (experience) => {
    return await Candidates.find({ experience })
  }

  return {
    listCandidates,
    listCandidatesByLocal,
    listCandidatesByExperience
  }

}
