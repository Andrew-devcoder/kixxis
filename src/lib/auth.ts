import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import { compare } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/cocktail/admin/login',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'john@mail.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const existingUser = await prisma.user.findUnique({
					where: { email: credentials?.email },
				});
				if (!existingUser) {
					return null;
				}

				const passwordMatch = await compare(credentials.password, existingUser.password || '');

				if (!passwordMatch) {
					return null;
				}
				return {
					id: `${existingUser.id}`,
					name: existingUser.name,
					email: existingUser.email,
				};
			},
		}),
	],
};
