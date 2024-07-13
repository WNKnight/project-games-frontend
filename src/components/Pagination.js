import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 3); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button className="pagination__button" onClick={() => onPageChange(1)}>&lt;</button>
      )}
      {getPageNumbers().map(page => (
        <button 
          key={page} 
          onClick={() => onPageChange(page)}
          className={`pagination__button ${page === currentPage ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button className="pagination__button" onClick={() => onPageChange(totalPages)}>&gt;</button>
      )}
    </div>
  );
};

export default Pagination;