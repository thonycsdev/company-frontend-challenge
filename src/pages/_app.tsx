import HeaderComponent from '@/components/Header/HeaderComponent';
import { AuthProvider } from '@/context/authContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<HeaderComponent />
			<Component {...pageProps} />
		</AuthProvider>
	);
}
