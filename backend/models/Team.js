import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String, // hex code
    required: true,
  },
});

export default mongoose.model("Team", teamSchema);
