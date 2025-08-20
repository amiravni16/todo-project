import { RootCmp } from './RootCmp.jsx'
import { store } from './store/store.js'

const elContainer = document.getElementById('root')
const root = ReactDOM.createRoot(elContainer)
root.render(
    <ReactRedux.Provider store={store}>
        <RootCmp />
    </ReactRedux.Provider>
)
