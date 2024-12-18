import { Router } from 'express';
import { spotifyRoutes } from './spotify/spotify.routes';
import { googleAuthRoutes } from './auth/google-auth.routes';
import { authRoutes } from './auth/auth.routes';

export const router = Router();

router.use('/spotify', spotifyRoutes);
router.use('/google', googleAuthRoutes);
router.use('/auth', authRoutes);