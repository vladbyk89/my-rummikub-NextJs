'use client';

//NextJs
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import React from 'react';

import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/user/userSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProfileLink() {
	const router = useRouter();

	const dispatch = useAppDispatch();

	const [currrentUser, setCurrentUser] = useState({
		username: '',
		email: '',
	});

	useEffect(() => {
		const getUserData = async () => {
			const { data } = await axios.get('/api/users/userData');

			// if user cookie doesn't exist don't do anything ()
			if (!data.ok) return;

			const user = {
				username: data.user.username,
				email: data.user.email,
			};

			setCurrentUser(user);
			dispatch(setUser(user));
		};

		getUserData();
	}, [dispatch]);

	return (
		<div
			className='userProfileLink'
			onClick={() =>
				router.push(
					currrentUser.username
						? `/profile/${currrentUser.username}`
						: '/login'
				)
			}
		>
			<Icon icon='ei:user' className='linkIcon' />
		</div>
	);
}
