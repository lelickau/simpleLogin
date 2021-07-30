/* eslint-disable camelcase */
import axios from '../plugins/axios';

// denis.m.pcspace@gmail.com
// dmgame12345
/**
 * Function login / login request to API
 * @param {String} email
 * @param {String} password
 */
export async function login(email, password) {
	try {
		const response = await axios.post('/auth/login', JSON.stringify({
			email,
			password,
		}));
		console.log(response);
		return response.data;
	} catch (err) {
		// console.log(err);
		return Promise.reject(err);
	}
}

export async function singUp({
	email,
	password,
	nickname,
	first_name,
	last_name,
	phone,
	gender_orientation,
	city,
	country,
	date_of_birth_day,
	date_of_birth_month,
	date_of_birth_year,
}) {
	try {
		const response = await axios.post('/auth/signup', JSON.stringify({
			email,
			password,
			nickname,
			first_name,
			last_name,
			phone,
			gender_orientation,
			city,
			country,
			date_of_birth_day,
			date_of_birth_month,
			date_of_birth_year,
		}));
		console.log(response);
		return response;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
}

/*
email: "denis.m.pcspace@gmail.com",
password: "dmgame12345",
nickname: "dmgame",
first_name: "Denis",
last_name: "Mescheryakov",
phone: "0631234567",
gender_orientation: "male", // or "female"
city: "Kharkiv",
country: "Ukrane",
date_of_birth_day: 01,
date_of_birth_month: 03,
date_of_birth_year: 1989,
 */