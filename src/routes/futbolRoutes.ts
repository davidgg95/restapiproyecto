import {Request, Response, Router } from 'express'
import { Futbols } from '../model/futbols'
import { Equipos } from '../model/equipos'
import { db } from '../database/database'

class FutbolesRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getEquipos = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Equipos.aggregate([
                {
                    $lookup: {
                        from: 'jugadores',
                        localField: 'id',
                        foreignField: 'equipo',
                        as: "equipos"
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getJugadores = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Futbols.aggregate([
                {$match:{ "salario":{$gte:1500}}}
            
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }


    private postJugadores = async (req: Request, res: Response) => {
        
        const { id, nombre, salario, equipo } = req.body
        await db.conectarBD()
        const dSchema = {
            id: id,
            nombre: nombre,
            salario: salario,
            equipo: equipo
        }
        const oSchema = new Futbols(dSchema)
        await oSchema.save()
        .then( (doc) => res.send(doc))
        .catch( (err: any) => res.send('Error: ' + err))  
        await db.desconectarBD()
    }   


    private deleteJugador = async (req: Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
        await Futbols.findOneAndDelete( { id: id })
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
            const query = await Futbols.find()
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
        await Futbols.findOne(
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

    private updateJugadores = async (req: Request, res: Response) => {
        const { id } = req.params
        const { nombre, salario, equipo } = req.body
        await db.conectarBD()
        await Futbols.findOneAndUpdate(
                { id: id}, 
                {
                    nombre: nombre,
                    salario: salario,
                    equipo: equipo
                },
                {
                    new: true,
                    runValidators: true 
                }  
            )
            .then( (docu: any) => {
                    if (docu==null){
                        console.log('El jugador que desea modificar no existe')
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
        this._router.get('/borrar/:id', this.deleteJugador)
        this._router.post('/', this.postJugadores)
        this._router.post('/actualizar/:id', this.updateJugadores) 
        this._router.get('/getEquipos', this.getEquipos)
        this._router.get('/getJugadores', this.getJugadores)
    }
}

const obj = new FutbolesRoutes()
obj.misRutas()
export const futbolRoutes = obj.router