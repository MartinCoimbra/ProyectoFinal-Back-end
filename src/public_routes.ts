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
// Preguntados ✅
router.get('/preguntados', safe(actions.getPreguntados));
// Preguntado especifico ✅
router.get('/preguntadoE/:id', safe(actions.getPreguntado));
// Preguntados por categoria ✅
router.get('/preguntados/categoria/:id', safe(actions.getPreguntadosPorCategoria));
/* Metodo get TODOS los comentrios que pertenescan a una tematica ✅ */
router.get('/preguntado/:id/comentario', safe(actions.getComentariosDeUnPreguntado));


export default router;
