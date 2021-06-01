import { Request, Response } from 'express'
import { getRepository, ObjectLiteral  } from 'typeorm'  
import { Usuario } from './entities/Usuario'
import { Exception } from './utils'
import jwt from 'jsonwebtoken'
import { Categoria } from './entities/Categoria'
import { width, height } from 'styled-system'
import { Preguntado } from './entities/Preguntado'

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
// POST(Publicar o enviar) categoria
export const postCategoria = async (req: Request, res: Response): Promise<Response> => {
    if(!req.body.name) throw new Exception("Ingrese nombre de la categoria ( name )")
    
    const hayCat = await getRepository(Categoria).findOne({where: {name: req.body.name}});
	if(hayCat) throw new Exception("Ya hay una categoria con ese nombre", 401)
    
    const categoriaresp = getRepository(Categoria).create(req.body);
    console.log(categoriaresp)
    
    const results = await getRepository(Categoria).save(categoriaresp);
    return res.json(results);
}
// GET(Leer) todas las categorias
export const getCategorias = async (req: Request, res: Response): Promise<Response> =>{
    const categorias = await getRepository(Categoria).find();
    return res.json(categorias);
}
// GET(Leer) 1 categoria
export const getCategoria = async (req: Request, res: Response): Promise<Response> =>{
    const categoria = await getRepository(Categoria).findOne(req.params.id);
    return res.json(categoria);
}
// GET(Leer) Todos los preguntados(tematicas)
export const getPreguntados = async (req: Request, res: Response): Promise<Response> =>{
    const preguntados = await getRepository(Preguntado).find();
    return res.json(preguntados);
}
// POST de 1 preguntado (tematica) 
export const postPreguntado = async (req: Request, res: Response): Promise<Response> => {
    /* Verificamos los datos de la tabla preguntado */
    if(!req.body.nombre) throw new Exception("Ingrese nombre del preguntado ( nombre )")
    if(!req.body.descripcion) throw new Exception("Ingrese una descripcion del preguntado ( descripcion )")
    if(!req.body.url_foto) throw new Exception("Ingrese una url del preguntado ( url_foto )")
    
    /*⛔⛔⛔ Falta hacer las otras tablas dentro de esta ⛔⛔⛔*/
    
    /* Si hay una preguntado(tematica) con ese nombre no la vamos a postear para no repetir */
    const hayPreguntado = await getRepository(Preguntado).findOne({where: {name: req.body.nombre}});
	if(hayPreguntado) throw new Exception("Ya hay una tematica con ese nombre")
    
    const preguntado = getRepository(Preguntado).create(req.body);

    const results = await getRepository(Preguntado).save(preguntado);
    return res.json(results);
}