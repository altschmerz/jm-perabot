import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Native/SearchBar";

const TABS = [
  { label: "New In", path: "new-in" },
  { label: "Sale", path: "sale" },
  { label: "Explore", path: "explore" },
];

const Navbar = () => {
  // const [selected, setSelected] = useState();

  return (
    <div class="sticky top-0 z-50">
      <div class="title flex justify-center bg-zinc-100 p-5">UNTITLED</div>
      <div class="flex justify-between items-center bg-white px-5 py-2">
        <div class="flex justify-between">
          {TABS.map((tab) => (
            <div
              key={tab.label}
              class="hover:border-b-2 hover:border-black cursor-pointer"
            >
              <Link to={tab.path} class="px-5 uppercase">
                {tab.label}
              </Link>
            </div>
          ))}
        </div>
        <SearchBar />
      </div>
    </div>
  );
};

export default Navbar;
