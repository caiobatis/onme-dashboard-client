import { 
  createStore, 
  combineReducers, 
  applyMiddleware
} from "redux"
import rotateReducer from "./reducers/rotateReducer"
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import promise from 'redux-promise'

const rootReducer = combineReducers({
  rotateReducer,
  form: formReducer,
})

const middlewares = applyMiddleware(thunk, multi, promise)

const configureStore = () => createStore(rootReducer, middlewares)

export default configureStore