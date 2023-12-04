import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {

    async index({request, response}: HttpContextContract){
        try {
            const req = request.all()
            const tasks = await Task.query()
            .where(req.filter)
            .orderBy(req.orderBy, req.orderType)
            .where('title', 'LIKE', req.search)
        return tasks
        } catch (error) {
            console.log(error);
            return response.status(500).json({status:'error' , message: "KOOFT"})
        }
    }


    async show({params}: HttpContextContract ) {
        const task = Task.find(params.id)
        return task
    }


    async store({request , response}: HttpContextContract) {
        const data = request.only(['title' , 'description' , 'priority' , 'due_date'])
        try {
            const task = await Task.create(data)
            return response.status(201).json({status:'ok', massage: "Done"})
        } catch (error) {
            console.log(error);
            return response.status(500).json({status:'error' , message: "KOOFT"})
        }
    }


    async update({params,request}:HttpContextContract){
        const task = await Task.findOrFail(params.id)
        const data = request.only(['title', 'description', 'priority', 'due_date' ])
        await task.merge(data).save()
        return task
    }


    async destroy({params}: HttpContextContract){
        let id = params.id
        const task = await Task.findOrFail(id)
        await task.delete()
        let c = await Task.all()
        return c
    }


}
