import {Request, Response, Router } from 'express'
import { Futbols, equipos } from '../model/equipos'
import { db } from '../database/database'

class FutbolesRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private post = async (req: Request, res: Response) => {
        console.log(req.body)
        
        const { nombre, salario, titulos, f_club } = req.body

        await db.conectarBD()
        
        const query: any = ( await Futbols.findOne({},{id:1,_id:0}).sort({id: -1}).limit(1) )
        let newId: number
        if (query == null){
            newId = 0
        }else{
            newId = query.id
        }
        const dSchema = {
            id: newId+1,
            nombre: name,
            salario: parseInt(salario),
            titulos: parseInt(titulos),
            f_club: parseInt(f_club),
        }
        const oSchema = new Futbols(dSchema)
        await oSchema.save()
        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        }) 
       
        await db.desconectarBD()
    } 


    private delete = async (req: Request, res: Response) => {
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

    private put = async (req: Request, res: Response) => {
        const { id } = req.params
        const { _nombre, salario, titulos, f_club } = req.body
        await db.conectarBD()
        await Futbols.findOneAndUpdate(
                { id: id}, 
                {
                    name: name,
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
        this._router.delete('/:id', this.delete)
        this._router.post('/', this.post)
        this._router.put('/:id', this.put)
    }
}

const obj = new FutbolesRoutes()
obj.misRutas()
export const equipoRoutes = obj.router