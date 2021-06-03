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
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var actions = __importStar(require("./actions"));
var router = express_1.Router();
// POST registro  ✅
router.post('/user', utils_1.safe(actions.createUser));
//POST categorias ✅
router.post('/login', utils_1.safe(actions.login));
//GET todas categorias ✅
router.get('/categorias', utils_1.safe(actions.getCategorias));
//GET una categoria ✅
router.get('/categoria/:id', utils_1.safe(actions.getCategoria));
// Preguntados ✅
router.get('/preguntados', utils_1.safe(actions.getPreguntados));
// Preguntado especifico ✅
router.get('/preguntadoE/:id', utils_1.safe(actions.getPreguntado));
// Preguntados por categoria ✅
router.get('/preguntados/categoria/:id', utils_1.safe(actions.getPreguntadosPorCategoria));
/* Metodo get TODOS los comentrios que pertenescan a una tematica ✅ */
router.get('/preguntado/:id/comentario', utils_1.safe(actions.getComentariosDeUnPreguntado));
exports["default"] = router;
