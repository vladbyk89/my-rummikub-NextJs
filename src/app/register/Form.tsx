'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, SetStateAction, useEffect, useState } from 'react';

// Style
import '../styles/Login/style.scss';

export default function Form() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	// Use State
	const [newUser, setNewUser] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [buttonDisabled, setButtonDisabled] = useState(true);

	const handleSignIn = async (e: FormEvent) => {
		try {
			e.preventDefault();
			setIsLoading(true);

			await axios.post('/api/users/register', newUser);

			router.push('/login');
		} catch (error: any) {
			console.log('Register failed', error.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (
			newUser.email.length > 5 &&
			newUser.username.length > 5 &&
			newUser.password.length > 5
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [newUser]);

	return (
		<>
			{isLoading ? (
				<h1 className='formTitle'>Processing...</h1>
			) : (
				<>
					<h2 className='formTitle'>Sign up to create account</h2>
					<p className='noAccountText'>
						Already have an account?{' '}
						<Link className='link' href='/login'>Sign-In</Link>
					</p>
				</>
			)}
			<form onSubmit={handleSignIn} className='loginForm'>
				<div>
					<div>
						<label htmlFor='userName'> UserName </label>
						<div style={{ marginTop: '.5rem' }}>
							<input
								type='text'
								placeholder='JohnDoe123'
								id='userName'
								value={newUser.username}
								onChange={(e) =>
									setNewUser({
										...newUser,
										username: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div>
						<label htmlFor='email'> Email address </label>
						<div style={{ marginTop: '.5rem' }}>
							<input
								type='email'
								placeholder='john_doe@gmail.com'
								id='email'
								value={newUser.email}
								onChange={(e) =>
									setNewUser({
										...newUser,
										email: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<label htmlFor='password'> Password </label>
						</div>
						<div style={{ marginTop: '.5rem' }}>
							<input
								type='password'
								placeholder='***********'
								id='password'
								value={newUser.password}
								onChange={(e) =>
									setNewUser({
										...newUser,
										password: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<button
						disabled={buttonDisabled}
						style={{
							cursor: buttonDisabled ? 'not-allowed' : 'pointer',
							marginTop: '.5rem',
						}}
					>
						Create Account{' '}
						<ArrowRight style={{ marginLeft: '.5rem' }} size={16} />
					</button>
				</div>
			</form>
		</>
	);
}
