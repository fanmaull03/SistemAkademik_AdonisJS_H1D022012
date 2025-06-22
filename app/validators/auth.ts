// app/Validators/auth.ts
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const loginSchema = schema.create({
  email: schema.string({}, [
    rules.email(),
    rules.exists({ table: 'users', column: 'email' }),
  ]),
  password: schema.string({}, [
    rules.minLength(6),
  ]),
})

export const registerSchema = schema.create({
  full_name: schema.string({}),
  email: schema.string({}, [
    rules.email(),
    rules.unique({ table: 'users', column: 'email' }),
  ]),
  password: schema.string({}, [
    rules.confirmed(), // butuh konfirmasi password (password_confirmation)
    rules.minLength(6),
  ]),
})
