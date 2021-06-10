"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var actions = __importStar(require("./actions"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var router = express_1.Router();
/* TOKEN */
//MIDDLEWARE de verificación
var verifyToken = function (req, res, next) {
    //headers con el token
    var token = req.header('Authorization');
    if (!token)
        return res.status(400).json('ACCESS DENIED');
    try {
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_KEY);
        /* asignamos a req.user para aceder al usuario */
        req.user = decoded;
        next();
    }
    catch (error) {
        /* si surge un error hacemos esto: */
        return res.status(400).json('ACCESS DENIED');
    }
};
// get usuario actual ✅
router.get('/user', verifyToken, utils_1.safe(actions.getUser));
//post de categoria ✅
router.post('/categoria', verifyToken, utils_1.safe(actions.postCategoria));
/* POST PREGUNTADO ✅*/
router.post('/preguntado', verifyToken, utils_1.safe(actions.postPreguntado));
/* POST comentamos el preguntado que quieramos (poniendo el id del preguntado) ✅*/
router.post('/preguntado/:id/comentario', verifyToken, utils_1.safe(actions.postComentario));
// GET nos trae las preguntas y respuestas del mismo preguntado✅// 
router.get('/preguntado/:id', verifyToken, utils_1.safe(actions.getPreguntas_Respuestas_Preguntado));
/* NO SON NECESARIAS LAS RUTAS DE ABAJO. */
// GET a todas las preguntas✅ (no es necesario, necesitamos la especifica por id) 🛑
router.get('/preguntas', verifyToken, utils_1.safe(actions.getPreguntas));
// Hay que hacer que esta funcion de respuesta sea especifica pa el preguntado que eliga!! (revisar la respuesta que dio el archivo ) 🛑 
router.get('/respuestas', verifyToken, utils_1.safe(actions.getRespuestas));
// Editar los datos del usuario //
router.put('/editardatos', verifyToken, utils_1.safe(actions.putDatos));
/* GET de los coin de este mismo user */
router.get('/coin', verifyToken, utils_1.safe(actions.getCoin));
/* Posteamos Coins por defaul */
router.post('/postCoin', verifyToken, utils_1.safe(actions.postCoin));
/* Ruta put para paypal y cuando gaste los con para aumentar o restar */
router.put('/coin', verifyToken, utils_1.safe(actions.putCoin));
exports["default"] = router;
