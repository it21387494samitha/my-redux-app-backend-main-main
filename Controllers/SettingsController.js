import SettingsModel from '../Models/Setting.js'; // Assuming this is the correct path to your settings model
import UserModel from '../Models/UserModel.js'; // Import the User model if needed

// Get user settings
export const getUserSettings = async (req, res) => {
    const userId = req.user.id; // Assuming userId comes from authenticated user (req.user)

    try {
        // Find the settings for the user
        const settings = await SettingsModel.findOne({ userId });

        if (!settings) {
            return res.status(404).json({ message: 'Settings not found for this user' });
        }

        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user settings', error });
    }
};

// Update user settings
export const updateUserSettings = async (req, res) => {
    const userId = req.user.id; // Assuming userId comes from authenticated user (req.user)
    const { notifications, preferredSeats, language, privacy } = req.body; // Extract values from the request body

    try {
        // Find the settings for the user and update them
        let settings = await SettingsModel.findOneAndUpdate(
            { userId },
            { notifications, preferredSeats, language, privacy },
            { new: true, upsert: true } // Create new if not exists
        );

        res.status(200).json({ message: 'Settings updated successfully', settings });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user settings', error });
    }
};

// Reset user settings to default
export const resetUserSettings = async (req, res) => {
    const userId = req.user.id; // Assuming userId comes from authenticated user (req.user)

    try {
        // Reset settings to defaults
        let settings = await SettingsModel.findOneAndUpdate(
            { userId },
            { notifications: true, preferredSeats: 'Any', language: 'en', privacy: true },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Settings reset to default', settings });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting settings', error });
    }
};

// Toggle notifications
export const toggleNotifications = async (req, res) => {
    const userId = req.user.id; // Assuming userId comes from authenticated user (req.user)

    try {
        // Find the user's settings
        const settings = await SettingsModel.findOne({ userId });
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }

        // Toggle the notification setting
        settings.notifications = !settings.notifications;
        await settings.save();

        res.status(200).json({ message: 'Notifications setting updated', notifications: settings.notifications });
    } catch (error) {
        res.status(500).json({ message: 'Error toggling notifications', error });
    }
};

// Get all users' settings (Admin functionality)
export const getAllUserSettings = async (req, res) => {
    try {
        const settingsList = await SettingsModel.find();
        res.status(200).json(settingsList);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all user settings', error });
    }
};
