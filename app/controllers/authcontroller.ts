import { loginSchema, registerSchema } from 'App/Validators/auth'

async login({ request, auth, response }) {
  const payload = await request.validate({ schema: loginSchema })

  await auth.use('web').attempt(payload.email, payload.password)
  return response.redirect('/dashboard')
}

async register({ request, auth, response }) {
  const payload = await request.validate({ schema: registerSchema })

  const user = await User.create({
    fullName: payload.full_name,
    email: payload.email,
    password: payload.password,
  })

  await auth.use('web').login(user)
  return response.redirect('/dashboard')
}
