"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Futbols = void 0;
const mongoose_1 = require("mongoose");
const equiposSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        unique: true
    },
    nombre: String,
    salario: Number,
    titulos: Boolean,
    f_club: Date,
});
exports.Futbols = mongoose_1.model('equipos', equiposSchema);
