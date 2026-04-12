import { FaWhatsapp } from 'react-icons/fa'
import Footer from '../Footer'
import Navbar from '../Navbar'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="px-3 pb-3 flex-grow">{children}</div>
      <a
        href="https://wa.me/62811630256"
        target="_blank"
        rel="noopener noreferrer"
        className="
          fixed bottom-3 right-3
          z-50
          flex items-center gap-2
          bg-green-500 hover:bg-green-600
          text-white
          px-3 py-2
          rounded-full
          shadow-lg
          text-xs font-medium
        "
      >
        <FaWhatsapp size={25} />
        Chat WA
      </a>
      <Footer />
    </div>
  )
}

export default Layout
