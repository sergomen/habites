import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function TimeForm({ timer }) {
	const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            // date: time ? time.data.date : '',
            time: timer ? timer.data.time : '',
            task: timer ? timer.data.task : '',
            goal: timer ? timer.data.goal : '',
            // category: time ? time.data.category : '',
        },
        
    });
	const router = useRouter();

	const createTime = async (data) => {
        const { time, task, goal, username, category } = data;
		try {
			await fetch('/api/createTime', {
                method: 'POST',
                body: JSON.stringify({ time, task, goal, username, category }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
			router.push('/');
		} catch (err) {
			console.error(err);
		}
	};
	
	const deleteTime = async () => {
		try {
			await fetch('/api/deleteTime', {
				method: 'DELETE',
				body: JSON.stringify({ id: timer.id }),
				headers: {
                    'Content-Type': 'application/json',
				},
		});
		// timeDeleted();
        router.push('/')
        } catch (err) {
            console.error(err);
        }
    }

    const updateTime = async (data) => {
        const id = timer.id
        const { time, task, goal } = data;
		try {
            await fetch('/api/updateTime', {
                method: 'PUT',
                body: JSON.stringify({ time, task, goal, id }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            router.push('/');
		} catch (err) {
            console.error(err);
		}
    };

    return (
	<form onSubmit={handleSubmit(timer ? updateTime : createTime)}>
		<div className="mb-4">
			<label
                className="block text-red-700 text-sm font-bold mb-1"
                htmlFor="name"
			>
				Time
			</label>
			<input
                type="text"
                id="time"
                name="time"
                className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
                // Validation stuff
                {...register('time', { required: true })}
			/>
			{errors.time && (
                <p className="font-bold text-red-900">Name is required</p>
			)}
        </div>
        <div className="mb-4">
            <label
                className="block text-red-700 text-sm font-bold mb-1"
                htmlFor="task"
            >
                Task
            </label>
            <textarea
                name="task"
                id="task"
                rows="3"
                className="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                placeholder="Describe what you've done (unnecessary)"
                {...register('task', { required: false })}
            />
        </div>
        <div className="mb-4">
            <label
                className="block text-red-700 text-sm font-bold mb-1"
                htmlFor="goal"
            >
                Goal
            </label>
            <select
                id="goal"
                name="goal"
                className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
                {...register('goal', { required: true })}
            >
                <option className="py-1">Learning Programming</option>
                <option className="py-1">Learning English</option>
            </select>
            {errors.goal && (
                <p className="font-bold text-red-900">Name is required</p>
            )}
        </div>
        <button
            className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="submit"
        >
            Save
        </button>
        <Link href="/" className="mt-3 inline-block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"> 
            Cancel  
        </Link>
        {timer && (
            <button onClick={deleteTime} className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                Delete
            </button>
        )}
	</form>
    )
}