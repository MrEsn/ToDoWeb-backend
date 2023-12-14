import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import Task from 'App/Models/Task'
export default class Param {
  public async handle({request}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    let req = request.all()
    let orderBy = 'id'
    let orderType: 'asc' | 'desc' = 'asc'
    let search = ''
    if(req.search){
      search = req.search
    }
    if (req.sort) {
      let sort = JSON.parse(req.sort)
      //let sort = req.sort().toString()
      orderBy = sort[0]
      orderType = sort[1]
    }

   // let filter = JSON.parse(JSON.stringify(req.filter))
    let filter:any = {}
    if (req.filter) {
      filter = JSON.parse(req.filter)
      //filter = req.filter().toString()
      //filter = JSON.parse(req.filter)
    }
    
    
    
    //filter.deletedAt = null ///because soft delete @before fetch/paginate query dosen't work correctly -> wrong meta
    request.all().filter = filter
    request.all().orderBy = orderBy
    request.all().orderType = orderType
    request.all().search = search
    await next()
  }
}
