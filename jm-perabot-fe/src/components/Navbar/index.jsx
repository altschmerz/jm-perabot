import React from 'react'
import SearchBar from '../Native/SearchBar'

// const TABS = [
//   { label: 'New In', path: 'new-in' },
//   { label: 'Sale', path: 'sale' },
//   { label: 'Explore', path: 'explore' },
// ]

const Navbar = () => {
  // const [selected, setSelected] = useState();

  return (
    <div className="sticky top-0 z-50">
      <div className="title flex justify-center bg-zinc-100 p-5">
        JM PERABOT
      </div>
      <div className="flex flex-row-reverse justify-between items-center bg-white px-5 py-2">
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
        <SearchBar />
      </div>
    </div>
  )
}

export default Navbar
