import { categories } from '../Icon/Icon.view';

export const view = ({ id, title, category, content }) => {
	return `
    <form action="#" class="form" data-edit-form="${id}">
      <div class="form__col">
        <div class="form__field">
          <input
            type="text"
            name="name"
            id="name-${id}"
            class="form__input"
            placeholder="${title}"
          />
        </div>
        <div class="form__field">
          <textarea
            id="content-${id}"
            name="content"
            rows="5"
            cols="50"
            class="form__area"
            placeholder="${content}"></textarea>
        </div>
      </div>
      <div class="form__col" data-category="radio">
        <div class="form__field">
          <label for="task-${id}" class="form__radio-label">
            <input 
              type="radio" 
              name="category" 
              id="task-${id}" 
              value="${categories.Task}" 
              ${category === categories.Task ? 'checked' : ''} />
            Task
          </label>

          <label for="thought-${id}" class="form__radio-label">
            <input 
              type="radio" 
              name="category" 
              id="thought-${id}" 
              value="${categories.Thought}"
              ${category === categories.Thought ? 'checked' : ''} />
            Random thought
          </label>

          <label for="idea-${id}" class="form__radio-label">
            <input 
              type="radio" 
              name="category" 
              id="idea-${id}" 
              value="${categories.Idea}"
              ${category === categories.Idea ? 'checked' : ''} />
            Idea
          </label>

          <label for="quote-${id}" class="form__radio-label">
            <input 
              type="radio" 
              name="category" 
              id="quote-${id}" 
              value="${categories.Quote}"
              ${category === categories.Quote ? 'checked' : ''} />
            Quote
          </label>
        </div>
      </div>
      <div class="form__col">
        <button class="button--outlined form__submit" data-save="${id}" >Save</button>
      </div>
    </form>
  `;
};

export default view;
