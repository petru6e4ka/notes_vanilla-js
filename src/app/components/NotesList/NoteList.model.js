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
			if (this.list) {
				const newNotes = this.service.notes.archiveAll();

				this.events.emit(NOTES.ARCHIVE_ALL);
				this.notifications.render({
					text: 'Archived all',
				});
				this.list.forEach((note) => note.remove());
				this.notes = newNotes;
				this.list = this.notes.forEach((note) => {
					new Note(note, this.root, this.isActive);
				});
			}
		} catch (error) {
			console.log(error);
			this.notifications.render({
				status: 'error',
				text: "Couldn't archive notes, please, try later",
			});
		}
	}
}

export default NoteList;
