import CreateKrsValidator from 'App/Validators/CreateKrsValidator'

async store({ request, response }) {
  const data = await request.validate(CreateKrsValidator)

  const matakuliahs = await Matakuliah.findMany(data.matakuliah_ids)
  const totalSks = matakuliahs.reduce((sum, m) => sum + m.sks, 0)

  if (totalSks > 24) {
    return response.redirect().back().withErrors({
      message: 'Total SKS melebihi 24!'
    })
  }

  for (let mkId of data.matakuliah_ids) {
    await Krs.create({
      mahasiswaId: data.mahasiswa_id,
      matakuliahId: mkId,
      semester: data.semester,
    })
  }

  return response.redirect('/krs')
}
