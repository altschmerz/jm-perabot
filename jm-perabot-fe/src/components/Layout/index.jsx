import Navbar from '../Navbar'

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="px-3 pb-3">{children}</div>
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
