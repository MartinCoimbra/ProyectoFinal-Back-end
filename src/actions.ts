import { Request, Response } from 'express'
import { getRepository, ObjectLiteral } from 'typeorm'
import { Usuario } from './entities/Usuario'
import { Exception } from './utils'
import jwt from 'jsonwebtoken'
import { Categoria } from './entities/Categoria'
import { width, height } from 'styled-system'
import { Preguntado } from './entities/Preguntado'
import { Preguntas } from './entities/Preguntas'
import { Respuesta } from './entities/Respuesta'

/* POST user ✅*/
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
/* GET user ✅*/
export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const userID = (req.user as ObjectLiteral).user.id
    const user = await getRepository(Usuario).findOne(userID);
    return res.json(user);
}
/* POST user (login) ✅*/
export const login = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email) throw new Exception("Verifique el email", 400)
    if (!req.body.password) throw new Exception("Verifique el password", 400)
    // Validamos si existe un usuario con este correo electrónico y contraseña en la base de datos
    const user = await getRepository(Usuario).findOne({ where: { email: req.body.email, password: req.body.password } })
    if (!user) throw new Exception("Email o password incorrecto", 401)
    const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });// Generamos el Token!!!
    return res.json({ user, token });// Devolvera el usuario y el token creado recientemente al cliente
}
// POST(Publicar o enviar) categoria ✅
export const postCategoria = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.name) throw new Exception("Ingrese nombre de la categoria ( name )")

    const hayCat = await getRepository(Categoria).findOne({ where: { name: req.body.name } });
    if (hayCat) throw new Exception("Ya hay una categoria con ese nombre", 401)

    const categoriaresp = getRepository(Categoria).create(req.body);
    console.log(categoriaresp)

    const results = await getRepository(Categoria).save(categoriaresp);
    return res.json(results);
}
// GET(Leer) todas las categorias ✅
export const getCategorias = async (req: Request, res: Response): Promise<Response> => {
    const categorias = await getRepository(Categoria).find();
    return res.json(categorias);
}
// GET(Leer) 1 categoria ✅
export const getCategoria = async (req: Request, res: Response): Promise<Response> => {
    const categoria = await getRepository(Categoria).findOne(req.params.id);
    return res.json(categoria);
}
/*  POST de 1 preguntado (tematica) ✅
*   1- No se postean todas las preguntas, queda la ultima nomas SOLUCIONADO ✅
*   2- Visualisar las respuesta de ese mismo preguntado SOLUCIONADO ✅
*   3- Esta sobre escribiendo los valores? SOLUCIONADO ✅
*   4- Fijate que las respuesta tenga el id de la pregunta (el cual es auto incremental)  SOLUCIONADO ✅
*   5- Tenemos problema relacionando las preguntas con las respuestas SOLUCIONADO ✅
*   5- Tenemos problema relacionando las preguntas con el preguntado> SOLUCIONADO ✅
*/
export const postPreguntado = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.nombre) throw new Exception("Ingrese nombre del preguntado ( nombre )")
    if (!req.body.descripcion) throw new Exception("Ingrese una descripcion del preguntado ( descripcion )")
    if (!req.body.url_foto) throw new Exception("Ingrese una url del preguntado ( url_foto )")
    if (!req.body.categoria) throw new Exception("Ingrese una ( categoria )")

    if (!req.body.pregunta) throw new Exception("Ingrese una pregunta ( pregunta )")
    if (!req.body.url_foto_pregunta) throw new Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta )")
    if (!req.body.opcion_correcta) throw new Exception("Ingrese la respuesta correcta ( opcion_correcta )")
    if (!req.body.opcion_b) throw new Exception("Ingrese una respuesta incorrecta ( opcion_b )")
    if (!req.body.opcion_c) throw new Exception("Ingrese otra respuesta incorrecta ( opcion_c )")

    if (!req.body.pregunta2) throw new Exception("Ingrese una pregunta ( pregunta2 )")
    if (!req.body.url_foto_pregunta2) throw new Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta2 )")
    if (!req.body.opcion_correcta2) throw new Exception("Ingrese la respuesta correcta ( opcion_correcta2 )")
    if (!req.body.opcion_b2) throw new Exception("Ingrese una respuesta incorrecta ( opcion_b2 )")
    if (!req.body.opcion_c2) throw new Exception("Ingrese otra respuesta incorrecta ( opcion_c2 )")

    if (!req.body.pregunta3) throw new Exception("Ingrese una pregunta ( pregunta3 )")
    if (!req.body.url_foto_pregunta3) throw new Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta3 )")
    if (!req.body.opcion_correcta3) throw new Exception("Ingrese la respuesta correcta ( opcion_correcta3 )")
    if (!req.body.opcion_b3) throw new Exception("Ingrese una respuesta incorrecta ( opcion_b3 )")
    if (!req.body.opcion_c3) throw new Exception("Ingrese otra respuesta incorrecta ( opcion_c3 )")

    if (!req.body.pregunta4) throw new Exception("Ingrese una pregunta ( pregunta4 )")
    if (!req.body.url_foto_pregunta4) throw new Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta4 )")
    if (!req.body.opcion_correcta4) throw new Exception("Ingrese la respuesta correcta ( opcion_correcta4 )")
    if (!req.body.opcion_b4) throw new Exception("Ingrese una respuesta incorrecta ( opcion_b4 )")
    if (!req.body.opcion_c4) throw new Exception("Ingrese otra respuesta incorrecta ( opcion_c4 )")

    if (!req.body.pregunta5) throw new Exception("Ingrese una pregunta ( pregunta5 )")
    if (!req.body.url_foto_pregunta5) throw new Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta5 )")
    if (!req.body.opcion_correcta5) throw new Exception("Ingrese la respuesta correcta ( opcion_correcta5 )")
    if (!req.body.opcion_b5) throw new Exception("Ingrese una respuesta incorrecta ( opcion_b5 )")
    if (!req.body.opcion_c5) throw new Exception("Ingrese otra respuesta incorrecta ( opcion_c5 )")

    const hayPreguntado = await getRepository(Preguntado).findOne({ where: { nombre: req.body.nombre } });
    if (hayPreguntado) throw new Exception("Ya hay una tematica con ese nombre")

    /* POST DE EL PREGUNTADO (Tematica) */
    let preguntadoo = new Preguntado()
    preguntadoo.categoria = req.body.categoria
    preguntadoo.descripcion = req.body.descripcion
    preguntadoo.url_foto = req.body.url_foto
    preguntadoo.nombre = req.body.nombre
    const preguntado = getRepository(Preguntado).create(preguntadoo);
    const results = await getRepository(Preguntado).save(preguntado);

    /* PRIMERA PREGUNTA */
    //Posteamos la primera pregunta//
    let pregunta = new Preguntas()
    pregunta.preguntas = req.body.pregunta
    pregunta.foto_pregunta = req.body.url_foto_pregunta
    pregunta.preguntados = results.id
    const preg = getRepository(Preguntas).create(pregunta);
    const results2 = await getRepository(Preguntas).save(preg);

    //RESPUESTAS//
    let respuesta = new Respuesta()
    respuesta.opcion_correcta = req.body.opcion_correcta
    respuesta.opcion_b = req.body.opcion_b
    respuesta.opcion_c = req.body.opcion_c
    respuesta.preguntas = results2.id
    const resp = getRepository(Respuesta).create(respuesta);
    const results3 = await getRepository(Respuesta).save(resp);

    /* SEGUNDA PREGUNTA*/
    let pregunta2 = new Preguntas()
    pregunta2.preguntas = req.body.pregunta2
    pregunta2.foto_pregunta = req.body.url_foto_pregunta2
    pregunta2.preguntados = results.id
    const preg2 = getRepository(Preguntas).create(pregunta2);
    const results02 = await getRepository(Preguntas).save(preg2);

    //RESPUESTAS 2//
    let respuesta2 = new Respuesta()
    respuesta2.opcion_correcta = req.body.opcion_correcta2
    respuesta2.opcion_b = req.body.opcion_b2
    respuesta2.opcion_c = req.body.opcion_c2
    respuesta2.preguntas = results2.id + 1 //porque sino lo relaciona con la pregunta anterior
    const resp2 = getRepository(Respuesta).create(respuesta2);
    const results03 = await getRepository(Respuesta).save(resp2);

    /* TERCERA PREGUNTA */
    let pregunta3 = new Preguntas()
    pregunta3.preguntas = req.body.pregunta3
    pregunta3.foto_pregunta = req.body.url_foto_pregunta3
    pregunta3.preguntados = results.id
    const preg3 = getRepository(Preguntas).create(pregunta3);
    const results04 = await getRepository(Preguntas).save(preg3);

    //RESPUESTAS 3//
    let respuesta3 = new Respuesta()
    respuesta3.opcion_correcta = req.body.opcion_correcta3
    respuesta3.opcion_b = req.body.opcion_b3
    respuesta3.opcion_c = req.body.opcion_c3
    respuesta3.preguntas = results2.id + 2 //porque sino lo relaciona con la pregunta anterior

    const resp3 = getRepository(Respuesta).create(respuesta3);
    const results05 = await getRepository(Respuesta).save(resp3);

    /* CUARTA PREGUNTA */
    let pregunta4 = new Preguntas()
    pregunta4.preguntas = req.body.pregunta4
    pregunta4.foto_pregunta = req.body.url_foto_pregunta4
    pregunta4.preguntados = results.id
    const preg4 = getRepository(Preguntas).create(pregunta4);
    const results06 = await getRepository(Preguntas).save(preg4);

    //RESPUESTAS 4//
    let respuesta4 = new Respuesta()
    respuesta4.opcion_correcta = req.body.opcion_correcta4
    respuesta4.opcion_b = req.body.opcion_b4
    respuesta4.opcion_c = req.body.opcion_c4
    respuesta4.preguntas = results2.id + 3 //porque sino lo relaciona con la pregunta anterior

    const resp4 = getRepository(Respuesta).create(respuesta4);
    const results07 = await getRepository(Respuesta).save(resp4);

    /* QUINTA PREGUNTA */
    let pregunta5 = new Preguntas()
    pregunta5.preguntas = req.body.pregunta5
    pregunta5.foto_pregunta = req.body.url_foto_pregunta5
    pregunta5.preguntados = results.id

    const preg5 = getRepository(Preguntas).create(pregunta5);
    const results08 = await getRepository(Preguntas).save(preg5);

    //RESPUESTAS 5//
    let respuesta5 = new Respuesta()
    respuesta5.opcion_correcta = req.body.opcion_correcta5
    respuesta5.opcion_b = req.body.opcion_b5
    respuesta5.opcion_c = req.body.opcion_c5
    respuesta5.preguntas = results2.id + 4 //porque sino lo relaciona con la pregunta anterior
    const resp5 = getRepository(Respuesta).create(respuesta5);
    const results09 = await getRepository(Respuesta).save(resp5);

    return res.json({
        results,
        results2,
        results3,
        results02,
        results03,
        results04,
        results05,
        results06,
        results07,
        results08,
        results09
    });
}
// GET(Leer) Todos los preguntados(tematicas) ✅
export const getPreguntados = async (req: Request, res: Response): Promise<Response> => {
    const preguntados = await getRepository(Preguntado).find({ relations: ['categoria'] });
    return res.json(preguntados);
}
// GET De un Preguntado ✅
export const getPreguntado = async (req: Request, res: Response): Promise<Response> => {
    const preguntado = await getRepository(Preguntado).find({
        where: { id: req.params.id },
        relations: ['categoria']
    });
    return res.json(preguntado);
}

// GET TODOS LAS PREGUNTAS MOSTRANDO Sus respuestas y mostrando el peguntado(tematica que le corresponde) ✅
export const getPreguntas = async (req: Request, res: Response): Promise<Response> => {
    const preguntas = await getRepository(Preguntas).find({ relations: ['respuesta', 'preguntado'] })
    return res.json(preguntas);
}

/* Hay que borrarlo despues o editarlo a que nos de las respuesta de el preguntado elegido especifico 💥 */
export const getRespuestas = async (req: Request, res: Response): Promise<Response> => {
    const Respuestas = await getRepository(Respuesta).find({ relations: ['pregunta'] })
    return res.json(Respuestas);
}