import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import './App.css'
import Routes from './Routes'
import store from './store/store'

function App() {
  return (
    <Provider store={store}>
      <Routes />
      <Toaster />
    </Provider>
  )
}

export default App
