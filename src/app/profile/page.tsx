'use client';

import axios from 'axios';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
	const router = useRouter();

	useEffect(() => {
		const getUserData = async () => {
			const { data } = await axios.get('/api/users/userData');
			console.log(data);

			const userName = await data.user.username;

			console.log(userName);
			router.push(`profile/${userName}`);
		};

		getUserData();
	}, [router]);
	return <h1>Profile</h1>;
}
