import Head from 'next/head';
import { getTimeById } from '../../utils/Fauna';
import TimeForm from '../../components/TimeForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Home({ time }) {
    return (
        <div>
            <Head>
                <title>Update Time</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="max-w-lg mx-auto">
                <h1 className="text-red-700 text-2xl mb-4">
                    Update Time
                </h1>
                <TimeForm timer={time} />
            </main>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(context) {
        try {
            const id = context.params.id;
            // console.log("IDD", id)
            const time = await getTimeById(id)
            return {
                props: {time},
            };
        } catch (error) {
            console.error(error);
            context.res.statusCode = 302;
            context.res.setHeader('Location', '/');
            return { props: {} };
        }
    }
})