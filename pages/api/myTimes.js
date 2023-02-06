import { getTimesByUser } from '../../utils/Fauna';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
    const session = await getSession(req, res);

    if (req.method !== 'GET') {
        return res.status(405);
    }
    try {
        const times = await getTimesByUser(session.user.sub);
        return res.status(200).json(times);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Something went wrong.' });
    }
});