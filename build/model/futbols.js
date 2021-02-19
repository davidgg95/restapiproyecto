"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Futbols = void 0;
const mongoose_1 = require("mongoose");
const jugadoresSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        unique: true
    },
    nombre: String,
    salario: Number,
    equipo: Number
});
exports.Futbols = mongoose_1.model('jugadores', jugadoresSchema);
