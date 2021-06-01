import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';
const router = Router();
//registro 
router.post('/user', safe(actions.createUser));
//login
router.post('/login', safe(actions.login));


export default router;
