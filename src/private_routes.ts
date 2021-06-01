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
// get usuario actual
router.get('/user',verifyToken, safe(actions.getUser));

//post de categoria
router.post('/categoria', verifyToken, safe(actions.postCategoria));

export default router;
