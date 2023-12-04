import Route from '@ioc:Adonis/Core/Route'



Route.group(() => {
    Route.get('/tasks','TasksController.index').middleware('handle')
    Route.get('/tasks/:id','TasksController.show')
    Route.post('/tasks', 'TasksController.store')
    Route.put('/tasks/:id','TasksController.update')
    Route.delete('/tasks/:id', 'TasksController.destroy')
}).prefix('api')