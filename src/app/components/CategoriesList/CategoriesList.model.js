import Category from '../Category/Category.model';

export class CategoriesList {
	constructor(categories, root) {
		this.categories = categories;
		this.root = root;

		this.list = this.categories.map((category) => {
			return new Category(category, root);
		});
	}
}

export default CategoriesList;
