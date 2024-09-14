import { useState } from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a search term.');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search images and photos"
          autoFocus
          className={css.input}
        />
        <button type="submit" className={css.button}>Search</button>
      </form>
    </header>
  );
}
