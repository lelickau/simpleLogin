const isTokenKey = 'my_app_token';

function setToken(req) {
	const isAuthUrl = req.url.includes('auth');
	if (!isAuthUrl) {
		const token = localStorage.getItem(isTokenKey);
		req.headers['x-access-token'] = token;
	}
	return req;
}

function setTokenOnLogin(res) {
	const isLoginUrl = res.config.url.includes('login');

	if (isLoginUrl) {
		const { token } = res.data;
		localStorage.setItem(isTokenKey, token);
	}

	return res;
}

function getClearResponce(res) {
	return res.data;
}

function onError(err) {
	console.dir(err);
	return Promise.reject(err);
}

export default function interceptors(axios) {
	axios.interceptors.request.use(setToken);
	axios.interceptors.response.use(setTokenOnLogin);
	axios.interceptors.response.use(getClearResponce, onError);
}