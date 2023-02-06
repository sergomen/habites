import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {
    const {user, isLoading} = useUser();
	return (
    <nav>
		  <Link href="/" className="text-2xl mb-2 block text-center text-red-700 uppercase">
		    Times Everyday
		  </Link>
		  <div className="flex space-x-3 justify-center mb-6 m-x-auto">
		    {/* <Link href="/snippets/html" className="text-red-400 hover:underline">
		        Dashboard
		    </Link> */}
		    {/* <Link href="/snippets/css" className="text-red-400 hover:underline">
		        About
		    </Link> */}
            {!isLoading && !user && (
            <Link href="/api/auth/login" className="text-red-400 hover:underline">
		      Login
            </Link>
            )}
            {!isLoading && user && (
                <>
                    <Link href="/myTimes" className="text-red-400 hover:underline">
                        My Times
                    </Link>
                    <Link href="/api/auth/logout" className="text-red-400 hover:underline">
                        Logout
                    </Link>
                </>
            )}
	    </div>
    </nav>
  )
}