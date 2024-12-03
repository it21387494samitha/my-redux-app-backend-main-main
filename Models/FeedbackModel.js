import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true // Ensure feedback text is provided
  },
  givenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true // Ensure user ID is provided
  }
});

const FeedbackModel = mongoose.model("Feedback", feedbackSchema);

export default FeedbackModel;
