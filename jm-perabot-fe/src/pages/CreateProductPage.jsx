import { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'

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
        data.categoryId,
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

  const categoriesReq = useFromApi(fromApi.getCategories())
  const categories = useResourceMapper('category', categoriesReq.sortOrder)

  return (
    <Layout>
      <div>
        <div className="section-title text-center mt-10">Add Product</div>
        <div className="mt-5">
          <Form>
            <Form.Group>
              <Form.Label className="mr-5 text-lg font-medium">
                Kategori
              </Form.Label>
              <Form.Select {...register('categoryId', { required: true })}>
                <option value="" selected>
                  Pilih kategori
                </option>
                {categories?.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  )
                })}
              </Form.Select>
            </Form.Group>
            {formErrors.categoryId && <div>Kategori wajib dipilih</div>}

            <Form.Group>
              <Form.Label className="mr-5 text-lg font-medium">Nama</Form.Label>
              <Form.Control
                className="border border-black focus:outline-none px-2 py-1"
                {...register('name', { required: true })}
              />
            </Form.Group>
            {formErrors.name && <div>Nama wajib diisi</div>}

            <Form.Group>
              <Form.Label className="mr-5 text-lg font-medium">Kode</Form.Label>
              <Form.Control
                className="border border-black focus:outline-none px-2 py-1"
                {...register('sku', { required: true })}
              />
            </Form.Group>
            {formErrors.sku && <div>Kode wajib diisi</div>}

            <Form.Group>
              <Form.Label className="mr-5 text-lg font-medium">
                Deskripsi
              </Form.Label>
              <Form.Control
                className="border border-black focus:outline-none px-2 py-1"
                as="textarea"
                rows={3}
                {...register('description')}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="mr-5 text-lg font-medium">
                Harga modal
              </Form.Label>
              <Form.Control
                className="border border-black focus:outline-none px-2 py-1"
                {...register('purchasePrice', { required: true })}
              />
            </Form.Group>
            {formErrors.purchasePrice && <div>Harga modal wajib diisi</div>}

            <Form.Group>
              <Form.Label className="mr-5 text-lg font-medium">
                Harga ecer
              </Form.Label>
              <Form.Control
                className="border border-black focus:outline-none px-2 py-1"
                {...register('retailPrice', { required: true })}
              />
            </Form.Group>
            {formErrors.retailPrice && <div>Harga ecer wajib diisi</div>}

            <Form.Group>
              <Form.Label className="mr-5 text-lg font-medium">
                Harga grosir
              </Form.Label>
              <Form.Control
                className="border border-black focus:outline-none px-2 py-1"
                {...register('wholesalerPrice', { required: true })}
              />
            </Form.Group>
            {formErrors.wholesalerPrice && <div>Harga grosir wajib diisi</div>}

            <Form.Group>
              <Form.Label className="mr-5 text-lg font-medium">
                Total stok
              </Form.Label>
              <Form.Control
                className="border border-black focus:outline-none px-2 py-1"
                {...register('totalStock', { required: true })}
              />
            </Form.Group>
            {formErrors.totalStock && <div>Total stok wajib diisi</div>}

            <Button
              className="bg-black flex items-center p-2 text-white cursor-pointer mt-5"
              onClick={handleSubmit(onSubmit)}
            >
              Simpan
            </Button>
          </Form>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProductPage
