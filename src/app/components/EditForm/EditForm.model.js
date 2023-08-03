import view from './EditForm.view';
import EventEmitter from '../../events/emitter';
import Notification from '../Notification/Notification.model';
import { NOTES } from '../../events/names';
import { service } from '../../db';

export class EditForm {
	constructor(note, root) {
		this.note = note;
		this.root = root;
		this.view = view(this.note);
		this.service = service;
		this.events = new EventEmitter();
		this.notifications = new Notification();

		this.render();
	}

	render() {
		if (this.root) {
			this.root.insertAdjacentHTML('afterend', this.view);
		}

		const form = document.querySelector(`[data-edit-form="${this.note.id}"]`);

		if (form) {
			this.form = form;
		}

		this.addCategoriesChange();
		this.addSaving();
	}

	addCategoriesChange() {
		const categories = document.querySelector(
			`[data-edit-form="${this.note.id}"] [data-category="radio"]`
		);

		if (categories) {
			this.categories = categories;
			this.categories.addEventListener(
				'click',
				this.onCheckCategory.bind(this)
			);
		}
	}

	onCheckCategory(event) {
		const target =
			event.target.type === 'radio'
				? event.target
				: event.target.querySelector('input');
		const name = target.name;
		const value = target.value;
		this[name] = value;
		const categories = this.categories.querySelectorAll(
			'input[type="radio"][name="category"]'
		);

		Array.from(categories).forEach((elem) => {
			elem.removeAttribute('checked');
		});
		target.setAttribute('checked', '');
	}

	addSaving() {
		const saveButton = document.querySelector(
			`button[data-save="${this.note.id}"]`
		);

		if (saveButton) {
			this.saveButton = saveButton;
			this.saveButton.addEventListener('click', this.dataProducing.bind(this));
		}
	}

	dataProducing(event) {
		event.preventDefault();

		const formData = new FormData(this.form);
		const name = formData.get('name');
		const content = formData.get('content');
		const category = formData.get('category');
		const patchData = {};

		if (name) {
			patchData.title = name;
		}

		if (content) {
			patchData.content = content;
		}

		if (category && this.note.category !== category) {
			patchData.category = category;
		}

		if (Object.keys(patchData).length > 0) {
			this.onSave(patchData);
		}
	}

	onSave(payload) {
		try {
			const updated = this.service.notes.editById(this.note.id, payload);
			this.notifications.render({ text: 'The note is successfully updated' });
			this.events.emit(NOTES.SAVE_ID, updated);

			this.remove();
			this.clear();
		} catch (err) {
			this.notifications.render({
				text: "Couldn't save the changes. Please, try later",
				status: 'error',
			});
		}
	}

	clear() {
		this.note = {};
		this.root = null;
		this.view = null;
		this.service = null;
		this.events = null;
		this.notifications = null;
		this.form = null;
		this.categories = null;
		this.saveButton = null;
	}

	remove() {
		if (this.saveButton) {
			this.saveButton.removeEventListener(
				'click',
				this.dataProducing.bind(this)
			);
		}

		if (this.form) {
			this.form.removeEventListener('click', this.onCheckCategory.bind(this));
			this.form.remove();
		}
	}
}

export default EditForm;
