import { db } from "../src/database/database";


db.jugadores.drop()
db.jugadores.insertMany([
    {
        id: 1,
        nombre: "Messi",
        salario: 3000,
        equipo: 1,
    },
    {
        id: 2,
        nombre: "Iniesta",
        salario: 2000,
        equipo: 1,
    },
    {
        id: 3,
        nombre: "Ronaldo",
        salario: 1500,
        equipo: 2,
    },
    {
        id: 4,
        nombre: "Ocampos",
        salario: 500,
        equipo: 3,
    },
    {
        id: 5,
        nombre: "Navas",
        salario: 300,
        equipo: 3,
    },
    {
        id: 6,
        nombre: "Ramos",
        salario: 3000,
        equipo: 2,
    },
    {
        id: 7,
        nombre: "Xavi",
        salario: 1500,
        equipo: 1,
    },
    {
        id: 8,
        nombre: "Benzema",
        salario: 300,
        equipo: 2,
    },
])

db.equipos.drop()
db.equipos.insertMany([
    {
        id: 1,
        nombre: "Barcelona",
        salario: 3000000,
        f_club:new Date("1957-06-25")
    },
    {
        id: 2,
        nombre: "Madrid",
        salario: 2000000,
        f_club:new Date("1927-08-30")
    },
    {
        id: 3,
        nombre: "Sevilla",
        salario: 1500000,
        f_club:new Date("1905-10-14")
    }
])