import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import Button from '../components/Native/Button'
import Input from '../components/Native/Input'
import TextArea from '../components/Native/TextArea'

const CreateProductPage = () => {
  const { register, formState, handleSubmit } = useForm()
  const formErrors = formState.errors

  useEffect(() => {
    console.log('FORM STATE', formState.errors)
  }, [formState])

  const onSubmit = (data) => {
    console.log('FORM SUBMIT', data)
  }
  return (
    <Layout>
      <div>
        <div className="section-title text-center mt-10">Add Product</div>
        <div className="mt-5">
          <Input
            label="Nama"
            pseudoRef={{ ...register('name', { required: true }) }}
          />
          {formErrors.name && <div>Nama wajib diisi</div>}

          <Input
            label="ID"
            className="mt-2"
            pseudoRef={{ ...register('id', { required: true }) }}
          />
          {formErrors.id && <div>ID wajib diisi</div>}

          <TextArea
            label="Deskripsi"
            className="mt-2"
            pseudoRef={{ ...register('description') }}
          />

          <Input
            label="Harga modal"
            className="mt-2"
            pseudoRef={{ ...register('purchasePrice', { required: true }) }}
          />
          {formErrors.purchasePrice && <div>Harga modal wajib diisi</div>}

          <Input
            label="Harga ecer"
            className="mt-2"
            pseudoRef={{ ...register('retailPrice', { required: true }) }}
          />
          {formErrors.retailPrice && <div>Harga ecer wajib diisi</div>}

          <Input
            label="Harga grosir"
            className="mt-2"
            pseudoRef={{ ...register('wholesalerPrice', { required: true }) }}
          />
          {formErrors.wholesalerPrice && <div>Harga grosir wajib diisi</div>}

          <Button className="mt-5" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProductPage
