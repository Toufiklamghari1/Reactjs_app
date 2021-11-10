import Main from './components/MainComponent'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigureStore  } from './redux/configuerStore'
const store = ConfigureStore()
const App = () => {
    

    return (
        <Provider store = {store} >
            <BrowserRouter>
                <div>
                    <Main />
                </div>
            </BrowserRouter>
        </Provider>
    )
}

export default App
