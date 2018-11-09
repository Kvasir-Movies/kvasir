import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Redirect} from 'react-router';

export default function SignupPage(): JSX.Element {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signedUp, setSignedUp] = useState(false);

	function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log("email: ", email)
		console.log("password: ", password)
		fetch('/signup', {
			method: 'POST',
			body: JSON.stringify({email, password}),
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			}
		})
		.then((response) => {
			if (response.status === 200) {
				return response.json();
			} else {
				throw new Error(`Login failed: ${response.status} ${response.statusText || ''}`);
			}
		})
		.then(() => setSignedUp(true))
		.catch((errorMessage) => alert(errorMessage));
	}

	function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
		setEmail(e.target.value);
	}

	function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
		setPassword(e.target.value);
	}

	return signedUp ? (<Redirect to='/' />) : (
		<form onSubmit={handleOnSubmit} >
			Email: <input type="text" name="email" onChange={handleEmailChange} /><br/>
			Password: <input type="text" name="password" onChange={handlePasswordChange} /><br/>
			<input type="submit" value="Submit" /><br/>
		</form>
	);
}