import {Schema, model } from 'mongoose'


export interface jugadores {
    id: number;
    nombre: string;
    salario: number;
    equipo: number
}



const jugadoresSchema = new Schema({
    id: {
        type: Number,
        unique: true  
    },
    nombre: String,
    salario: Number,
    equipo: Number
})



export const Futbols = model('jugadores', jugadoresSchema)