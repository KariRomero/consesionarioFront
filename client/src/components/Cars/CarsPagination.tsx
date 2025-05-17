'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faAnglesRight,
  faAnglesLeft,
} from '@fortawesome/free-solid-svg-icons';

interface CarsPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const CarsPagination: React.FC<CarsPaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page: number) => {
    if (page !== currentPage) onPageChange(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleFirst = () => onPageChange(1);
  const handleLast = () => onPageChange(totalPages);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pageNumbers.push(renderPageButton(i));
      pageNumbers.push(<span key="ellipsis-end" className="px-2">...</span>);
      pageNumbers.push(renderPageButton(totalPages));
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(renderPageButton(1));
      pageNumbers.push(<span key="ellipsis-start" className="px-2">...</span>);
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      pageNumbers.push(renderPageButton(1));
      pageNumbers.push(<span key="ellipsis-start" className="px-2">...</span>);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(renderPageButton(i));
      }
      pageNumbers.push(<span key="ellipsis-end" className="px-2">...</span>);
      pageNumbers.push(renderPageButton(totalPages));
    }

    return pageNumbers;
  };

  const renderPageButton = (page: number) => (
    <button
      key={page}
      onClick={() => handlePageClick(page)}
      className={`px-4 py-2 border-0 rounded ${currentPage === page ? 'font-bold shadow-lg' : 'font-normal'}`}
    >
      {page}
    </button>
  );

  if (totalPages <= 1) return null;

  return (
    <div className='w-full flex justify-center items-center space-x-2 sm:space-x-10 py-8'>
      <button onClick={handleFirst} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {renderPageNumbers()}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <button onClick={handleLast} disabled={currentPage === totalPages}>
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  );
};

export default CarsPagination;