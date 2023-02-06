import Head from 'next/head';
import Time from '../components/Time';
import Header from '../components/Header';
import useSWR from 'swr';
// import styles from '@/styles/Home.module.css'

export default function Home() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: times, mutate, error } = useSWR('/api/times', fetcher);
  
  if (error) return <h1>Something went wrong!</h1>
  // if (!times) return "Loading...";

  return (
      <div>
        <Head>
          <title>Habites - Control Your Time</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="">
          <div className="my-12">
            <Header title="Times Everyday" subtitle="Create and browse times you post everyday" />
          </div>
          
          {times &&
              times.map((time) => (
                <Time
                    key={time.id}
                    time={time}
                    timeDeleted={mutate}
                />
              ))
          }
        </main>
      </div>
  );
}

// export const getServerSideProps = withPageAuthRequired();