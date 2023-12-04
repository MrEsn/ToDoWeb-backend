import  { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class UsersController {


    async panel({ request, response}: HttpContextContract ) {
        let a = request.all()
        console.log(request.body())
        return response.status(301)
    }


    

    // async index({request}: HttpContextContract ) {
    //      let a = request.all()
    //      let b = request.input('name')
    //     console.log(request.body())
    //     return [{id:1, name: 'ali', age: 20},{id:2,name: 'ali', age: 10},{id:3,name: 'reza', age: 15}]
    // }

    async show({ params}: HttpContextContract ) {
        const task = Task.find(params.id)
        return task
    }

    async store({request , response}: HttpContextContract) {
        const data = request.only(['title' , 'description' , 'prioriy' , 'due_date'])
        try {
            const task = await Task.create(data)
            return response.status(201).json({status:'ok', massage: "Done"})
        } catch (error) {
            console.log(error);
            return response.status(500).json({status:'error' , message: "KOOFT"})
        }
    }

    async index({}: HttpContextContract){
        let c = Task.all()
        return c
    }

    async destroy({params}: HttpContextContract){
        let id = params.id
        const task = await Task.findOrFail(id)
        await task.delete()
        let c = await Task.all()
        return c
    }


    async update({params,request}:HttpContextContract){
        const task = await Task.findOrFail(params.id)
     
        const data = request.only(['title', 'description', 'priority', 'due_date' ])
        await task.merge(data).save()
        return task
    }
}