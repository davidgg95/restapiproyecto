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
Object.defineProperty(exports, "__esModule", { value: true });
exports.futbolRoutes = void 0;
const express_1 = require("express");
const futbols_1 = require("../model/futbols");
const database_1 = require("../database/database");
class FutbolesRoutes {
    constructor() {
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id, nombre, salario, equipo } = req.body;
            console.log(id);
            const dSchema = {
                id: id,
                nombre: nombre,
                salario: salario,
                equipo: equipo
            };
            console.log(dSchema);
            const oSchema = new futbols_1.Futbols(dSchema);
            yield database_1.db.conectarBD();
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            yield database_1.db.desconectarBD();
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD();
            yield futbols_1.Futbols.findOneAndDelete({ id: id })
                .then((doc) => {
                console.log(doc);
            });
            database_1.db.desconectarBD();
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                console.log('Haciendo el query');
                const query = yield futbols_1.Futbols.find();
                console.log('Después del query');
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD();
            yield futbols_1.Futbols.findOne({ id: id })
                .then((docu) => {
                if (docu == null) {
                    console.log('El documento que desea modificar no existe');
                    res.json({ "Error": "No existe: " + id });
                }
                else {
                    console.log('Existe: ' + docu);
                    res.json(docu);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            });
            database_1.db.desconectarBD();
        });
        this.put = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { _nombre, salario, equipo } = req.body;
            yield database_1.db.conectarBD();
            yield futbols_1.Futbols.findOneAndUpdate({ id: id }, {
                name: name,
                salario: salario,
                equipo: equipo
            }, {
                new: true,
                runValidators: true
            })
                .then((docu) => {
                if (docu == null) {
                    console.log('El jugador que desea modificar no existe');
                    res.json({ "Error": "No existe: " + id });
                }
                else {
                    console.log('Modificado Correctamente: ' + docu);
                    res.json(docu);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            });
            database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/', this.get);
        this._router.get('/:id', this.getId);
        this._router.delete('/:id', this.delete);
        this._router.post('/', this.post);
        this._router.put('/:id', this.put);
    }
}
const obj = new FutbolesRoutes();
obj.misRutas();
exports.futbolRoutes = obj.router;
