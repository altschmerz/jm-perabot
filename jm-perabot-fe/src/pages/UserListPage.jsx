import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import fromApi from '../actions/fromApi'
import Layout from '../components/Layout'
import UserRow from '../components/UserRow'
import useFromApi from '../hooks/useFromApi'
import useResourceMapper from '../hooks/useResourceMapper'

const UserListPage = () => {
  const navigate = useNavigate()

  const usersReq = useFromApi(fromApi.getUsers())
  const users = useResourceMapper('safeUser', usersReq?.sortOrder)

  useEffect(() => console.log('USERS', users), [users])

  return (
    <Layout>
      <div className="section-title text-center my-3">Daftar User</div>

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
