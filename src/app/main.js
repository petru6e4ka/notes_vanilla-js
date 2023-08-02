import 'assets/scss/main.scss';
import { service } from './db';
import NoteList from './components/NotesList/NoteList.model';
import CategoriesList from './components/CategoriesList/CategoriesList.model';

class App {
	constructor() {
		this.serviceInit();
		this.notesListInit();
		this.categoriesListInit();
	}

	serviceInit() {
		this.service = service;
	}

	notesListInit() {
		this.notesData = this.service.notes.getAll() || [];
		this.notesRoot = document.querySelector('#notes');

		if (this.notesData && this.notesRoot) {
			this.noteList = new NoteList(this.notesData, this.notesRoot);
		}
	}

	categoriesListInit() {
		this.categoriesData = this.service.categories.getAll() || [];
		this.categoriesRoot = document.querySelector('#categories');

		this.categoriesData = this.categoriesData.map((elem) => ({
			...elem,
			active: this.notesData.filter(
				(note) => note.active && note.category === elem.title
			).length,
			archived: this.notesData.filter(
				(note) => !note.active && note.category === elem.title
			).length,
		}));

		if (this.categoriesData && this.categoriesRoot) {
			this.categoriesList = new CategoriesList(
				this.categoriesData,
				this.categoriesRoot
			);
		}
	}
}

new App();
