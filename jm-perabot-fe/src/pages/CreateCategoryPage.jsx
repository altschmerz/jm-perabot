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

const CreateCategoryPage = () => {
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

    dispatch(fromApi.createCategory(data.name))
      .then(() => navigate(`/categories`))
      .catch((err) => {
        console.warn('ERROR', err)
        setSubmitErrorMsg(err.msg)
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
          <div className="section-title text-center mt-10">Add Category</div>
          <div className="mt-5">
            {/*  // TODO: Use the Input component instead, problem: register passing not working; example provided below
             */}
            {/* <Input
            label="Nama"
            // pseudoRef={{ ...register('name', { required: true }) }}
            {...register('name', { required: true })}
          /> */}
            <div className={`flex justify-between items-center`}>
              <div className="mr-5 text-lg font-medium">Nama</div>
              <input
                type={'text'}
                className="border border-black focus:outline-none px-2 py-1"
                {...register('name', { required: true })}
              />
            </div>
            {formErrors.name && <div>Nama wajib diisi</div>}

            {submitErrorMsg && (
              <div className="text-sm text-red-600 mt-3">{submitErrorMsg}</div>
            )}

            {/*  // TODO: Use the FormSubmitButton component instead, problem: handleSubmit function not working; example provided below
             */}
            {/* <FormSubmitButton className="mt-5" onClick={handleSubmit(onSubmit)}>
            Simpan
          </FormSubmitButton> */}
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

export default CreateCategoryPage
