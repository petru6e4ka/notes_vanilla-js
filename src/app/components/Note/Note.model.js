import { view } from './Note.view';
import EventEmitter from '../../events/emitter';
import Notification from '../Notification/Notification.model';
import { NOTES } from '../../events/names';
import { service } from '../../db';

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
	}

	render() {
		this.root.insertAdjacentHTML('afterbegin', this.view);
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
		} catch (error) {
			console.log(error);
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
			this.remove();
			this.clear();
		} catch (error) {
			console.log(error);
			this.notifications.render({
				status: 'error',
				text: "Couldn't archive the note, please, try later",
			});
		}
	}

	clear() {
		this.note = null;
		this.root = null;
		this.isActive = null;
		this.view = null;
		this.service = null;
		this.events = null;
		this.notifications = null;

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
	}
}

export default Note;
