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
export const login = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email) throw new Exception("Verifique el email", 400)
    if (!req.body.password) throw new Exception("Verifique el password", 400)
    // Validamos si existe un usuario con este correo electrónico y contraseña en la base de datos
    const user = await getRepository(Usuario).findOne({ where: { email: req.body.email, password: req.body.password } })
    if (!user) throw new Exception("Email o password incorrecto", 401)
    const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });// Generamos el Token!!!
    return res.json({ user, token });// Devolvera el usuario y el token creado recientemente al cliente
}
// POST(Publicar o enviar) categoria
export const postCategoria = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.name) throw new Exception("Ingrese nombre de la categoria ( name )")

    const hayCat = await getRepository(Categoria).findOne({ where: { name: req.body.name } });
    if (hayCat) throw new Exception("Ya hay una categoria con ese nombre", 401)

    const categoriaresp = getRepository(Categoria).create(req.body);
    console.log(categoriaresp)

    const results = await getRepository(Categoria).save(categoriaresp);
    return res.json(results);
}
// GET(Leer) todas las categorias
export const getCategorias = async (req: Request, res: Response): Promise<Response> => {
    const categorias = await getRepository(Categoria).find();
    return res.json(categorias);
}
// GET(Leer) 1 categoria
export const getCategoria = async (req: Request, res: Response): Promise<Response> => {
    const categoria = await getRepository(Categoria).findOne(req.params.id);
    return res.json(categoria);
}
// GET(Leer) Todos los preguntados(tematicas)
export const getPreguntados = async (req: Request, res: Response): Promise<Response> => {
    const preguntados = await getRepository(Preguntado).find();
    return res.json(preguntados);
}
// POST de 1 preguntado (tematica) 
// Fijarse los Save esta sobreescribiendo los valores //
export const postPreguntado = async (req: Request, res: Response): Promise<Response> => {
    /* Verificamos los datos de la tabla preguntado */
    if (!req.body.nombre) throw new Exception("Ingrese nombre del preguntado ( nombre )")
    if (!req.body.descripcion) throw new Exception("Ingrese una descripcion del preguntado ( descripcion )")
    if (!req.body.url_foto) throw new Exception("Ingrese una url del preguntado ( url_foto )")
    if (!req.body.categoria) throw new Exception("Ingrese una ( categoria )")
    /* Si hay una preguntado(tematica) con ese nombre no la vamos a postear para no repetir */
    const hayPreguntado = await getRepository(Preguntado).findOne({ where: { nombre: req.body.nombre } });
    if (hayPreguntado) throw new Exception("Ya hay una tematica con ese nombre")

    let preguntadoo = new Preguntado()
    preguntadoo.categoria = req.body.categoria
    preguntadoo.descripcion = req.body.descripcion
    preguntadoo.url_foto = req.body.url_foto
    preguntadoo.nombre = req.body.nombre
    const preguntado = getRepository(Preguntado).create(preguntadoo);
    const results = await getRepository(Preguntado).save(preguntado);


    console.log(results.id)

    /* ******************************************************************* */
    /* PRIMERA PREGUNTA Y SUS RESPUESTAS */

    //Posteamos la primera pregunta//
    if (!req.body.pregunta) throw new Exception("Ingrese una pregunta ( pregunta )")
    if (!req.body.url_foto_pregunta) throw new Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta )")
    let pregunta = new Preguntas()
    pregunta.preguntas = req.body.pregunta
    pregunta.foto_pregunta = req.body.url_foto_pregunta
    pregunta.id = results.id
    const preg = getRepository(Preguntas).create(pregunta);
    const results2 = await getRepository(Preguntas).save(preg);
    console.log(results2.id)

    //Posteamos las 3 respuestas de la pregunta//
    if (!req.body.opcion_correcta) throw new Exception("Ingrese la respuesta correcta ( opcion_correcta )")
    if (!req.body.opcion_b) throw new Exception("Ingrese una respuesta incorrecta ( opcion_b )")
    if (!req.body.opcion_c) throw new Exception("Ingrese otra respuesta incorrecta ( opcion_c )")
    let respuesta = new Respuesta()
    respuesta.opcion_correcta = req.body.opcion_correcta
    respuesta.opcion_b = req.body.opcion_b
    respuesta.opcion_c = req.body.opcion_c
    const resp = getRepository(Respuesta).create(respuesta);
    const results3 = await getRepository(Respuesta).save(resp);
    /* ******************************************************************* */
    /* SEGUNDA PREGUNTA Y SUS RESPUESTAS */
    if (!req.body.pregunta2) throw new Exception("Ingrese una pregunta ( pregunta2 )")
    if (!req.body.url_foto_pregunta2) throw new Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta2 )")
    let pregunta2 = new Preguntas()
    pregunta2.preguntas = req.body.pregunta2
    pregunta2.foto_pregunta = req.body.url_foto_pregunta2
    pregunta2.id = results.id
    const preg2 = getRepository(Preguntas).create(pregunta2);
    const results02 = await getRepository(Preguntas).save(preg2);

    //Posteamos las 3 respuestas de la pregunta//
    if (!req.body.opcion_correcta2) throw new Exception("Ingrese la respuesta correcta ( opcion_correcta2 )")
    if (!req.body.opcion_b2) throw new Exception("Ingrese una respuesta incorrecta ( opcion_b2 )")
    if (!req.body.opcion_c2) throw new Exception("Ingrese otra respuesta incorrecta ( opcion_c2 )")
    let respuesta2 = new Respuesta()
    respuesta2.opcion_correcta = req.body.opcion_correcta2
    respuesta2.opcion_b = req.body.opcion_b2
    respuesta2.opcion_c = req.body.opcion_c2
    const resp2 = getRepository(Respuesta).create(respuesta2);
    const results03 = await getRepository(Respuesta).save(resp2);
    /* ******************************************************************* */
    /* TERCERA PREGUNTA Y SUS RESPUESTAS */
    if (!req.body.pregunta3) throw new Exception("Ingrese una pregunta ( pregunta3 )")
    if (!req.body.url_foto_pregunta3) throw new Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta3 )")
    let pregunta3 = new Preguntas()
    pregunta3.preguntas = req.body.pregunta3
    pregunta3.foto_pregunta = req.body.url_foto_pregunta3
    pregunta3.id = results.id
    const preg3 = getRepository(Preguntas).create(pregunta3);
    const results04 = await getRepository(Preguntas).save(preg3);

    //Posteamos las 3 respuestas de la pregunta//
    if (!req.body.opcion_correcta3) throw new Exception("Ingrese la respuesta correcta ( opcion_correcta3 )")
    if (!req.body.opcion_b3) throw new Exception("Ingrese una respuesta incorrecta ( opcion_b3 )")
    if (!req.body.opcion_c3) throw new Exception("Ingrese otra respuesta incorrecta ( opcion_c3 )")
    let respuesta3 = new Respuesta()
    respuesta3.opcion_correcta = req.body.opcion_correcta3
    respuesta3.opcion_b = req.body.opcion_b3
    respuesta3.opcion_c = req.body.opcion_c3
    const resp3 = getRepository(Respuesta).create(respuesta3);
    const results05 = await getRepository(Respuesta).save(resp3);
    /* ******************************************************************* */
    /* CUARTA PREGUNTA Y SUS RESPUESTAS */
    if (!req.body.pregunta4) throw new Exception("Ingrese una pregunta ( pregunta4 )")
    if (!req.body.url_foto_pregunta4) throw new Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta4 )")
    let pregunta4 = new Preguntas()
    pregunta4.preguntas = req.body.pregunta4
    pregunta4.foto_pregunta = req.body.url_foto_pregunta4
    pregunta4.id = results.id
    const preg4 = getRepository(Preguntas).create(pregunta4);
    const results06 = await getRepository(Preguntas).save(preg4);

    //Posteamos las 3 respuestas de la pregunta//
    if (!req.body.opcion_correcta4) throw new Exception("Ingrese la respuesta correcta ( opcion_correcta4 )")
    if (!req.body.opcion_b4) throw new Exception("Ingrese una respuesta incorrecta ( opcion_b4 )")
    if (!req.body.opcion_c4) throw new Exception("Ingrese otra respuesta incorrecta ( opcion_c4 )")
    let respuesta4 = new Respuesta()
    respuesta4.opcion_correcta = req.body.opcion_correcta4
    respuesta4.opcion_b = req.body.opcion_b4
    respuesta4.opcion_c = req.body.opcion_c4
    const resp4 = getRepository(Respuesta).create(respuesta4);
    const results07 = await getRepository(Respuesta).save(resp4);
    /* ******************************************************************* */
    /* QUINTA PREGUNTA Y SUS RESPUESTAS */
    /*if (!req.body.pregunta5) throw new Exception("Ingrese una pregunta ( pregunta5 )")
    if (!req.body.url_foto_pregunta5) throw new Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta5 )")
    let pregunta5 = new Preguntas()
    pregunta5.preguntas = req.body.pregunta5
    pregunta5.foto_pregunta = req.body.url_foto_pregunta5
    pregunta5.id = results.id
    const preg5 = getRepository(Preguntas).create(pregunta5);
    const results08 = await getRepository(Preguntas).save(preg5);*/

    //Posteamos las 3 respuestas de la pregunta//
    /*if (!req.body.opcion_correcta5) throw new Exception("Ingrese la respuesta correcta ( opcion_correcta5 )")
    if (!req.body.opcion_b5) throw new Exception("Ingrese una respuesta incorrecta ( opcion_b5 )")
    if (!req.body.opcion_c5) throw new Exception("Ingrese otra respuesta incorrecta ( opcion_c5 )")
    let respuesta5 = new Respuesta()
    respuesta5.opcion_correcta = req.body.opcion_correcta5
    respuesta5.opcion_b = req.body.opcion_b5
    respuesta5.opcion_c = req.body.opcion_c5
    const resp5 = getRepository(Respuesta).create(respuesta5);
    const results09 = await getRepository(Respuesta).save(resp5);*/
    /* ******************************************************************* */
console.log({    results,
        results2,
        results3,
        results04,
        results05,
        results06,
        results07
        })
    return res.json({
        results,
        results2,
        results3,
        results04,
        results05,
        results06,
        results07
        
    });

}

// GET De un Preguntado //
export const getPreguntado = async (req: Request, res: Response): Promise<Response> => {
    const preguntado = await getRepository(Preguntado).findOne(req.params.id);
    return res.json(preguntado);
}
// GET pregunta de un temario en especifico //

export const getPreguntas = async (req: Request, res: Response): Promise<Response> => {
    const preguntas = await getRepository(Preguntas).find(
        //relations: ['preguntado'],
          //  where:{
            //    id: req.params.id,
               //  preguntado: req.params.id 
            //}
    );
    return res.json(preguntas);
}