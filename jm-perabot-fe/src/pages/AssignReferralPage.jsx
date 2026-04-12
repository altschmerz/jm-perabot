import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PiWarningCircleBold } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import { ADMIN_ROLE_TYPE_ID } from '../utils/constants'

const AssignReferralPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authUser = useSelector((state) => state.authUser)

  useEffect(() => {
    if (window.location.pathname !== '/') {
      if (!authUser) {
        toast('Anda belum login. Silahkan login terlebih dahulu.', {
          id: 'not-logged-in',
          icon: <PiWarningCircleBold color="red" />,
          className: 'bg-red-100',
        })
        navigate('/')
        return
      }

      if (authUser.role !== ADMIN_ROLE_TYPE_ID) {
        toast('Anda tidak memiliki akses untuk halaman ini', {
          id: 'restricted-access',
          icon: <PiWarningCircleBold color="red" />,
          className: 'bg-red-100',
        })
        navigate('/')
      }
    }
  }, [authUser, navigate])

  const { register, formState, handleSubmit } = useForm()
  const formErrors = formState.errors

  const [isLoading, setIsLoading] = useState(false)

  const [submitErrorMsg, setSubmitErrorMsg] = useState()

  const onSubmit = (data) => {
    setIsLoading(true)

    dispatch(fromApi.assignReferralCode(data))
      .then((res) => {
        const userId = res.data?.[0]?.attributes?.id
        navigate(`/users/${userId}`)
      })
      .catch((err) => {
        console.warn('ERROR', err)
        setSubmitErrorMsg(err.msg)
        setIsLoading(false)
      })
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
          <div className="section-title text-center mt-10">Add Category</div>
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
                {formErrors.username.message}
              </div>
            )}

            <div className="flex justify-between items-center mt-3">
              <div className="mr-5 text-lg font-medium">Kode Referal</div>
              <input
                type="text"
                className="border border-black focus:outline-none px-2 py-1"
                {...register('referralCode', {
                  required: 'Kode Referal wajib diisi',
                })}
              />
            </div>
            {formErrors.referralCode && (
              <div className="text-sm text-red-600">
                {formErrors.referralCode.message}
              </div>
            )}

            {submitErrorMsg && (
              <div className="text-sm text-red-600 mt-3">{submitErrorMsg}</div>
            )}

            <button
              className="bg-black px-4 py-2 text-white cursor-pointer mt-3"
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              Simpan
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default AssignReferralPage
