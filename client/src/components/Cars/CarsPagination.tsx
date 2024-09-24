import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, nextPage, previousPage, setPage, resetPage, goToLastPage } from '@/redux/slices/carsSlice';
import { RootState } from '@/redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const CarsPagination: React.FC = () => {
    const dispatch = useDispatch();
    const { page, limit, total } = useSelector((state: RootState) => state.cars);

    const totalPages = Math.ceil(total / limit);

    const handlePageClick = (pageNumber: number) => {
        dispatch(setPage(pageNumber));
        dispatch(fetchCars({ page: pageNumber, limit }) as any);
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            const nextPageNumber = page + 1;
            dispatch(nextPage());
            dispatch(fetchCars({ page: nextPageNumber, limit }) as any);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            const previousPageNumber = page - 1;
            dispatch(previousPage());
            dispatch(fetchCars({ page: previousPageNumber, limit }) as any);
        }
    };

    const handleFirstPage = () => {
        dispatch(resetPage());
        dispatch(fetchCars({ page: 1, limit }) as any);
    };

    const handleLastPage = () => {
        dispatch(goToLastPage());
        dispatch(fetchCars({ page: Math.ceil(total / limit), limit }) as any);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 4) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        onClick={() => handlePageClick(i)}
                        className={`px-4 py-2 border-0 rounded ${page === i ? 'font-bold shadow-lg' : 'font-normal'}`} 
                    >
                        {i}
                    </button>
                );
            }
        } else {
            // Show first 4 pages or the current range around the active page
            if (page <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(
                        <button
                            key={i}
                            onClick={() => handlePageClick(i)}
                            className={`px-4 py-2 border-0 rounded ${page === i ? 'font-bold shadow-lg' : 'font-normal'}`} 
                        >
                            {i}
                        </button>
                    );
                }
                pageNumbers.push(<span key="ellipsis" className="px-2">...</span>);
                pageNumbers.push(
                    <button
                        key={totalPages}
                        onClick={() => handlePageClick(totalPages)}
                        className={`px-4 py-2 border-0 rounded ${page === totalPages ? 'font-bold shadow-lg' : 'font-normal'}`} 
                    >
                        {totalPages}
                    </button>
                );
            } else if (page >= totalPages - 2) {
                pageNumbers.push(
                    <button
                        key={1}
                        onClick={() => handlePageClick(1)}
                        className={`px-4 py-2 border-0 rounded ${page === 1 ? 'font-bold shadow-lg' : 'font-normal'}`} 
                    >
                        {1}
                    </button>
                );
                pageNumbers.push(<span key="ellipsis-start" className="px-2">...</span>);
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(
                        <button
                            key={i}
                            onClick={() => handlePageClick(i)}
                            className={`px-4 py-2 border-0 rounded ${page === i ? 'font-bold shadow-lg' : 'font-normal'}`} 
                        >
                            {i}
                        </button>
                    );
                }
            } else {
                pageNumbers.push(
                    <button
                        key={1}
                        onClick={() => handlePageClick(1)}
                        className={`px-4 py-2 border-0 rounded ${page === 1 ? 'font-bold shadow-lg' : 'font-normal'}`} 
                    >
                        {1}
                    </button>
                );
                pageNumbers.push(<span key="ellipsis-start" className="px-2">...</span>);
                for (let i = page - 1; i <= page + 1; i++) {
                    pageNumbers.push(
                        <button
                            key={i}
                            onClick={() => handlePageClick(i)}
                            className={`px-4 py-2 border-0 rounded ${page === i ? 'font-bold shadow-lg' : 'font-normal'}`} 
                        >
                            {i}
                        </button>
                    );
                }
                pageNumbers.push(<span key="ellipsis-end" className="px-2">...</span>);
                pageNumbers.push(
                    <button
                        key={totalPages}
                        onClick={() => handlePageClick(totalPages)}
                        className={`px-4 py-2 border-0 rounded ${page === totalPages ? 'font-bold shadow-lg' : 'font-normal'}`} 
                    >
                        {totalPages}
                    </button>
                );
            }
        }
        return pageNumbers;
    };

    return (
        <div className='w-full flex justify-center items-center space-x-2 sm:space-x-10 md:space-x-10 lg:space-x-10 py-8'>
            <button onClick={handleFirstPage}>
                <FontAwesomeIcon icon={faAnglesLeft} className='text-grey hover:text-black'/>
            </button>
            <button onClick={handlePreviousPage} disabled={page <= 1}>
                <FontAwesomeIcon icon={faChevronLeft} className='text-grey hover:text-black'/>
            </button>
            {renderPageNumbers()}
            <button onClick={handleNextPage} disabled={page >= totalPages}>
                <FontAwesomeIcon icon={faChevronRight} className='text-grey hover:text-black'/>
            </button>
            <button onClick={handleLastPage}>
                <FontAwesomeIcon icon={faAnglesRight} className='text-grey hover:text-black'/>
            </button>
        </div>
    );
};

export default CarsPagination;
