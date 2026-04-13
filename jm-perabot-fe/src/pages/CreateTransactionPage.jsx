import { useEffect, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PiWarningCircleBold } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import { ADMIN_ROLE_TYPE_ID } from '../utils/constants'
import formatPrice from '../utils/formatPrice'

const CreateTransactionPage = () => {
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

  const { register, control, formState, watch, setValue, handleSubmit } =
    useForm()
  const formErrors = formState.errors

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'transactionItems',
  })

  const transactionItemsString = JSON.stringify(
    watch('transactionItems') ? watch('transactionItems') : [],
  )

  useEffect(() => {
    const transactionItems = JSON.parse(transactionItemsString)
    let transactionTotal = 0

    transactionItems?.forEach((item, idx) => {
      const calculatedTotal =
        (Number(item.quantity) || 0) * (Number(item.price) || 0)
      setValue(`transactionItems.${idx}.total`, calculatedTotal)
      transactionTotal += calculatedTotal
    })

    setValue('total', transactionTotal)
  }, [transactionItemsString, setValue])

  const [submitErrorMsg, setSubmitErrorMsg] = useState()

  const onSubmit = (data) => {
    setIsLoading(true)

    if (!data.transactionItems?.length)
      toast('Setiap transaksi harus memiliki minimal 1 item', {
        id: 'no-transaction-item',
        icon: <PiWarningCircleBold />,
        className: 'bg-yellow-100',
      })

    dispatch(fromApi.createTransaction(data))
      .then((res) => {
        navigate(`/transactions/${res?.data?.[0]?.id}`)
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
          <div className="section-title text-center mt-10">Buat Transaksi</div>
          <div className="mt-5">
            <Form>
              <Form.Group className="mb-3">
                <div className="flex justify-between">
                  <Form.Label className="mr-5 text-lg font-medium">
                    Nama
                  </Form.Label>
                  <Form.Control
                    className="border border-black focus:outline-none px-2 py-1"
                    {...register('buyerName', { required: 'Nama wajib diisi' })}
                  />
                </div>
                {formErrors.buyerName && (
                  <div className="text-xs text-red-600">
                    {formErrors.buyerName.message}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="flex justify-between">
                  <Form.Label className="mr-5 text-lg font-medium">
                    Alamat
                  </Form.Label>
                  <Form.Control
                    className="border border-black focus:outline-none px-2 py-1"
                    {...register('deliveryAddress', { required: true })}
                  />
                </div>
                {formErrors.deliveryAddress && (
                  <div className="text-xs text-red-600">Alamat wajib diisi</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="flex justify-between">
                  <Form.Label className="mr-5 text-lg font-medium">
                    Nomor Telepon
                  </Form.Label>
                  <Form.Control
                    className="border border-black focus:outline-none px-2 py-1"
                    {...register('buyerPhoneNumber', { required: true })}
                  />
                </div>
                {formErrors.buyerPhoneNumber && (
                  <div className="text-xs text-red-600">
                    Nomor Telepon wajib diisi
                  </div>
                )}
              </Form.Group>

              {fields.map((field, idx) => (
                <div className="mt-3 border rounded-md p-3" key={field.id}>
                  <div className="mb-3 flex justify-between items-center">
                    <div className="text-xl font-bold">Item {idx + 1}</div>
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
                        {...register(`transactionItems.${idx}.name`, {
                          required: true,
                        })}
                      />
                    </div>
                    {formErrors.transactionItems?.[idx]?.name && (
                      <div className="text-xs text-red-600">
                        Nama item wajib diisi
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="flex justify-between">
                      <Form.Label className="mr-5 text-lg font-medium">
                        Jumlah
                      </Form.Label>
                      <Form.Control
                        className="border border-black focus:outline-none px-2 py-1"
                        {...register(`transactionItems.${idx}.quantity`, {
                          required: true,
                        })}
                      />
                    </div>
                    {formErrors.transactionItems?.[idx]?.quantity && (
                      <div className="text-xs text-red-600">
                        Jumlah item wajib diisi
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="flex justify-between">
                      <Form.Label className="mr-5 text-lg font-medium">
                        Harga Satuan
                      </Form.Label>
                      <Controller
                        control={control}
                        name={`transactionItems.${idx}.price`}
                        rules={{ required: true }}
                        render={({ field: { onChange, value, ref } }) => (
                          <Form.Control
                            ref={ref}
                            className="border border-black focus:outline-none px-2 py-1"
                            value={value ? formatPrice(value) : ''}
                            onChange={(e) => {
                              const rawValue = e.target.value.replace(/\./g, '')
                              const numberValue = Number(rawValue)
                              if (!isNaN(numberValue)) onChange(numberValue)
                            }}
                          />
                        )}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="flex justify-between">
                      <Form.Label className="mr-5 text-lg font-medium">
                        Keterangan
                      </Form.Label>
                      <Form.Control
                        className="border border-black focus:outline-none px-2 py-1"
                        as="textarea"
                        rows={3}
                        {...register(`transactionItems.${idx}.note`)}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <div className="flex justify-between">
                      <Form.Label className="mr-5 text-lg font-medium">
                        Subtotal
                      </Form.Label>
                      <Controller
                        control={control}
                        name={`transactionItems.${idx}.total`}
                        render={({ field: { value, ref } }) => (
                          <Form.Control
                            ref={ref}
                            className="px-2 py-1"
                            readOnly
                            value={value ? formatPrice(value) : 0}
                          />
                        )}
                      />
                    </div>
                  </Form.Group>
                </div>
              ))}

              <Form.Group className="mb-3">
                <div className="flex justify-between">
                  <Form.Label className="mr-5 text-lg font-medium">
                    Total
                  </Form.Label>
                  <Controller
                    control={control}
                    name={`total`}
                    rules={{ required: true }}
                    render={({ field: { value, ref } }) => (
                      <Form.Control
                        ref={ref}
                        className="px-2 py-1"
                        readOnly
                        value={value ? formatPrice(value) : 0}
                      />
                    )}
                  />
                </div>
              </Form.Group>

              <Button
                className="mt-3"
                variant="secondary"
                onClick={() =>
                  append({ name: '', quantity: '', price: '', note: '' })
                }
              >
                Tambah Item
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

export default CreateTransactionPage
