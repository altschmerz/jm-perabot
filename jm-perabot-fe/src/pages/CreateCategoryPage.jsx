import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'

const CreateCategoryPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, formState, handleSubmit } = useForm()
  const formErrors = formState.errors

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (data) => {
    setIsLoading(true)

    dispatch(fromApi.createCategory(data.name))
      .then(() => navigate(`/categories`))
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

            {/*  // TODO: Use the FormSubmitButton component instead, problem: handleSubmit function not working; example provided below
             */}
            {/* <FormSubmitButton className="mt-5" onClick={handleSubmit(onSubmit)}>
            Simpan
          </FormSubmitButton> */}
            <div
              className={`bg-black flex items-center p-2 text-white cursor-pointer mt-5`}
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

export default CreateCategoryPage
