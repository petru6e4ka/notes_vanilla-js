import { view, cancelButtonView, editButtonView } from './Note.view';
import EventEmitter from '../../events/emitter';
import Notification from '../Notification/Notification.model';
import { NOTES } from '../../events/names';
import { service } from '../../db';
import EditForm from '../EditForm/EditForm.model';

export class Note {
	constructor(note, root, isActive = true) {
		this.note = note;
		this.root = root;
		this.isActive = isActive;
		this.view = view(this.note, isActive);
		this.service = service;
		this.events = new EventEmitter();
		this.notifications = new Notification();

		if (isActive && note.active) {
			this.render();
		}

		if (!isActive && !note.active) {
			this.render();
		}

		this.archiveByIdInit();
		this.deleteByIdInit();
		this.editInit();
	}

	render() {
		this.root.insertAdjacentHTML('afterbegin', this.view);

		const element = document.querySelector(`[data-note="${this.note.id}"]`);

		if (element) {
			this.element = element;
		}
	}

	remove() {
		const elem = document.querySelector(`[data-note="${this.note.id}"]`);

		if (elem) {
			elem.remove();
		}
	}

	archiveByIdInit() {
		this.archiveButton = document.querySelector(
			`[data-archive='${this.note.id}']`
		);

		if (this.archiveButton) {
			this.archiveButton.addEventListener(
				'click',
				this.onArchiveById.bind(this)
			);
		}
	}

	onArchiveById() {
		try {
			const newNote = this.service.notes.archiveById(this.note.id);

			this.events.emit(NOTES.ARCHIVE_ID, newNote);
			this.notifications.render({
				text: 'Archived Note',
			});
			this.remove();
			this.note = newNote;
			this.view = view(this.note, this.isActive);
			this.form?.remove();
			this.form?.clear();
		} catch (error) {
			this.notifications.render({
				status: 'error',
				text: "Couldn't archive the note, please, try later",
			});
		}
	}

	deleteByIdInit() {
		this.deleteButton = document.querySelector(
			`[data-delete='${this.note.id}']`
		);

		if (this.deleteButton) {
			this.deleteButton.addEventListener('click', this.onDeleteById.bind(this));
		}
	}

	onDeleteById() {
		try {
			const updatedNotes = this.service.notes.deleteById(this.note.id);

			this.events.emit(NOTES.DELETE_ID, updatedNotes);
			this.notifications.render({
				text: 'Deleted Note',
			});
			this.form?.remove();
			this.form?.clear();
			this.remove();
			this.clear();
		} catch (error) {
			this.notifications.render({
				status: 'error',
				text: "Couldn't archive the note, please, try later",
			});
		}
	}

	editInit() {
		this.editButton = document.querySelector(`[data-edit='${this.note.id}']`);

		if (this.editButton) {
			this.editButton.addEventListener('click', this.onEdit.bind(this));
		}
	}

	onEdit() {
		this.form = new EditForm(this.note, this.element);
		this.form.events.subscribe(NOTES.SAVE_ID, this.onSave.bind(this));
		this.element.classList.add('note--active');

		this.cancelEditInit();
	}

	cancelEditInit() {
		this.editButton.remove();
		this.archiveButton.insertAdjacentHTML(
			'beforebegin',
			cancelButtonView(this.note.id)
		);

		const cancelButton = this.element.querySelector(
			`[data-cancel="${this.note.id}"]`
		);

		if (cancelButton) {
			this.cancelButton = cancelButton;
			this.cancelButton.addEventListener('click', this.onCancelEdit.bind(this));
		}
	}

	onCancelEdit() {
		this.element.classList.remove('note--active');
		this.cancelButton.remove();
		this.archiveButton.insertAdjacentHTML(
			'beforebegin',
			editButtonView(this.note.id)
		);

		const editButton = this.element.querySelector(
			`[data-edit="${this.note.id}"]`
		);

		if (editButton) {
			this.editButton = editButton;
			this.editButton.addEventListener('click', this.onEdit.bind(this));
		}

		this.form.remove();
		this.form.clear();
	}

	onSave(newNote) {
		this.note = newNote;
		this.view = view(this.note, this.isActive);

		this.remove();
		this.render();
		this.archiveByIdInit();
		this.deleteByIdInit();
		this.editInit();
		this.events.emit(NOTES.SAVE_ID, newNote);
	}

	clear() {
		this.note = {};
		this.root = null;
		this.isActive = null;
		this.view = null;
		this.service = null;
		this.events = null;
		this.notifications = null;
		this.element = null;

		if (this.archiveButton) {
			this.archiveButton.removeEventListener(
				'click',
				this.onArchiveById.bind(this)
			);
			this.archiveButton = null;
		}

		if (this.deleteButton) {
			this.deleteButton.removeEventListener(
				'click',
				this.onDeleteById.bind(this)
			);
			this.deleteButton = null;
		}

		if (this.editButton) {
			this.editButton.removeEventListener('click', this.onEdit.bind(this));
			this.editButton = null;
		}
	}
}

export default Note;
