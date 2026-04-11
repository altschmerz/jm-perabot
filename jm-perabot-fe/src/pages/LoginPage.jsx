import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, formState, handleSubmit } = useForm()
  const formErrors = formState.errors

  const [isLoading, setIsLoading] = useState(false)

  const [loginErrorMsg, setLoginErrorMsg] = useState()

  const onSubmit = (data) => {
    setIsLoading(true)

    dispatch(fromApi.login(data))
      .then((res) => navigate('/me'))
      .catch((err) => {
        console.warn('ERROR', err)
        setLoginErrorMsg(err.msg)
      })

    setIsLoading(false)
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
          <div className="section-title text-center mt-10">Login</div>
          <div className="mt-5">
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

            {loginErrorMsg && (
              <div className="text-sm text-red-600 mt-3">{loginErrorMsg}</div>
            )}

            <div className="flex justify-end">
              <button
                className="bg-black px-4 py-2 text-white cursor-pointer mt-3"
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default LoginPage
