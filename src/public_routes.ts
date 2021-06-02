import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';
const router = Router();
// POST registro  ✅
router.post('/user', safe(actions.createUser));
//POST categorias ✅
router.post('/login', safe(actions.login));
//GET todas categorias ✅
router.get('/categorias', safe(actions.getCategorias));
//GET una categoria ✅
router.get('/categoria/:id', safe(actions.getCategoria));

// Preguntados ❔
router.get('/preguntados', safe(actions.getPreguntados));

// Preguntado ❔
router.get('/preguntado/:id', safe(actions.getPreguntado));


// Metodo get para ver un preguntas en especifico ❔
router.get('/preguntas', safe(actions.getPreguntas))












// Metodo get para ver preguntado de un metodo especifico//

export default router;
