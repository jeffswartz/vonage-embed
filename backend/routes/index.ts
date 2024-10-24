import { Router } from 'express';
import healthRoute from './health';
import sessionRouter from './session';

const router = Router();

router.use('/_', healthRoute);
router.use('/session', sessionRouter);

export default router;
