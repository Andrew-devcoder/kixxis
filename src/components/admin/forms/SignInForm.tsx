'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignInForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await signIn('credentials', {
			email,
			password,
			callbackUrl: '/admin/dashboard',
		});
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-2xl mb-4">Admin Login</h1>

			<form onSubmit={onSubmit} className="flex flex-col gap-4 w-80">
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="border p-2"
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="border p-2"
				/>
				<button type="submit" className="bg-black text-white p-2">
					Sign In
				</button>
			</form>
		</div>
	);
}
