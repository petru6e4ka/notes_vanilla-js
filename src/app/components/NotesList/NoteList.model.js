import Note from '../Note/Note.model';

export class NoteList {
	constructor(notes, root) {
		this.notes = notes;
		this.root = root;

		this.list = this.notes.forEach((note) => {
			new Note(note, root);
		});
	}
}

export default NoteList;
