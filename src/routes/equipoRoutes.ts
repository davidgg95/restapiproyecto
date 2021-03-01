import {Request, Response, Router } from 'express'
import { Equipos } from '../model/equipos'
import { db } from '../database/database'

class EquiposRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private postEquipo = async (req: Request, res: Response) => {
        
        const { id, nombre, salario, titulos, f_club } = req.body
        await db.conectarBD()
        const dSchema = {
            id: id,
            nombre: nombre,
            salario: salario,
            titulos: titulos,
            f_club: f_club

        }
        const oSchema = new Equipos(dSchema)
        await oSchema.save()
        .then( (doc) => res.send(doc))
        .catch( (err: any) => res.send('Error: ' + err)) 
        await db.desconectarBD()
    }   


    private delete = async (req: Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
        await Equipos.findOneAndDelete( { id: id })
        .then(
            (doc: any) => {
                console.log(doc)
            }) 
        db.desconectarBD()
    }

    private get = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            console.log('Haciendo el query')
            const query = await Equipos.find()
            console.log('Después del query')
            console.log(query)
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        db.desconectarBD()
    }

    private getId = async (req: Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
        await Equipos.findOne(
                { id: id }
            )
            .then( (docu: any) => {
                    if (docu == null){
                        console.log('El documento que desea modificar no existe')
                        res.json({"Error":"No existe: " + id})
                    } else {
                        console.log('Existe: '+ docu) 
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err: null) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            ) 
        db.desconectarBD()
    }

    private updateEquipo = async (req: Request, res: Response) => {
        const { id } = req.params
        const { nombre, salario, titulos, f_club } = req.body
        await db.conectarBD()
        await Equipos.findOneAndUpdate(
                { id: id}, 
                {
                    nombre: nombre,
                    salario: salario,
                    titulos: titulos,
                    f_club: f_club
                },
                {
                    new: true,
                    runValidators: true 
                }  
            )
            .then( (docu: any) => {
                    if (docu==null){
                        console.log('El equipo que desea modificar no existe')
                        res.json({"Error":"No existe: " + id})
                    } else {
                        console.log('Modificado Correctamente: '+ docu) 
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err: any) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            ) 
        db.desconectarBD()
    }
  
    misRutas(){
        this._router.get('/', this.get)
        this._router.get('/:id', this.getId)
        this._router.get('/borrar/:id', this.delete)
        this._router.post('/', this.postEquipo)
        this._router.post('/actualizar/:id', this.updateEquipo)
    }
}

const obj = new EquiposRoutes()
obj.misRutas()
export const equipoRoutes = obj.router