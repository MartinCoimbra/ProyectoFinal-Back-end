import { Router, Request, Response, NextFunction  } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken'
const router = Router();
/* TOKEN */
//MIDDLEWARE de verificación
const verifyToken= (req: Request,res:Response, next:NextFunction) =>{
    //headers con el token
     const token = req.header('Authorization');
    if(!token) return res.status(400).json('ACCESS DENIED');
    try {
        const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
        /* asignamos a req.user para aceder al usuario */
        req.user = decoded;
        next()      
    } catch (error) {
        /* si surge un error hacemos esto: */
        return res.status(400).json('ACCESS DENIED'); 
    }
  
}
// get usuario actual ✅
router.get('/user',verifyToken, safe(actions.getUser));
//post de categoria ✅
router.post('/categoria', verifyToken, safe(actions.postCategoria));
/* POST PREGUNTADO ✅*/
router.post('/preguntado', verifyToken, safe(actions.postPreguntado));
/* POST comentamos el preguntado que quieramos (poniendo el id del preguntado) ✅*/
router.post('/preguntado/:id/comentario',verifyToken ,safe(actions.postComentario));
// GET nos trae las preguntas y respuestas del mismo preguntado✅// 
router.get('/preguntado/:id', verifyToken, safe(actions.getPreguntas_Respuestas_Preguntado));

/* NO SON NECESARIAS LAS RUTAS DE ABAJO. */
// GET a todas las preguntas✅ (no es necesario, necesitamos la especifica por id) 🛑
router.get('/preguntas',verifyToken, safe(actions.getPreguntas))
// Hay que hacer que esta funcion de respuesta sea especifica pa el preguntado que eliga!! (revisar la respuesta que dio el archivo ) 🛑 
router.get('/respuestas',verifyToken, safe(actions.getRespuestas));

// Editar los datos del usuario //
router.put('/editardatos',verifyToken, safe(actions.putDatos));

export default router;
