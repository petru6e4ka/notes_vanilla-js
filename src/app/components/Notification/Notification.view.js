export const view = ({ text, status, id }) => {
	switch (status) {
		case 'error':
			return `
				<div class="notification notification--error" data-notification="${id}">
					<h3 class="notification__title">${text}</h3>
				</div>
      `;

		default:
			return `
			<div class="notification" data-notification="${id}">
				<h3 class="notification__title">${text}</h3>
			</div>
      `;
	}
};

export default view;
