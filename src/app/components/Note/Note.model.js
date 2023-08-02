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
}

export default Note;
