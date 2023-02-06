import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Time({ time }) {
    const { user } = useUser();
    return (
        <div className="bg-gray-100 p-4 rounded-md my-2 shadow-lg">
            <h2 className="text-xl text-green-600 font-bold">
                    {time.data.time}
                </h2>
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-xl text-gray-800 font-bold">
                        {time.data.task}
                    </h2>
                </div>
                <span className="font-bold text-xs text-red-800 px-2 py-1 rounded-lg">
                    {time.data.goal}
                </span>
            </div>
            <p className="text-gray-900 mb-4">{time.data.category}</p>
            {/* <Code code={time.data.task} /> */}
            {user && user.sub === time.data.userId && (
                <Link href={`/edit/${time.id}`} className="text-gray-800 mr-2">
                    Edit
                </Link>
            )}
        </div>
    )
}