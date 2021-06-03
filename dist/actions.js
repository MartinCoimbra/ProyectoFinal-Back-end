"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getPreguntadosPorCategoria = exports.getComentariosDeUnPreguntado = exports.postComentario = exports.getPreguntas_Respuestas_Preguntado = exports.getRespuestas = exports.getPreguntas = exports.getPreguntado = exports.getPreguntados = exports.postPreguntado = exports.getCategoria = exports.getCategorias = exports.postCategoria = exports.login = exports.getUser = exports.createUser = void 0;
var typeorm_1 = require("typeorm");
var Usuario_1 = require("./entities/Usuario");
var utils_1 = require("./utils");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Categoria_1 = require("./entities/Categoria");
var Preguntado_1 = require("./entities/Preguntado");
var Preguntas_1 = require("./entities/Preguntas");
var Respuesta_1 = require("./entities/Respuesta");
var Comentario_1 = require("./entities/Comentario");
/* POST user ✅*/
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.username)
                    throw new utils_1.Exception("coloque el nombre por favor ( username )");
                if (!req.body.first_name)
                    throw new utils_1.Exception("coloque el nombre por favor ( first_name )");
                if (!req.body.last_name)
                    throw new utils_1.Exception("coloque el apellido por favor ( last_name )");
                if (!req.body.email)
                    throw new utils_1.Exception("coloque el email por favor ( email )");
                if (!req.body.password)
                    throw new utils_1.Exception("coloque una contraseña por favor ( password )");
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("ya hay un usuario con este email");
                newUser = typeorm_1.getRepository(Usuario_1.Usuario).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
/* GET user ✅*/
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.user.id;
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).findOne(userID)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.getUser = getUser;
/* POST user (login) ✅*/
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Verifique el email", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Verifique el password", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Usuario_1.Usuario).findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Email o password incorrecto", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                return [2 /*return*/, res.json({ user: user, token: token })]; // Devolvera el usuario y el token creado recientemente al cliente
        }
    });
}); };
exports.login = login;
// POST(Publicar o enviar) categoria ✅
var postCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hayCat, categoriaresp, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.name)
                    throw new utils_1.Exception("Ingrese nombre de la categoria ( name )");
                return [4 /*yield*/, typeorm_1.getRepository(Categoria_1.Categoria).findOne({ where: { name: req.body.name } })];
            case 1:
                hayCat = _a.sent();
                if (hayCat)
                    throw new utils_1.Exception("Ya hay una categoria con ese nombre", 401);
                categoriaresp = typeorm_1.getRepository(Categoria_1.Categoria).create(req.body);
                console.log(categoriaresp);
                return [4 /*yield*/, typeorm_1.getRepository(Categoria_1.Categoria).save(categoriaresp)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.postCategoria = postCategoria;
// GET(Leer) todas las categorias ✅
var getCategorias = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categorias;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Categoria_1.Categoria).find()];
            case 1:
                categorias = _a.sent();
                return [2 /*return*/, res.json(categorias)];
        }
    });
}); };
exports.getCategorias = getCategorias;
// GET(Leer) 1 categoria ✅
var getCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoria;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Categoria_1.Categoria).findOne(req.params.id)];
            case 1:
                categoria = _a.sent();
                return [2 /*return*/, res.json(categoria)];
        }
    });
}); };
exports.getCategoria = getCategoria;
/*  POST de 1 preguntado (tematica) ✅
*   1- No se postean todas las preguntas, queda la ultima nomas SOLUCIONADO ✅
*   2- Visualisar las respuesta de ese mismo preguntado SOLUCIONADO ✅
*   3- Esta sobre escribiendo los valores? SOLUCIONADO ✅
*   4- Fijate que las respuesta tenga el id de la pregunta (el cual es auto incremental)  SOLUCIONADO ✅
*   5- Tenemos problema relacionando las preguntas con las respuestas SOLUCIONADO ✅
*   5- Tenemos problema relacionando las preguntas con el preguntado> SOLUCIONADO ✅
*/
var postPreguntado = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hayPreguntado, preguntadoo, preguntado, results, pregunta, preg, results2, respuesta, resp, results3, pregunta2, preg2, results02, respuesta2, resp2, results03, pregunta3, preg3, results04, respuesta3, resp3, results05, pregunta4, preg4, results06, respuesta4, resp4, results07, pregunta5, preg5, results08, respuesta5, resp5, results09;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.nombre)
                    throw new utils_1.Exception("Ingrese nombre del preguntado ( nombre )");
                if (!req.body.descripcion)
                    throw new utils_1.Exception("Ingrese una descripcion del preguntado ( descripcion )");
                if (!req.body.url_foto)
                    throw new utils_1.Exception("Ingrese una url del preguntado ( url_foto )");
                if (!req.body.categoria)
                    throw new utils_1.Exception("Ingrese una ( categoria )");
                if (!req.body.pregunta)
                    throw new utils_1.Exception("Ingrese una pregunta ( pregunta )");
                if (!req.body.url_foto_pregunta)
                    throw new utils_1.Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta )");
                if (!req.body.opcion_correcta)
                    throw new utils_1.Exception("Ingrese la respuesta correcta ( opcion_correcta )");
                if (!req.body.opcion_b)
                    throw new utils_1.Exception("Ingrese una respuesta incorrecta ( opcion_b )");
                if (!req.body.opcion_c)
                    throw new utils_1.Exception("Ingrese otra respuesta incorrecta ( opcion_c )");
                if (!req.body.pregunta2)
                    throw new utils_1.Exception("Ingrese una pregunta ( pregunta2 )");
                if (!req.body.url_foto_pregunta2)
                    throw new utils_1.Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta2 )");
                if (!req.body.opcion_correcta2)
                    throw new utils_1.Exception("Ingrese la respuesta correcta ( opcion_correcta2 )");
                if (!req.body.opcion_b2)
                    throw new utils_1.Exception("Ingrese una respuesta incorrecta ( opcion_b2 )");
                if (!req.body.opcion_c2)
                    throw new utils_1.Exception("Ingrese otra respuesta incorrecta ( opcion_c2 )");
                if (!req.body.pregunta3)
                    throw new utils_1.Exception("Ingrese una pregunta ( pregunta3 )");
                if (!req.body.url_foto_pregunta3)
                    throw new utils_1.Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta3 )");
                if (!req.body.opcion_correcta3)
                    throw new utils_1.Exception("Ingrese la respuesta correcta ( opcion_correcta3 )");
                if (!req.body.opcion_b3)
                    throw new utils_1.Exception("Ingrese una respuesta incorrecta ( opcion_b3 )");
                if (!req.body.opcion_c3)
                    throw new utils_1.Exception("Ingrese otra respuesta incorrecta ( opcion_c3 )");
                if (!req.body.pregunta4)
                    throw new utils_1.Exception("Ingrese una pregunta ( pregunta4 )");
                if (!req.body.url_foto_pregunta4)
                    throw new utils_1.Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta4 )");
                if (!req.body.opcion_correcta4)
                    throw new utils_1.Exception("Ingrese la respuesta correcta ( opcion_correcta4 )");
                if (!req.body.opcion_b4)
                    throw new utils_1.Exception("Ingrese una respuesta incorrecta ( opcion_b4 )");
                if (!req.body.opcion_c4)
                    throw new utils_1.Exception("Ingrese otra respuesta incorrecta ( opcion_c4 )");
                if (!req.body.pregunta5)
                    throw new utils_1.Exception("Ingrese una pregunta ( pregunta5 )");
                if (!req.body.url_foto_pregunta5)
                    throw new utils_1.Exception("Ingrese la url_foto_pregunta ( url_foto_pregunta5 )");
                if (!req.body.opcion_correcta5)
                    throw new utils_1.Exception("Ingrese la respuesta correcta ( opcion_correcta5 )");
                if (!req.body.opcion_b5)
                    throw new utils_1.Exception("Ingrese una respuesta incorrecta ( opcion_b5 )");
                if (!req.body.opcion_c5)
                    throw new utils_1.Exception("Ingrese otra respuesta incorrecta ( opcion_c5 )");
                return [4 /*yield*/, typeorm_1.getRepository(Preguntado_1.Preguntado).findOne({ where: { nombre: req.body.nombre } })];
            case 1:
                hayPreguntado = _a.sent();
                if (hayPreguntado)
                    throw new utils_1.Exception("Ya hay una tematica con ese nombre");
                preguntadoo = new Preguntado_1.Preguntado();
                preguntadoo.categoria = req.body.categoria;
                preguntadoo.descripcion = req.body.descripcion;
                preguntadoo.url_foto = req.body.url_foto;
                preguntadoo.nombre = req.body.nombre;
                preguntado = typeorm_1.getRepository(Preguntado_1.Preguntado).create(preguntadoo);
                return [4 /*yield*/, typeorm_1.getRepository(Preguntado_1.Preguntado).save(preguntado)];
            case 2:
                results = _a.sent();
                pregunta = new Preguntas_1.Preguntas();
                pregunta.preguntas = req.body.pregunta;
                pregunta.foto_pregunta = req.body.url_foto_pregunta;
                pregunta.preguntados = results.id;
                preg = typeorm_1.getRepository(Preguntas_1.Preguntas).create(pregunta);
                return [4 /*yield*/, typeorm_1.getRepository(Preguntas_1.Preguntas).save(preg)];
            case 3:
                results2 = _a.sent();
                respuesta = new Respuesta_1.Respuesta();
                respuesta.opcion_correcta = req.body.opcion_correcta;
                respuesta.opcion_b = req.body.opcion_b;
                respuesta.opcion_c = req.body.opcion_c;
                respuesta.preguntas = results2.id;
                resp = typeorm_1.getRepository(Respuesta_1.Respuesta).create(respuesta);
                return [4 /*yield*/, typeorm_1.getRepository(Respuesta_1.Respuesta).save(resp)];
            case 4:
                results3 = _a.sent();
                pregunta2 = new Preguntas_1.Preguntas();
                pregunta2.preguntas = req.body.pregunta2;
                pregunta2.foto_pregunta = req.body.url_foto_pregunta2;
                pregunta2.preguntados = results.id;
                preg2 = typeorm_1.getRepository(Preguntas_1.Preguntas).create(pregunta2);
                return [4 /*yield*/, typeorm_1.getRepository(Preguntas_1.Preguntas).save(preg2)];
            case 5:
                results02 = _a.sent();
                respuesta2 = new Respuesta_1.Respuesta();
                respuesta2.opcion_correcta = req.body.opcion_correcta2;
                respuesta2.opcion_b = req.body.opcion_b2;
                respuesta2.opcion_c = req.body.opcion_c2;
                respuesta2.preguntas = results2.id + 1; //porque sino lo relaciona con la pregunta anterior
                resp2 = typeorm_1.getRepository(Respuesta_1.Respuesta).create(respuesta2);
                return [4 /*yield*/, typeorm_1.getRepository(Respuesta_1.Respuesta).save(resp2)];
            case 6:
                results03 = _a.sent();
                pregunta3 = new Preguntas_1.Preguntas();
                pregunta3.preguntas = req.body.pregunta3;
                pregunta3.foto_pregunta = req.body.url_foto_pregunta3;
                pregunta3.preguntados = results.id;
                preg3 = typeorm_1.getRepository(Preguntas_1.Preguntas).create(pregunta3);
                return [4 /*yield*/, typeorm_1.getRepository(Preguntas_1.Preguntas).save(preg3)];
            case 7:
                results04 = _a.sent();
                respuesta3 = new Respuesta_1.Respuesta();
                respuesta3.opcion_correcta = req.body.opcion_correcta3;
                respuesta3.opcion_b = req.body.opcion_b3;
                respuesta3.opcion_c = req.body.opcion_c3;
                respuesta3.preguntas = results2.id + 2; //porque sino lo relaciona con la pregunta anterior
                resp3 = typeorm_1.getRepository(Respuesta_1.Respuesta).create(respuesta3);
                return [4 /*yield*/, typeorm_1.getRepository(Respuesta_1.Respuesta).save(resp3)];
            case 8:
                results05 = _a.sent();
                pregunta4 = new Preguntas_1.Preguntas();
                pregunta4.preguntas = req.body.pregunta4;
                pregunta4.foto_pregunta = req.body.url_foto_pregunta4;
                pregunta4.preguntados = results.id;
                preg4 = typeorm_1.getRepository(Preguntas_1.Preguntas).create(pregunta4);
                return [4 /*yield*/, typeorm_1.getRepository(Preguntas_1.Preguntas).save(preg4)];
            case 9:
                results06 = _a.sent();
                respuesta4 = new Respuesta_1.Respuesta();
                respuesta4.opcion_correcta = req.body.opcion_correcta4;
                respuesta4.opcion_b = req.body.opcion_b4;
                respuesta4.opcion_c = req.body.opcion_c4;
                respuesta4.preguntas = results2.id + 3; //porque sino lo relaciona con la pregunta anterior
                resp4 = typeorm_1.getRepository(Respuesta_1.Respuesta).create(respuesta4);
                return [4 /*yield*/, typeorm_1.getRepository(Respuesta_1.Respuesta).save(resp4)];
            case 10:
                results07 = _a.sent();
                pregunta5 = new Preguntas_1.Preguntas();
                pregunta5.preguntas = req.body.pregunta5;
                pregunta5.foto_pregunta = req.body.url_foto_pregunta5;
                pregunta5.preguntados = results.id;
                preg5 = typeorm_1.getRepository(Preguntas_1.Preguntas).create(pregunta5);
                return [4 /*yield*/, typeorm_1.getRepository(Preguntas_1.Preguntas).save(preg5)];
            case 11:
                results08 = _a.sent();
                respuesta5 = new Respuesta_1.Respuesta();
                respuesta5.opcion_correcta = req.body.opcion_correcta5;
                respuesta5.opcion_b = req.body.opcion_b5;
                respuesta5.opcion_c = req.body.opcion_c5;
                respuesta5.preguntas = results2.id + 4; //porque sino lo relaciona con la pregunta anterior
                resp5 = typeorm_1.getRepository(Respuesta_1.Respuesta).create(respuesta5);
                return [4 /*yield*/, typeorm_1.getRepository(Respuesta_1.Respuesta).save(resp5)];
            case 12:
                results09 = _a.sent();
                return [2 /*return*/, res.json({
                        results: results,
                        results2: results2,
                        results3: results3,
                        results02: results02,
                        results03: results03,
                        results04: results04,
                        results05: results05,
                        results06: results06,
                        results07: results07,
                        results08: results08,
                        results09: results09
                    })];
        }
    });
}); };
exports.postPreguntado = postPreguntado;
// GET(Leer) Todos los preguntados(tematicas) ✅
var getPreguntados = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var preguntados;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Preguntado_1.Preguntado).find({ relations: ['categoria'] })];
            case 1:
                preguntados = _a.sent();
                return [2 /*return*/, res.json(preguntados)];
        }
    });
}); };
exports.getPreguntados = getPreguntados;
// GET De un Preguntado ✅
var getPreguntado = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var preguntado;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Preguntado_1.Preguntado).find({
                    where: { id: req.params.id },
                    relations: ['categoria']
                })];
            case 1:
                preguntado = _a.sent();
                return [2 /*return*/, res.json(preguntado)];
        }
    });
}); };
exports.getPreguntado = getPreguntado;
// GET TODOS LAS PREGUNTAS MOSTRANDO Sus respuestas y mostrando el peguntado(tematica que le corresponde) ✅
var getPreguntas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var preguntas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Preguntas_1.Preguntas).find({ relations: ['respuesta', 'preguntado'] })];
            case 1:
                preguntas = _a.sent();
                return [2 /*return*/, res.json(preguntas)];
        }
    });
}); };
exports.getPreguntas = getPreguntas;
/* Hay que borrarlo despues o editarlo a que nos de las respuesta de el preguntado elegido especifico 💥 */
var getRespuestas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Respuestas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Respuesta_1.Respuesta).find({ relations: ['pregunta'] })];
            case 1:
                Respuestas = _a.sent();
                return [2 /*return*/, res.json(Respuestas)];
        }
    });
}); };
exports.getRespuestas = getRespuestas;
// Metodo Get segun el ID del Preguntado (tematica) nos trae las preguntas y las respuestas del mismo  ✅
// Esto lo podemos utilizar cuando vallamos a jugar, al seleccionar uno lo guardamos en un array y verificamos con programacion si acerto la pregunta // 
// Si acerto la pregunta se le sumaran puntos de lo contrario se le restaran // 
var getPreguntas_Respuestas_Preguntado = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pregunta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Preguntas_1.Preguntas).find({ where: { preguntados: req.params.id },
                    relations: ['respuesta', 'preguntado'] })];
            case 1:
                pregunta = _a.sent();
                return [2 /*return*/, res.json(pregunta)];
        }
    });
}); };
exports.getPreguntas_Respuestas_Preguntado = getPreguntas_Respuestas_Preguntado;
var postComentario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, comentario, newComent, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.user.user.id;
                /* IDENTIFICAMOS AL PREGUNTADO CON EL  = req.params.id */
                if (!req.body.comentario)
                    throw new utils_1.Exception("Ingrese un comentario ( comentario )");
                if (!req.body.calificacion)
                    throw new utils_1.Exception("Ingrese la calificacion del 1 al 5 ( calificacion )");
                comentario = new Comentario_1.Comentario();
                comentario.usuario = userID;
                comentario.preguntados = parseInt(req.params.id);
                comentario.comentario = req.body.comentario;
                comentario.calificacion = req.body.calificacion;
                console.log(comentario);
                newComent = typeorm_1.getRepository(Comentario_1.Comentario).create(comentario);
                return [4 /*yield*/, typeorm_1.getRepository(Comentario_1.Comentario).save(newComent)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.postComentario = postComentario;
/*  GET A TODOS LOS COMENTARIOS de 1 preguntado /preguntado/:id/comentario ✅*/
var getComentariosDeUnPreguntado = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comentarios;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Comentario_1.Comentario).find({ where: { preguntados: parseInt(req.params.id) },
                    relations: ['preguntado', 'usuario'] })];
            case 1:
                comentarios = _a.sent();
                return [2 /*return*/, res.json(comentarios)];
        }
    });
}); };
exports.getComentariosDeUnPreguntado = getComentariosDeUnPreguntado;
/*  GET A todos los preguntados perteneciente a una categoria✅ */
var getPreguntadosPorCategoria = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var preguntado;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Preguntado_1.Preguntado).find({
                    where: { categoria: req.params.id },
                    relations: ['categoria']
                })];
            case 1:
                preguntado = _a.sent();
                return [2 /*return*/, res.json(preguntado)];
        }
    });
}); };
exports.getPreguntadosPorCategoria = getPreguntadosPorCategoria;
