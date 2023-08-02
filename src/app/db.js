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
];

const categories = [
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
