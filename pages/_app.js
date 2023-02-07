import '@/styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
  <UserProvider loginUrl="https://habites.netlify.app/api/auth/login" profileUrl="https://habites.netlify.app/api/auth/me">
    <div className="w-full p-10 min-h-screen">
			<div className="max-w-2xl mx-auto">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </div>
  </UserProvider>
  )
}
