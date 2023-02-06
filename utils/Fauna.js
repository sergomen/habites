const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET, domain: "db.fauna.com",});
const q = faunadb.query;
// console.log(faunaClient)

const getTimes = async () => {
	const { data } = await faunaClient.query(
		q.Reverse(q.Map(
			q.Paginate(q.Documents(q.Collection('times'))), 
			q.Lambda('ref', q.Get(q.Var('ref')))
		)
	));
	const times = data.map((time) => {
		time.id = time.ref.id
		delete time.ref
		return time
	});
	return times
};

const getTimeById = async (id) => {
	const time = await faunaClient.query(
        q.Get(q.Ref(q.Collection('times'), id))
    );
    time.id = time.ref.id;
    delete time.ref;
    return time;
};

const getTimesByUser = async (userId) => {
    const { data } = await faunaClient.query(
        q.Reverse(q.Map(
            q.Paginate(q.Match(q.Index('times_by_user'), userId)),
            q.Lambda('ref', q.Get(q.Var('ref')))
        )
    ));
    const times = data.map((time) => {
		time.id = time.ref.id
		delete time.ref
		return time
	});
	return times
};

const createTime = async (time, task, goal, username, category, userId) => {
    //Create a record in the collection of times
    return await faunaClient.query(
        q.Create(q.Collection('times'), {
            data: {time, task, goal, username, category, userId} 
        })
    );
};

const updateTime = async (id, time, task, goal, category) => {
	return await faunaClient.query(
        q.Update(q.Ref(q.Collection('times'), id), {
            data: { time, task, goal, category },
        })
    );
};

const deleteTime = async (id) => {
	return await faunaClient.query(
		q.Delete(q.Ref(q.Collection('times'), id))
)};

module.exports = {
	createTime,
	getTimes,
	getTimeById,
    getTimesByUser,
	updateTime,
	deleteTime,
};