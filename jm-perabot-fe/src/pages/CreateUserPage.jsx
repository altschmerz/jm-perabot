import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'

const CreateUserPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, formState, handleSubmit, watch } = useForm()
  const formErrors = formState.errors

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (data) => {
    setIsLoading(true)

    dispatch(fromApi.createUser(data))
      .then(() => navigate(`/login`))
      .catch((err) => console.warn('ERROR', err))
  }

  return (
    <Layout>
      {isLoading ? (
        <div className="flex flex-col items-center font-medium">
          <Spinner animation="border" variant="dark" />
          <div className="mt-2">Menyimpan...</div>
          <div>Mohon tunggu sebentar</div>
        </div>
      ) : (
        <div>
          <div className="section-title text-center mt-10">Add User</div>
          <div className="mt-5">
            <div className="flex justify-between items-center mt-3">
              <div className="mr-5 text-lg font-medium">Nama</div>
              <input
                type="text"
                className="border border-black focus:outline-none px-2 py-1"
                {...register('name', { required: 'Nama wajib diisi' })}
              />
            </div>
            {formErrors.name && (
              <div className="text-sm text-red-600">
                {formErrors.name.message}
              </div>
            )}

            <div className="flex justify-between items-center mt-3">
              <div className="mr-5 text-lg font-medium">Username</div>
              <input
                type="text"
                className="border border-black focus:outline-none px-2 py-1"
                {...register('username', { required: 'Username wajib diisi' })}
              />
            </div>
            {formErrors.username && (
              <div className="text-sm text-red-600">
                {formErrors.password.message}
              </div>
            )}

            <div className="flex justify-between items-center mt-3">
              <div className="mr-5 text-lg font-medium">Password</div>
              <input
                type="password"
                className="border border-black focus:outline-none px-2 py-1"
                {...register('password', { required: 'Password wajib diisi' })}
              />
            </div>
            {formErrors.password && (
              <div className="text-sm text-red-600">
                {formErrors.password.message}
              </div>
            )}

            <div className="flex justify-between items-center mt-3">
              <div className="mr-5 text-lg font-medium">Ulangi Password</div>
              <input
                type="password"
                className="border border-black focus:outline-none px-2 py-1"
                {...register('passwordRepeat', {
                  required: 'Ulangi Password wajib diisi',
                  validate: (repeatEmail) => {
                    if (watch('password') !== repeatEmail)
                      return 'Password yang diulangi tidak cocok'
                  },
                })}
              />
            </div>
            {formErrors.passwordRepeat && (
              <div className="text-sm text-red-600">
                {formErrors.passwordRepeat.message}
              </div>
            )}

            <div className="flex justify-between items-center mt-3">
              <div className="mr-5 text-lg font-medium">Email</div>
              <input
                type="email"
                className="border border-black focus:outline-none px-2 py-1"
                {...register('email', { required: 'Email wajib diisi' })}
              />
            </div>
            {formErrors.email && (
              <div className="text-sm text-red-600">
                {formErrors.email.message}
              </div>
            )}

            <div className="flex justify-between items-center mt-3">
              <div className="mr-5 text-lg font-medium">Nomor Telepon</div>
              <input
                type="text"
                className="border border-black focus:outline-none px-2 py-1"
                {...register('phoneNumber', {
                  required: 'Nomor Telepon wajib diisi',
                })}
              />
            </div>
            {formErrors.phoneNumber && (
              <div className="text-sm text-red-600">
                {formErrors.phoneNumber.message}
              </div>
            )}

            <div className="flex justify-between items-center mt-3">
              <div className="mr-5 text-lg font-medium">Alamat</div>
              <input
                type="text"
                className="border border-black focus:outline-none px-2 py-1"
                {...register('address', { required: 'Alamat wajib diisi' })}
              />
            </div>
            {formErrors.address && (
              <div className="text-sm text-red-600">
                {formErrors.address.message}
              </div>
            )}
            <div
              className="bg-black flex items-center p-2 text-white cursor-pointer mt-5"
              onClick={handleSubmit(onSubmit)}
            >
              Simpan
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default CreateUserPage
