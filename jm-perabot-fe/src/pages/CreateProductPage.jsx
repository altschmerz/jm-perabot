import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'

const CreateProductPage = () => {
  const dispatch = useDispatch()

  const { register, formState, handleSubmit, watch } = useForm()
  const formErrors = formState.errors

  useEffect(() => {
    console.log('FORM ERRORS', formErrors)
  }, [formErrors])

  const onSubmit = (data) => {
    dispatch(
      fromApi.createProduct(
        data.name,
        data.sku,
        data.description,
        data.purchasePrice,
        data.retailPrice,
        data.wholesalerPrice,
        data.totalStock
      )
    )
      .then((res) => console.log('RES', res))
      .catch((err) => console.warn('ERROR', err))
  }

  return (
    <Layout>
      <div>
        <div className="section-title text-center mt-10">Add Product</div>
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

          <div className={`flex justify-between items-center mt-2`}>
            <div className="mr-5 text-lg font-medium">Kode</div>
            <input
              type={'text'}
              className="border border-black focus:outline-none px-2 py-1"
              {...register('sku', { required: true })}
            />
          </div>
          {formErrors.sku && <div>Kode wajib diisi</div>}

          {/*  // TODO: Use the Input component instead, problem: register passing not working; example provided below
           */}
          {/* <TextArea
            label="Deskripsi"
            className="mt-2"
            // pseudoRef={{ ...register('description') }}
            {...register('description')}
          /> */}
          <div className={`flex justify-between mt-2`}>
            <div className="mr-5 text-lg font-medium">Deskripsi</div>
            <textarea
              className="border border-black focus:outline-none px-2 py-1"
              {...register('description')}
            />
          </div>

          <div className={`flex justify-between items-center mt-2`}>
            <div className="mr-5 text-lg font-medium">Harga modal</div>
            <input
              type={'text'}
              className="border border-black focus:outline-none px-2 py-1"
              {...register('purchasePrice', { required: true })}
            />
          </div>

          {formErrors.purchasePrice && <div>Harga modal wajib diisi</div>}

          <div className={`flex justify-between items-center mt-2`}>
            <div className="mr-5 text-lg font-medium">Harga ecer</div>
            <input
              type={'text'}
              className="border border-black focus:outline-none px-2 py-1"
              {...register('retailPrice', { required: true })}
            />
          </div>
          {formErrors.retailPrice && <div>Harga ecer wajib diisi</div>}

          <div className={`flex justify-between items-center mt-2`}>
            <div className="mr-5 text-lg font-medium">Harga grosir</div>
            <input
              type={'text'}
              className="border border-black focus:outline-none px-2 py-1"
              {...register('wholesalerPrice', { required: true })}
            />
          </div>
          {formErrors.wholesalerPrice && <div>Harga grosir wajib diisi</div>}

          <div className={`flex justify-between items-center mt-2`}>
            <div className="mr-5 text-lg font-medium">Total stok</div>
            <input
              type={'text'}
              className="border border-black focus:outline-none px-2 py-1"
              {...register('totalStock', { required: true })}
            />
          </div>
          {formErrors.totalStock && <div>Total stok wajib diisi</div>}

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
    </Layout>
  )
}

export default CreateProductPage
