import axios from 'axios'
import { returnErrors } from './messages'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types'

//check tokn & Load user

export const loadUser = () => (dispatch, getState) => {
	//User loading
	dispatch({ type: USER_LOADING})

	axios.get('/api/auth/user', tokenConfig(getState)).then(res => {
		dispatch({
			type: USER_LOADED,
			payload: res.data
		})
		}).catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status))
			dispatch({
				type: AUTH_ERROR
			})
		})
}

//login user
export const login = (username, password) => (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	//request body

	const body = JSON.stringify({ username, password})
	console.log(username)
	console.log(password)
	axios
		.post('/api/auth/login', body, config)
		.then(res => {
		dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status))
			dispatch({
				type: LOGIN_FAIL
			})
		})
}

//register user
export const register = ({username, password, email}) => (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	//request body
	const body = JSON.stringify({ username, email, password })
	console.log(username)
	console.log(password)
	axios
		.post('/api/auth/register', body, config)
		.then(res => {
		dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status))
			dispatch({
				type: REGISTER_FAIL
			})
		})
}


//logout user
export const logout = () => (dispatch, getState) => {


	axios.post('/api/auth/logout', null, tokenConfig(getState)).then(res => {
		dispatch({
			type: LOGOUT_SUCCESS,
			payload: res.data
		})
		}).catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status))

		})
}


//setup config with token - helper function
export const tokenConfig = getState => {
		//get token
		const token = getState().auth.token

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		if (token) {
			config.headers['Authorization'] = `Token ${token}`;
		}

		return config
}