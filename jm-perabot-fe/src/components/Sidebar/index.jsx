import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { FaChevronDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate()

  return (
    <Transition show={isOpen}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <TransitionChild
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-y-0 left-0 flex max-w-full">
          <TransitionChild
            enter="transform transition ease-in-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="w-64 bg-white p-6 shadow-xl">
              <Disclosure>
                <DisclosureButton className="group flex justify-between items-center w-full">
                  <div className="font-medium">User</div>
                  <FaChevronDown className="group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel>
                  <div
                    className="text-sm mt-2"
                    onClick={() => navigate('/users')}
                  >
                    Daftar User
                  </div>
                  <div
                    className="text-sm mt-2"
                    onClick={() => navigate('/referral/assign')}
                  >
                    Buat Kode Referal
                  </div>
                </DisclosurePanel>
              </Disclosure>

              <Disclosure>
                <DisclosureButton className="group flex justify-between items-center w-full mt-3">
                  <div className="font-medium">Kategori</div>
                  <FaChevronDown className="group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="text-sm">
                  <div
                    className="text-sm mt-2"
                    onClick={() => navigate('/categories/add')}
                  >
                    Tambah Kategori
                  </div>
                </DisclosurePanel>
              </Disclosure>

              <Disclosure>
                <DisclosureButton className="group flex justify-between items-center w-full mt-3">
                  <div className="font-medium">Produk</div>
                  <FaChevronDown className="group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="text-sm">
                  <div
                    className="text-sm mt-2"
                    onClick={() => navigate('/products/add')}
                  >
                    Tambah Produk
                  </div>
                </DisclosurePanel>
              </Disclosure>

              <Disclosure>
                <DisclosureButton className="group flex justify-between items-center w-full mt-3">
                  <div className="font-medium">Transaksi</div>
                  <FaChevronDown className="group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="text-sm">
                  <div
                    className="text-sm mt-2"
                    onClick={() => navigate('/transactions/add')}
                  >
                    Buat Transaksi
                  </div>
                </DisclosurePanel>
                <DisclosurePanel className="text-sm">
                  <div
                    className="text-sm mt-2"
                    onClick={() => navigate('/transactions')}
                  >
                    Daftar Transaksi
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Sidebar
