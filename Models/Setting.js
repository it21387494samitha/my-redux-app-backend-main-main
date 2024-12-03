import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notifications: { type: Boolean, default: true },
  preferredSeats: { type: String, default: 'Any' },
  language: { type: String, default: 'en' },
  privacy: { type: Boolean, default: true },
}, { timestamps: true });



const SettingsModel = mongoose.model('Setting', settingsSchema);
export default SettingsModel;