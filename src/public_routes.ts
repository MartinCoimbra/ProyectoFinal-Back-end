import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';
const router = Router();
// POST registro 
router.post('/user', safe(actions.createUser));
//POST categorias
router.post('/login', safe(actions.login));
//GET todas categorias
router.get('/categorias', safe(actions.getCategorias));
//GET una categoria
/* router.get('/categoria/:id', safe(actions.getCategoria)); */


export default router;
