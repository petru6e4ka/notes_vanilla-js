import { view } from './Note.view';

export class Note {
	constructor(note, root) {
		this.note = note;
		this.root = root;
		this.view = view(this.note);

		this.render();
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
}

export default Note;
