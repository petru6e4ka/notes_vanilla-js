import 'assets/scss/main.scss';
import { service } from './db';
import NoteList from './components/NotesList/NoteList.model';
import CategoriesList from './components/CategoriesList/CategoriesList.model';
import Notification from './components/Notification/Notification.model';
import Note from './components/Note/Note.model';
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
		this.modalInit();
		this.creatingNewInit();
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

			note.events.subscribe(
				NOTES.SAVE_ID,
				this.categoriesDataUpdate.bind(this)
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

	modalInit() {
		const modal = document.querySelector('#portal');
		const closeButton = document.querySelector('[data-modal="close"]');
		const overlay = document.querySelector('#modal_overlay');
		const modalContent = document.querySelector('#modal');

		if (modal) {
			this.modal = modal;
		}

		if (closeButton) {
			this.closeModalButton = closeButton;
			this.closeModalButton.addEventListener(
				'click',
				this.onCancelCreate.bind(this)
			);
		}

		if (overlay) {
			this.closeModalOverlay = overlay;
			this.closeModalOverlay.addEventListener(
				'click',
				this.onCancelCreate.bind(this)
			);
		}

		if (modalContent) {
			this.modalContent = modalContent;
			this.modalContent.addEventListener('click', (e) => e.stopPropagation());
		}
	}

	creatingNewInit() {
		const createButton = document.querySelector('[data-new="note"]');
		const createNewNoteForm = document.querySelector('#new-note-form');

		if (createButton) {
			this.createButton = createButton;
			this.createButton.addEventListener('click', this.onShowModal.bind(this));
		}

		if (createNewNoteForm) {
			this.createNewNoteForm = createNewNoteForm;
			this.createNewNoteForm.addEventListener(
				'submit',
				this.onCreate.bind(this)
			);
		}
	}

	onShowModal() {
		this.modal.classList.remove('hidden');
	}

	onCancelCreate() {
		this.modal.classList.add('hidden');
		this.createNewNoteForm.reset();
	}

	onCreate(event) {
		event.preventDefault();

		const formData = new FormData(this.createNewNoteForm);
		const title = formData.get('title');
		const content = formData.get('content');
		const category = formData.get('category');

		if (title && content && category) {
			this.onSaveCreated({ title, content, category });
		}
	}

	onSaveCreated(note) {
		try {
			const newNote = this.service.notes.addNew(note);

			this.notifications.render({
				text: 'The new note is successfully created',
			});
			this.onCancelCreate();
			this.categoriesDataReset(this.notesData);
			this.onUpdateNotesList(newNote);
		} catch (error) {
			this.notifications.render({
				status: 'error',
				text: "Couldn't archive the note, please, try later",
			});
		}
	}

	onUpdateNotesList(newNote) {
		const currentNote = new Note(newNote, this.notesRoot);
		this.noteList.list.push(currentNote);
		currentNote.events.subscribe(
			NOTES.ARCHIVE_ID,
			this.categoriesDataUpdate.bind(this)
		);

		currentNote.events.subscribe(
			NOTES.DELETE_ID,
			this.categoriesDataReset.bind(this)
		);

		currentNote.events.subscribe(
			NOTES.SAVE_ID,
			this.categoriesDataUpdate.bind(this)
		);
	}
}

new App();
