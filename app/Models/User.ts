import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import Task from './Task'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public user_name: string

  @column({ serializeAs: null })
  public password: string | null

  @column()
  public rememberMeToken: string | null

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password!)
    }
  }
}
