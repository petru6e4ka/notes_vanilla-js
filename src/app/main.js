import 'assets/scss/main.scss';
import { service } from './db';
import NoteList from './components/NotesList/NoteList.model';
import CategoriesList from './components/CategoriesList/CategoriesList.model';
import Notification from './components/Notification/Notification.model';
import { NOTES } from './events/names';

class App {
	constructor() {
		this.notifications = new Notification();
		this.serviceInit();
		this.initialDataRequest();
		this.notesListInit();
		this.categoriesListInit();
		this.notesListActions();
		this.noteActions();
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

	notesListActions() {
		this.noteList.events.subscribe(
			NOTES.ARCHIVE_ALL,
			this.categoriesDataReset.bind(this)
		);
		this.noteList.events.subscribe(
			NOTES.DELETE_ALL,
			this.categoriesDataReset.bind(this)
		);
	}

	noteActions() {
		this.noteList.list.forEach((note) => {
			note.events.subscribe(
				NOTES.ARCHIVE_ID,
				this.categoriesDataUpdate.bind(this)
			);

			note.events.subscribe(
				NOTES.DELETE_ID,
				this.categoriesDataReset.bind(this)
			);
		});
	}

	categoriesDataUpdate(patch) {
		const note = this.notesData.find((note) => note.id === patch.id);

		Object.assign(note, patch);
		this.categoriesDataReset(this.notesData);
	}

	categoriesDataReset(data) {
		this.notesData = data;
		this.categoriesList.list.forEach((category) => {
			category.remove();
		});
		this.categoriesListInit();
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
