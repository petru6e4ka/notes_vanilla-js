import { view } from './Note.view';

export class Note {
	constructor(note, root, isActive = true) {
		this.note = note;
		this.root = root;
		this.view = view(this.note, isActive);

		if (isActive && note.active) {
			this.render();
		}

		if (!isActive && !note.active) {
			this.render();
		}
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
