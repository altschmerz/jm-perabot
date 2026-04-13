import { Spinner } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import TransactionRow from '../components/TransactionRow'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'

const TransactionListPage = () => {
  const navigate = useNavigate()

  const transactionsReq = useFromApi(fromApi.getTransactions())
  const transactions = useResourceMapper(
    'transaction',
    transactionsReq?.sortOrder,
  )

  return (
    <Layout>
      <div className="mt-3">
        {transactionsReq?.loading ? (
          <div className="flex flex-col items-center font-medium">
            <Spinner animation="border" variant="dark" />
            <div className="mt-2">Memuat...</div>
            <div>Mohon tunggu sebentar</div>
          </div>
        ) : (
          <div>
            <div className="section-title text-center mb-4">
              Daftar Transaksi
            </div>

            <div className="flex flex-col gap-2">
              {transactions.map(
                ({
                  id,
                  buyerName,
                  buyerPhoneNumber,
                  deliveryAddress,
                  total,
                  date,
                }) => (
                  <div key={id}>
                    <NavLink to={`/transactions/${id}`}>
                      <TransactionRow
                        buyerName={buyerName}
                        buyerPhoneNumber={buyerPhoneNumber}
                        deliveryAddress={deliveryAddress}
                        total={total}
                        date={date}
                        onClick={() => navigate(`/transactions/${id}`)}
                      />
                    </NavLink>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default TransactionListPage
