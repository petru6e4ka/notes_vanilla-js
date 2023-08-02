import mentionedDates from '../../utils/mentionedDates';
import datesFormat from '../../utils/datesFormat';
import icon from '../Icon/Icon.view';

export const view = ({
	id,
	category,
	title,
	createdDate,
	content,
	active,
	isActive = true,
}) => {
	const activeButtons =
		isActive && isActive === active
			? `
      <button class="button--outlined button--icon" data-edit="${id}">
        <i class="fa-solid fa-pen-to-square" data-edit="${id}"></i>
      </button>
      <button class="button--outlined button--icon" data-archive="${id}">
        <i class="fa-solid fa-download" data-archive="${id}"></i>
      </button>
      <button class="button--outlined button--icon" data-delete="${id}">
        <i class="fa-solid fa-trash" data-delete="${id}"></i>
      </button>
    `
			: `
      <button class="button--outlined button--icon" data-archive="${id}">
        <i class="fa-solid fa-upload" data-unarchive="${id}"></i>
      </button>
    `;

	return `
    <article class="note" data-note="${id}">
      <div class="note__name table__col table__col--min">
        <div class="note__icon">
          ${icon(category)}
        </div>
        <div class="note__title">${title}</div>
      </div>
      <div class="note__created table__col table__col--min">
        ${datesFormat(createdDate)}
      </div>
      <div class="note__category table__col table__col--min">${category}</div>
      <div class="note__content table__col table__col--max">
        ${content}
      </div>
      <div class="note__dates table__col table__col--min">${mentionedDates(
				content
			).join(', ')}</div>
      <div
        class="note__actions table__col table__col--min table__actions"
      >
        ${activeButtons}
      </div>
    </article>
  `;
};

export default view;
