import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function Header({title, subtitle}) {
    const { user, isLoading } = useUser();
    return (
        <header className="my-2">
            <h1 className="text-red-800 text-2xl">{title}</h1>
            {subtitle &&
                <p className="text-red-900">{subtitle}</p>
            }

            {!isLoading && user &&
                <Link href="/new" className="mt-3 inline-block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Create Time
                </Link>
            }
            {!isLoading && !user &&
                <Link href="/api/auth/login" className="mt-3 inline-block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login to Create Time
                </Link>
            }
        </header>
    )
}