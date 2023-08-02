import 'assets/scss/main.scss';
import { service } from './db';
import NoteList from './components/NotesList/NoteList.model';
import CategoriesList from './components/CategoriesList/CategoriesList.model';
import Notification from './components/Notification/Notification.model';

class App {
	constructor() {
		this.notifications = new Notification();
		this.serviceInit();
		this.initialDataRequest();
		this.notesListInit();
		this.categoriesListInit();
	}

	serviceInit() {
		this.service = service;
	}

	initialDataRequest() {
		try {
			this.notesData = this.service.notes.getAll();
			this.categoriesData = this.service.categories.getAll();
		} catch (error) {
			this.notesData = [];
			this.categoriesData = [];
			this.notifications.render({
				status: 'error',
				text: 'The server is not responding, please, try later',
			});
		}
	}

	notesListInit() {
		this.notesRoot = document.querySelector('#notes');

		if (this.notesRoot) {
			this.noteList = new NoteList(this.notesData, this.notesRoot);
		}
	}

	categoriesListInit() {
		this.categoriesRoot = document.querySelector('#categories');
		this.categoriesData = this.bindNotesToCategories();

		if (this.categoriesRoot) {
			this.categoriesList = new CategoriesList(
				this.categoriesData,
				this.categoriesRoot
			);
		}
	}

	bindNotesToCategories() {
		return this.categoriesData.map((elem) => ({
			...elem,
			active: this.notesData.filter(
				(note) => note.active && note.category === elem.title
			).length,
			archived: this.notesData.filter(
				(note) => !note.active && note.category === elem.title
			).length,
		}));
	}
}

new App();
