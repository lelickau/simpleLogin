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

// 852963741
export async function singUp(singupEmail, singupPassword, singupNickname, singupFirstName, singupLastName, singupPhone, singupGenderOrientation, singupCountry, singupCity, singupDateOfBirth) {
	const birthDay = singupDateOfBirth.split('.');
	try {
		const response = await axios.post('/auth/signup', JSON.stringify({
			email: singupEmail,
			password: singupPassword,
			nickname: singupNickname,
			first_name: singupFirstName,
			last_name: singupLastName,
			phone: singupPhone,
			gender_orientation: singupGenderOrientation,
			city: singupCountry,
			country: singupCity,
			date_of_birth_day: birthDay[0],
			date_of_birth_month: birthDay[1],
			date_of_birth_year: birthDay[2],
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