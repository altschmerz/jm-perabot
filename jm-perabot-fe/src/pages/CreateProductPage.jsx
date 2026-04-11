import { useEffect, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PiWarningCircleBold } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'
import { ADMIN_ROLE_TYPE_ID } from '../utils/constants'

const CreateProductPage = () => {
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

  const [isLoading, setIsLoading] = useState(false)

  const { register, control, formState, handleSubmit } = useForm()
  const formErrors = formState.errors

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  })

  const [submitErrorMsg, setSubmitErrorMsg] = useState()

  const onSubmit = (data) => {
    setIsLoading(true)

    const formData = new FormData()
    formData.append('categoryId', data.categoryId)
    formData.append('name', data.name)
    formData.append('sku', data.sku)
    formData.append('description', data.description)
    formData.append('purchasePrice', data.purchasePrice)
    formData.append('retailPrice', data.retailPrice)
    formData.append('wholesalerPrice', data.wholesalerPrice)
    formData.append('totalStock', data.totalStock)

    if (data.image && data.image[0]) formData.append('image', data.image[0])

    if (data.variants) {
      data.variants.forEach((variant, i) => {
        formData.append(`variants[${i}][name]`, variant.name)
        formData.append(`variants[${i}][sku]`, variant.sku)
        formData.append(`variants[${i}][stock]`, variant.stock)

        if (variant.image?.[0]) {
          formData.append(`variantImages`, variant.image[0])
        }
      })
    }

    dispatch(fromApi.createProduct(formData))
      .then((res) => navigate(`/products/${res?.data?.[0]?.id}`))
      .catch((err) => {
        console.warn('ERROR', err)
        setSubmitErrorMsg(err.msg)
        setIsLoading(false)
      })
  }

  const categoriesReq = useFromApi(fromApi.getCategories())
  const categories = useResourceMapper('category', categoriesReq.sortOrder)

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
          <div className="section-title text-center mt-10">Tambah Produk</div>
          <div className="mt-5">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="mr-5 text-lg font-medium">
                  Gambar produk
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  {...register('image')}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="flex justify-between">
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
                </div>
                {formErrors.categoryId && (
                  <div className="text-red-600">Kategori wajib dipilih</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="flex justify-between">
                  <Form.Label className="mr-5 text-lg font-medium">
                    Nama
                  </Form.Label>
                  <Form.Control
                    className="border border-black focus:outline-none px-2 py-1"
                    {...register('name', { required: true })}
                  />
                </div>
                {formErrors.name && (
                  <div className="text-red-600">Nama wajib diisi</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="flex justify-between">
                  <Form.Label className="mr-5 text-lg font-medium">
                    Kode
                  </Form.Label>
                  <Form.Control
                    className="border border-black focus:outline-none px-2 py-1"
                    {...register('sku', { required: true })}
                  />
                </div>
                {formErrors.sku && (
                  <div className="text-red-600">Kode wajib diisi</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="flex justify-between">
                  <Form.Label className="mr-5 text-lg font-medium">
                    Deskripsi
                  </Form.Label>
                  <Form.Control
                    className="border border-black focus:outline-none px-2 py-1"
                    as="textarea"
                    rows={3}
                    {...register('description')}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="flex justify-between">
                  <Form.Label className="mr-5 text-lg font-medium">
                    Harga modal
                  </Form.Label>
                  <Form.Control
                    className="border border-black focus:outline-none px-2 py-1"
                    {...register('purchasePrice', { required: true })}
                  />
                </div>
                {formErrors.purchasePrice && (
                  <div className="text-red-600">Harga modal wajib diisi</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="flex justify-between">
                  <Form.Label className="mr-5 text-lg font-medium">
                    Harga ecer
                  </Form.Label>
                  <Form.Control
                    className="border border-black focus:outline-none px-2 py-1"
                    {...register('retailPrice', { required: true })}
                  />
                </div>
                {formErrors.retailPrice && (
                  <div className="text-red-600">Harga ecer wajib diisi</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="flex justify-between">
                  <Form.Label className="mr-5 text-lg font-medium">
                    Harga grosir
                  </Form.Label>
                  <Form.Control
                    className="border border-black focus:outline-none px-2 py-1"
                    {...register('wholesalerPrice', { required: true })}
                  />
                </div>
                {formErrors.wholesalerPrice && (
                  <div className="text-red-600">Harga grosir wajib diisi</div>
                )}
              </Form.Group>

              <Form.Group>
                <div className="flex justify-between">
                  <Form.Label className="mr-5 text-lg font-medium">
                    Total stok
                  </Form.Label>
                  <Form.Control
                    className="border border-black focus:outline-none px-2 py-1"
                    {...register('totalStock', { required: true })}
                  />
                </div>
                {formErrors.totalStock && (
                  <div className="text-red-600">Total stok wajib diisi</div>
                )}
              </Form.Group>

              {fields.map((field, idx) => (
                <div className="mt-3 border rounded-md p-3" key={field.id}>
                  <div className="mb-3 flex justify-between items-center">
                    <div className="text-xl font-bold">Varian {idx + 1}</div>
                    <Button variant="danger" onClick={() => remove(idx)}>
                      Hapus
                    </Button>
                  </div>

                  <Form.Group className="mb-3">
                    <div className="flex justify-between">
                      <Form.Label className="mr-5 text-lg font-medium">
                        Nama
                      </Form.Label>
                      <Form.Control
                        className="border border-black focus:outline-none px-2 py-1"
                        {...register(`variants.${idx}.name`, {
                          required: true,
                        })}
                      />
                    </div>
                    {formErrors.variants?.[idx]?.name && (
                      <div className="text-red-600">
                        Nama varian wajib diisi
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="flex justify-between">
                      <Form.Label className="mr-5 text-lg font-medium">
                        Kode
                      </Form.Label>
                      <Form.Control
                        className="border border-black focus:outline-none px-2 py-1"
                        {...register(`variants.${idx}.sku`, {
                          required: true,
                        })}
                      />
                    </div>
                    {formErrors.variants?.[idx]?.sku && (
                      <div className="text-red-600">
                        Kode varian wajib diisi
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="flex justify-between">
                      <Form.Label className="mr-5 text-lg font-medium">
                        Stok
                      </Form.Label>
                      <Form.Control
                        className="border border-black focus:outline-none px-2 py-1"
                        {...register(`variants.${idx}.stock`, {
                          required: true,
                        })}
                      />
                    </div>
                    {formErrors.variants?.[idx]?.stock && (
                      <div className="text-red-600">
                        Stok varian wajib diisi
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="mr-5 text-lg font-medium">
                      Gambar varian
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      {...register(`variants.${idx}.image`)}
                    />
                  </Form.Group>
                </div>
              ))}

              <Button
                className="mt-3"
                variant="secondary"
                onClick={() => append({ name: '', sku: '', image: null })}
              >
                Tambah Varian
              </Button>

              {submitErrorMsg && (
                <div className="text-sm text-red-600 mt-3">
                  {submitErrorMsg}
                </div>
              )}

              <Button
                className="bg-black flex items-center p-2 text-white cursor-pointer mt-3"
                onClick={handleSubmit(onSubmit)}
              >
                Simpan
              </Button>
            </Form>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default CreateProductPage
