import icon from '../Icon/Icon.view';

export const view = ({ title, id, active = 0, archived = 0 }) => {
	//if (!active && !archived) return '';

	return `
    <article class="note" data-category=${id}>
      <div class="note__name table__col table__col--max">
        <div class="note__icon">${icon(title)}</div>
        <div class="note__title">${title}</div>
      </div>
      <div class="category__active table__col table__col--max">${active}</div>
      <div class="category__archived table__col table__col--max">${archived}</div>
    </article>
    `;
};

export default view;
