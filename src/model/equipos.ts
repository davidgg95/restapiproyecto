import {Schema, model } from 'mongoose'


export interface equipos {
    id: number;
    nombre: string;
    salario: number;
    titulos: boolean;
    f_club: Date
}




const equiposSchema = new Schema({
    id: {
        type: Number,
        unique: true  
    },
    nombre: String,
    salario: Number,
    titulos: Boolean,
    f_club: Date,
    
})



export const Futbols = model('equipos', equiposSchema)