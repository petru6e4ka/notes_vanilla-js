import view from './Notification.view';

export class Notification {
	render({ text, status }) {
		const id = Date.now();

		document.body.insertAdjacentHTML('beforeend', view({ text, status, id }));
		setTimeout(this.remove.bind(this, id), 1000 * 3);
	}

	remove(id) {
		const notif = document.querySelector(`[data-notification="${id}"]`);

		if (notif) {
			notif.remove();
		}
	}
}

export default Notification;
