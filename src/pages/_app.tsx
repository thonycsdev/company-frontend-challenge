import HeaderComponent from '@/components/Header/HeaderComponent';
import { AuthProvider } from '@/context/authContext';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<ChakraProvider>
				<HeaderComponent />
				<Component {...pageProps} />
			</ChakraProvider>
		</AuthProvider>
	);
}
