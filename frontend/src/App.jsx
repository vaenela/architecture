import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { router } from './routes'
import { store } from './stores/stores'
import './index.css'

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )
}

export default App