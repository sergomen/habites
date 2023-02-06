import Head from 'next/head';
import TimeForm from '../components/TimeForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function New() {
    return (
        <div>
            <Head>
                <title>Create Next Time</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="max-w-lg mx-auto">
                <h1 className="text-red-600 text-2xl mb-4">New Time</h1>
                <TimeForm />
            </main>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired();