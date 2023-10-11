'use client';

import React from 'react';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/features/user/userSlice';
import { resetUser } from '@/redux/features/user/userSlice';
import axios from 'axios';

export default function Logout() {
	const storeUser = useAppSelector(selectUser);

	const dispatch = useAppDispatch();

	const handleLogout = async () => {
		await axios.delete('/api/users/logout');

		dispatch(resetUser());
	};

	return (
		<button
			style={{ position: 'absolute', top: 20, left: 20 }}
			onClick={handleLogout}
			type='button'
			className='inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]'
		>
			Sign-Out
		</button>
	);
}
