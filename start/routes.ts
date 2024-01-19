import Route from '@ioc:Adonis/Core/Route'



Route.group(() => {
    Route.get('/','TasksController.index').middleware('handle')
    Route.get('/:id','TasksController.show')
    Route.post('/', 'TasksController.store')
    Route.put('/:id','TasksController.update')
    Route.delete('/:id', 'TasksController.destroy')
}).prefix('api/tasks').middleware('auth')

Route.group(() => {
    Route.post('/register', 'UsersController.register')
    Route.post('/login', 'UsersController.login')
    Route.get('/logout', 'UsersController.logout')
    
    Route.get('/google', 'UsersController.google')
    Route.get('/google/callback', "UsersController.google_callback")
    
    Route.get('/github', 'UsersController.github')
    Route.get('/github/callback', 'UsersController.github_callback')
}).prefix('api/auth')