import React from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = () => {
  return (
    <div>
      <div class="flex">
        <input
          placeholder="Search"
          class="border border-black focus:outline-none px-3"
        />
        <div class="bg-black flex items-center p-2">
          <MdSearch color="white" size={25} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
