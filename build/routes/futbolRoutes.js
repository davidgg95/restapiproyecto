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
const equipos_1 = require("../model/equipos");
const database_1 = require("../database/database");
class FutbolesRoutes {
    constructor() {
        this.getEquipos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield equipos_1.Equipos.aggregate([
                    {
                        $lookup: {
                            from: 'jugadores',
                            localField: 'id',
                            foreignField: 'equipo',
                            as: "equipos"
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getJugadores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield futbols_1.Futbols.aggregate([
                    { $match: { "salario": { $gte: 1500 } } }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.postJugadores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, nombre, salario, equipo } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                id: id,
                nombre: nombre,
                salario: salario,
                equipo: equipo
            };
            const oSchema = new futbols_1.Futbols(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.deleteJugador = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
        this.updateJugadores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, salario, equipo } = req.body;
            yield database_1.db.conectarBD();
            yield futbols_1.Futbols.findOneAndUpdate({ id: id }, {
                nombre: nombre,
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
        this._router.get('/borrar/:id', this.deleteJugador);
        this._router.post('/', this.postJugadores);
        this._router.post('/actualizar/:id', this.updateJugadores);
        this._router.get('/getEquipos', this.getEquipos);
        this._router.get('/getJugadores', this.getJugadores);
    }
}
const obj = new FutbolesRoutes();
obj.misRutas();
exports.futbolRoutes = obj.router;
