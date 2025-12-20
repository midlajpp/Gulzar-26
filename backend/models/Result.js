import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },

    first: {
      participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
      },
    },

    second: {
      participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
      },
    },

    third: {
      participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
      },
    },

    poster: {
      type: String, // image / pdf url
    },
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
