export const categories = {
	Task: 'Task',
	Thought: 'Random thought',
	Idea: 'Idea',
	Quote: 'Quote',
};

export const icon = (category) => {
	switch (category) {
		case categories.Task:
			return '<i class="fa-solid fa-cart-shopping"></i>';

		case categories.Thought:
			return '<i class="fa-solid fa-head-side-virus"></i>';

		case categories.Idea:
			return '<i class="fa-solid fa-lightbulb"></i>';

		case categories.Quote:
			return '<i class="fa-solid fa-quote-left"></i>';

		default:
			return '';
	}
};

export default icon;
