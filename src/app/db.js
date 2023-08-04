let notesData = [
	{
		id: 1,
		category: 'Task',
		title: 'Shopping list',
		createdDate: new Date('04/20/2021').toISOString(),
		content: ['Tomatoes', 'Bread'],
		active: true,
	},
	{
		id: 2,
		category: 'Random thought',
		title: 'Theory of evolution',
		createdDate: new Date('04/20/2021').toISOString(),
		content: 'The evolution Lorem ipsum',
		active: true,
	},
	{
		id: 3,
		category: 'Idea',
		title: 'New Feature',
		createdDate: new Date('05/07/2021').toISOString(),
		content:
			"Implement new feature 03/05/2021, Lorem ipsum dolor 05/05/2021 I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
		active: true,
	},
	{
		id: 4,
		category: 'Quote',
		title: 'William Gaddis',
		createdDate: new Date('05/07/2021').toISOString(),
		content: "Power doesn't corrupt people, people corrupt power",
		active: true,
	},
	{
		id: 5,
		category: 'Task',
		title: 'Books',
		createdDate: new Date('05/17/2021').toISOString(),
		content: 'The lean startup',
		active: true,
	},
	{
		id: 6,
		category: 'Task',
		title: 'Books',
		createdDate: new Date('05/17/2021').toISOString(),
		content: 'The lean startup',
		active: false,
	},
];

const categoriesData = [
	{
		id: 1,
		title: 'Task',
	},
	{
		id: 2,
		title: 'Random thought',
	},
	{
		id: 3,
		title: 'Idea',
	},
	{
		id: 4,
		title: 'Quote',
	},
];

const notes = () => {
	return {
		getAll: () => notesData,

		getById: (id) => {
			const note = notesData.find((elem) => elem.id === id);

			if (!note) {
				throw Error('The id is invalid');
			}

			return note;
		},

		editById: (id, data) => {
			const note = notesData.find((elem) => elem.id === id);

			if (!note) {
				throw Error('The id is invalid');
			}

			Object.assign(note, data);
			return note;
		},

		deleteById: (id) => {
			notesData = notesData.filter((elem) => elem.id !== id);

			return notesData;
		},

		archiveById: (id) => {
			const note = notesData.find((elem) => elem.id === id);

			if (!note) {
				throw Error('The id is invalid');
			}

			note.active = false;

			return note;
		},

		unArchiveById: (id) => {
			const note = notesData.find((elem) => elem.id === id);

			if (!note) {
				throw Error('The id is invalid');
			}

			note.active = true;

			return note;
		},

		deleteAll: () => {
			notesData = [];

			return notesData;
		},

		archiveAll: () => {
			notesData.forEach((elem) => (elem.active = false));

			return notesData;
		},

		addNew: (note) => {
			const newNote = {
				...note,
				id: Date.now(),
				createdDate: new Date().toISOString(),
				active: true,
			};

			notesData.push(newNote);

			return newNote;
		},
	};
};

const categories = () => {
	return {
		getAll: () => categoriesData,
	};
};

export const service = {
	notes: notes(),
	categories: categories(),
};
