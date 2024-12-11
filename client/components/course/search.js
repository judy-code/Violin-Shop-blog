import React from 'react'
import styles from './search.module.scss'
import { IoSearchSharp } from 'react-icons/io5'

const SearchBar = ({ search, onSearchChange, onSearchClick, onClearSearch }) => {
  const handleSearchChange = (event) => {
    onSearchChange(event);
    if (event.target.value === '') {
      onClearSearch(); // 清除搜尋結果
    }
  };
  return (
    <div className={`mb-3 d-flex ${styles['search']}`}>
      <input
        type="search"
        className={`form-control ${styles['search-bar']}`}
        placeholder="搜尋"
        value={search}
        onChange={handleSearchChange}
      />
      <span
        className={`btn input-group-text ${styles['btn-search']}`}
        id="basic-addon2"
        onClick={onSearchClick}
      >
        <IoSearchSharp size={20} />
      </span>
    </div>
  );
};

export default SearchBar;
