import { updateTime, getTimeById } from '../../utils/Fauna';
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
    const session = await getSession(req, res);
    const userId = session.user.sub;
    
    if (req.method != 'PUT') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    const { id, time, task, goal, username, category } = req.body;
    const existingRecord = await getTimeById(id);

    if(!existingRecord || existingRecord.data.userId !== userId) {
        res.statusCode = 404;
        return res.json({msg: 'Record not found.'})
    }

    try {
        const updated = await updateTime(
            id,
            time,
            task,
            goal,
            username,
            category
        );
        return res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Something went wrong.' });
    }
});