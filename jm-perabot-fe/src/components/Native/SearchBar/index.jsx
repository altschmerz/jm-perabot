import React from 'react'
import { MdSearch } from 'react-icons/md'

const SearchBar = () => {
  return (
    <div>
      <div className="flex">
        <input
          placeholder="Search"
          className="border border-black focus:outline-none px-3"
        />
        <div className="bg-black flex items-center p-2">
          <MdSearch color="white" size={25} />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
