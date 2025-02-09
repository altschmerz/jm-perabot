import React from 'react'
import Navbar from '../Navbar'

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="px-5">{children}</div>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
