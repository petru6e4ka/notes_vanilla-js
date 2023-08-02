import view from './Category.view';

export class Category {
	constructor(category, root) {
		this.category = category;
		this.root = root;
		this.view = view(category);

		this.render();
	}

	render() {
		this.root.insertAdjacentHTML('afterbegin', this.view);
	}

	remove() {
		const elem = document.querySelector(
			`[data-category="${this.category.id}"]`
		);

		if (elem) {
			elem.remove();
		}
	}
}

export default Category;
