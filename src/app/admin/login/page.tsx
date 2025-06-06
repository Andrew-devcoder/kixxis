import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

import SignInForm from '@/components/admin/forms/SignInForm';

export default async function AdminPage() {
	const session = await getServerSession(authOptions);

	if (session) redirect('/admin/dashboard');

	return <SignInForm />;
}
