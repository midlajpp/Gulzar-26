import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: [{ type: String, required: true }],
  team: {
    name: { type: String, required: true },
  },
});

export default mongoose.model("Participant", participantSchema);
