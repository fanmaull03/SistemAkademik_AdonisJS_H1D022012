import Route from '@ioc:Adonis/Core/Route'

// Redirect to Dashboard
Route.get('/', async ({ response }) => {
  return response.redirect('/dashboard')
})

// Dashboard
Route.get('/dashboard', async ({ view }) => {
  return view.render('dashboard')
}).middleware('auth')

// Auth
Route.get('/login', async ({ view }) => {
  return view.render('auth/login')
}).as('login')

Route.post('/login', 'AuthController.login')
Route.get('/register', async ({ view }) => {
  return view.render('auth/register')
})
Route.post('/register', 'AuthController.register')
Route.post('/logout', async ({ auth, response }) => {
  await auth.logout()
  return response.redirect('/login')
})

// Fakultas
Route.resource('fakultas', 'FakultasController')
  .as('fakultas')
  .middleware({ '*': ['auth'] })

// Prodi
Route.resource('prodi', 'ProdiController')
  .as('prodi')
  .middleware({ '*': ['auth'] })

// Mahasiswa
Route.resource('mahasiswa', 'MahasiswaController')
  .as('mahasiswa')
  .middleware({ '*': ['auth'] })

// Mahasiswa Total SKS & Filter
Route.get('/mahasiswa-sks', 'MahasiswaController.totalSks').middleware('auth').as('mahasiswa.sks')
Route.get('/mahasiswa/filter', 'MahasiswaController.filterMahasiswa').middleware('auth').as('mahasiswa.filter')

// Matakuliah
Route.resource('matakuliah', 'MatakuliahController')
  .as('matakuliah')
  .middleware({ '*': ['auth'] })

// KRS
Route.get('/krs/create', 'KrsController.create').middleware('auth').as('krs.create')
Route.post('/krs', 'KrsController.store').middleware('auth').as('krs.store')
Route.get('/krs', 'KrsController.index').middleware('auth').as('krs.index')
