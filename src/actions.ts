import { Request, Response } from 'express'
import { getRepository, ObjectLiteral  } from 'typeorm'  
import { Usuario } from './entities/Usuario'
import { Exception } from './utils'
import jwt from 'jsonwebtoken'

/* POST user */
export const createUser = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.username) throw new Exception("coloque el nombre por favor ( username )")
    if (!req.body.first_name) throw new Exception("coloque el nombre por favor ( first_name )")
    if (!req.body.last_name) throw new Exception("coloque el apellido por favor ( last_name )")
    if (!req.body.email) throw new Exception("coloque el email por favor ( email )")
    if (!req.body.password) throw new Exception("coloque una contraseña por favor ( password )")

    const user = await getRepository(Usuario).findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("ya hay un usuario con este email")
    const newUser = getRepository(Usuario).create(req.body)
    const results = await getRepository(Usuario).save(newUser)
    return res.json(results);
}
/* GET user */
export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const userID = (req.user as ObjectLiteral).user.id 
    
    const user = await getRepository(Usuario).findOne(userID);
    return res.json(user);
}

/* POST user (login) */
export const login = async (req: Request, res: Response): Promise<Response> =>{
	if(!req.body.email) throw new Exception("Verifique el email", 400)
	if(!req.body.password) throw new Exception("Verifique el password", 400)
	// Validamos si existe un usuario con este correo electrónico y contraseña en la base de datos
	const user = await getRepository(Usuario).findOne({ where: { email: req.body.email, password: req.body.password }})
	if(!user) throw new Exception("Email o password incorrecto", 401)
	const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });// Generamos el Token!!!
	return res.json({ user, token });// Devolvera el usuario y el token creado recientemente al cliente
}


