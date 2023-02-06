import { deleteTime, getTimeById } from '../../utils/Fauna';
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(req, res) {
    const session = await getSession(req, res);
    const userId = session.user.sub;

    if (req.method != 'DELETE') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    const { id } = req.body;
    const existingRecord = await getTimeById(id);

    if(!existingRecord || existingRecord.data.userId !== userId) {
        res.statusCode = 404;
        return res.json({msg: 'Record not found.'})
    }
    try {
        const deleted = await deleteTime(id);
        return res.status(200).json(deleted);
    } catch (err) {
        console.error(err);
    }
});