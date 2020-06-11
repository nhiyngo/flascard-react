import React from 'react';

export default function SearchBar({
  categories, onFormSubmit, categoryEl, amountEl,
}) {
  return (
    <div>
      <form className="header" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category </label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Number of Questions </label>
          <input type="number" id="amount" min="1" step="1" defaultValue="10" ref={amountEl} />
        </div>

        <div className="form-group">
          <button type="submit" className="btn">Generate</button>
        </div>

      </form>
    </div>
  );
}
