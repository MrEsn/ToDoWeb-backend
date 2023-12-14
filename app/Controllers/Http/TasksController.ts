import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  /*  async index({ request, response }: HttpContextContract) {
        try {
            const { filter, sort, search } = request.all();
    
            let tasksQuery = Task.query();
            if (filter && Array.isArray(filter)) {
                filter.forEach(([field, value]) => {
                    tasksQuery = tasksQuery.where(field, value);
                });
            }
            if (sort && Array.isArray(sort)) {
                tasksQuery = tasksQuery.orderBy(sort[0], sort[1]);
            }
            if (search && search !== '') {
                tasksQuery = tasksQuery.where('title', 'LIKE', `%${search}%`);
            }
            console.log(tasksQuery)
            const tasks = await tasksQuery.exec();
            return tasks;
        } catch (error) {
            console.error(error);
            return response.status(500).json({ status: 'error', message: 'KOOFT'});
        }
    }*/
    
    async index({request, response}: HttpContextContract){
        const req = request.all()
        try {

            console.log(req.search)
            const tasks = await Task.query()
            .where(req.filter[0],"LIKE","%"+req.filter[1]+"%")
            .orderBy(req.orderBy, req.orderType)
            .where('title', 'like', "%"+req.search+"%")
        return tasks
        } catch (error) {
            console.log(error);
            return response.status(500).json({status:'error' ,  message: "error"})
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
/*if(req.search){
                tasks = await Task.query()
                    .where(req.filter)
                    .orderBy(req.orderBy, req.orderType)
                    .where('title', 'LIKE', req.search)}
              else{
                tasks = await Task.query()
                    .where(req.filter)
                    .orderBy(req.orderBy, req.orderType)
              }
            if(req.search){
                 tasks = await Task.query()
                 .where('title', 'LIKE', req.search)
                 .orderBy(req.orderBy, req.orderType)
            }
            else if(req.filter){
                tasks = await Task.query()
                .where(req.filter)
                .orderBy(req.orderBy, req.orderType)
            }
            else{
                console.log('noooo')
            }*/ 