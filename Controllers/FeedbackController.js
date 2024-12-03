import FeedbackModel from "../Models/FeedbackModel.js";

export const CreateFeedback = async (req, res) => {
  const userId = req.user.id; 
  const { feedback } = req.body;

  try {
    // Validate feedback content
    if (!feedback || feedback.trim() === "") {
      return res.status(400).json({ message: 'Feedback cannot be empty' });
    }
   
    const newFeedback = new FeedbackModel({
      feedback,
      givenBy: userId
    });

    // Save feedback to the database
    await newFeedback.save();

    // Optionally log successful feedback
    console.log(`Feedback by user ${userId} submitted successfully`);

    res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
  } catch (error) {
    // Log and return specific error messages
    console.error(`Error submitting feedback for user ${userId}:`, error);
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
};
