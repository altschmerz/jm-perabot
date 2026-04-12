import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ADMIN_ROLE_TYPE_ID } from '../../utils/constants'
import Sidebar from '../Sidebar'

// const TABS = [
//   { label: 'New In', path: 'new-in' },
//   { label: 'Sale', path: 'sale' },
//   { label: 'Explore', path: 'explore' },
// ]

const Navbar = () => {
  const navigate = useNavigate()

  const authUser = useSelector((state) => state.authUser)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // const [selected, setSelected] = useState();

  return (
    <div className="sticky top-0 z-50">
      <div className="relative title flex justify-center items-center bg-zinc-100 p-4">
        {authUser && authUser.role === ADMIN_ROLE_TYPE_ID && (
          <GiHamburgerMenu
            size={20}
            className="absolute left-4"
            onClick={() => setIsSidebarOpen(true)}
          />
        )}

        <div>JM PERABOT</div>

        <FaUser
          size={20}
          className="absolute right-4"
          onClick={() => (authUser ? navigate('/me') : navigate('/login'))}
        />
      </div>

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* <div className="flex flex-row-reverse justify-between items-center bg-white px-5 py-2"> */}
      {/* <div className="flex justify-between">
          {TABS.map((tab) => (
            <div
              key={tab.label}
              className="hover:border-b-2 hover:border-black cursor-pointer"
            >
              <Link to={tab.path} className="px-5 uppercase">
                {tab.label}
              </Link>
            </div>
          ))}
        </div> */}
      {/* <SearchBar /> */}
      {/* </div> */}
    </div>
  )
}

export default Navbar
