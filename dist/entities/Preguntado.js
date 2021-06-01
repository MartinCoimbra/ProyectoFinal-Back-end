"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.Preguntado = void 0;
var typeorm_1 = require("typeorm");
var Comentario_1 = require("./Comentario");
var Categoria_1 = require("./Categoria");
var Preguntas_1 = require("./Preguntas");
var Preguntado = /** @class */ (function (_super) {
    __extends(Preguntado, _super);
    function Preguntado() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Preguntado.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Preguntado.prototype, "nombre");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Preguntado.prototype, "descripcion");
    __decorate([
        typeorm_1.Column({ "default": 0 }),
        __metadata("design:type", Number)
    ], Preguntado.prototype, "calificacion");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Preguntado.prototype, "url_foto");
    __decorate([
        typeorm_1.OneToMany(function () { return Comentario_1.Comentario; }, function (comentario) { return comentario.preguntado; }),
        __metadata("design:type", Comentario_1.Comentario)
    ], Preguntado.prototype, "comentario");
    __decorate([
        typeorm_1.ManyToOne(function () { return Categoria_1.Categoria; }, function (categoria) { return categoria.preguntado; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Categoria_1.Categoria)
    ], Preguntado.prototype, "categoria");
    __decorate([
        typeorm_1.OneToMany(function () { return Preguntas_1.Preguntas; }, function (preguntas) { return preguntas.preguntado; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Preguntas_1.Preguntas)
    ], Preguntado.prototype, "preguntas");
    Preguntado = __decorate([
        typeorm_1.Entity()
    ], Preguntado);
    return Preguntado;
}(typeorm_1.BaseEntity));
exports.Preguntado = Preguntado;
