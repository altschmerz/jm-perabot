import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { PiWarningCircleBold } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import UserRow from '../components/UserRow'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'
import { ADMIN_ROLE_TYPE_ID } from '../utils/constants'

const UserListPage = () => {
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

  const [search, setSearch] = useState('')

  const usersReq = useFromApi(fromApi.getUsers(search), [search])
  const users = useResourceMapper('safeUser', usersReq?.sortOrder)

  return (
    <Layout>
      <div className="section-title text-center my-3">Daftar User</div>

      <input
        type="email"
        placeholder="Cari berdasarkan nama atau username"
        className="w-full border border-black focus:outline-none px-2 py-1 mb-3"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <UserRow
            name={user?.name}
            username={user?.username}
            email={user?.email}
            phoneNumber={user?.phoneNumber}
            referralCode={user?.referralCode}
            onClick={() => navigate(`/users/${user?.id}`)}
          />
        ))}
      </div>
    </Layout>
  )
}

export default UserListPage
