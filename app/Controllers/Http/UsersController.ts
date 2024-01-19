import  { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
    async register({request, response, auth}: HttpContextContract) {
        const userSchema = schema.create({
            user_name: schema.string({trim : true}, [
                rules.maxLength(70),
                rules.minLength(5)
            ]),
            email: schema.string({trim : true},[
                rules.email(),
                rules.unique({table: 'users', column: 'email'})
            ]),
            password: schema.string({trim: true},[
                rules.maxLength(20),
                rules.confirmed('password_confirmation')
            ])
        })
        const data = await request.validate({schema: userSchema})
        try {
            const user = await User.create(data)
            const token = await auth.use('api').generate(user)
            return response.status(201).json({ status:'ok', massage: "Done", token})
        } catch (error) {
            console.log(error);
            return response.status(500).json({status:'error' , message: "error"})
        }
    }


     public async login({request, response, auth}: HttpContextContract){
        const {uid, password} = request.only(['uid', 'password'])
        try {
            const token = await auth.use('api').attempt(uid, password)
            return response.status(201).json({status:'ok' , message: token})
        } catch(error){
            console.log(error)
            return response.status(500).json({status:'error' , message: "error"})
        }
     }


     public async logout({response, auth}: HttpContextContract){
        await auth.logout()
         return response.status(201).json({status: 'ok', massage: 'Done'})
     }
     
   
     public async github({ally}: HttpContextContract){
        return ally.use('github').redirect()
     }


     public async github_callback({auth, ally, response}: HttpContextContract){
        const github = ally.use('github')
        const githubUser = await github.user()
        const user =  await User.create({
            user_name: githubUser.name,
            email: githubUser.email!,
         })
         const token = githubUser.token
         await auth.login(user)
         return response.status(201).json({status: 'ok', massage: token})
     }


     public async google({ ally}: HttpContextContract){
        return ally.use('google').redirect()
     }
}