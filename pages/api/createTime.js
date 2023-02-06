import { createTime } from '../../utils/Fauna';
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
    const session = await getSession(req, res);
    console.log(session.user)
    const userId = session.user.sub;
    
    const { time, task, goal, username, category } = req.body;

    if (req.method != 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }
    try {
        const createdTime = await createTime(
            time, 
            task, 
            goal, 
            username, 
            category,
            userId
        );
        return res.status(200).json(createdTime)
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Something went wrong.' });
    }
})
