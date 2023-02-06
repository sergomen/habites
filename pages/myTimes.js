import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import Time from '../components/Time';
import Header from '../components/Header';

export default function MyTimes() {
    const fetcher = (url) => fetch(url).then((res) => res.json());
  
    const { data: times, error } = useSWR('/api/myTimes', fetcher);

    if (error) return <h1>Something went wrong!</h1>

    return (
        <div>
            <Head>
                <title>My Times</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="">
                <div className="my-12">
                    <Header title="My Times" />
                </div>
                {times &&
                    times.length > 0 &&
                    times.map((time) => (
                        <Time key={time.id} time={time} />
                    ))}
                {!times ||
                    (times.length === 0 && (
                        <p className="text-red-200">
                            There are no times yet
                        </p>
                    ))}
                
            </main>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired();