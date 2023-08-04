import Note from '../Note/Note.model';
import EventEmitter from '../../events/emitter';
import Notification from '../Notification/Notification.model';
import { NOTES } from '../../events/names';
import { service } from '../../db';

export class NoteList {
	constructor(notes, root, isActive = true) {
		this.notes = notes;
		this.root = root;
		this.isActive = isActive;
		this.service = service;
		this.events = new EventEmitter();
		this.notifications = new Notification();

		this.list = this.notes.map((note) => {
			return new Note(note, root, isActive);
		});
		this.archiveAllInit();
		this.deleteAllInit();
	}

	archiveAllInit() {
		this.archiveAllButton = document.querySelector("[data-archive='all']");

		if (this.archiveAllButton) {
			this.archiveAllButton.addEventListener(
				'click',
				this.onArchiveAll.bind(this)
			);
		}
	}

	onArchiveAll() {
		try {
			if (this.list && this.isActive) {
				const newNotes = this.service.notes.archiveAll();

				this.events.emit(NOTES.ARCHIVE_ALL, newNotes);
				this.notifications.render({
					text: 'Archived all',
				});
				this.list.forEach((note) => {
					note.remove();
				});
				this.notes = newNotes;
			}
		} catch (error) {
			this.notifications.render({
				status: 'error',
				text: "Couldn't archive notes, please, try later",
			});
		}
	}

	deleteAllInit() {
		this.deleteAllButton = document.querySelector("[data-delete='all']");

		if (this.deleteAllButton) {
			this.deleteAllButton.addEventListener(
				'click',
				this.onDeleteAll.bind(this)
			);
		}
	}

	onDeleteAll() {
		try {
			const newNotes = this.service.notes.deleteAll();

			this.events.emit(NOTES.DELETE_ALL, newNotes);
			this.notifications.render({
				text: 'Deleted all',
			});
			this.list?.forEach((note) => {
				note.remove();
				note.clear();
			});
			this.notes = newNotes;
		} catch (error) {
			this.notifications.render({
				status: 'error',
				text: "Couldn't delete notes, please, try later",
			});
		}
	}

	filterActive() {
		this.list.map((elem) => {
			elem.remove();
			elem.isActive = true;
			elem.form?.remove();
			elem.form?.clear();
			elem.update(true);
		});
	}

	filterArchived() {
		this.list.map((elem) => {
			elem.remove();
			elem.isActive = false;
			elem.form?.remove();
			elem.form?.clear();
			elem.update(false);
		});
	}
}

export default NoteList;
