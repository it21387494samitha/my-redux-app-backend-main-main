import express from 'express';
import { getUserSettings, updateUserSettings, resetUserSettings, toggleNotifications, getAllUserSettings } from '../Controllers/SettingsController.js';
import {  verifyToken } from '../Middleware/VerifyToken.js'; // Assuming you have authentication middleware

const router = express.Router();

// Get settings for the authenticated user
router.get('/settings', verifyToken, getUserSettings);

// Update settings for the authenticated user
router.put('/settings',verifyToken, updateUserSettings);

// Reset settings for the authenticated user to default
router.post('/settings/reset', verifyToken, resetUserSettings);

// Toggle notifications for the authenticated user
router.patch('/settings/notifications/toggle', verifyToken, toggleNotifications);

// Get all users' settings (Admin route)
router.get('/admin/settings',verifyToken, getAllUserSettings);

export default router;
