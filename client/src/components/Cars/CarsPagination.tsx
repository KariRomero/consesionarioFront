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

    return (
        <div className='w-full flex justify-center items-center space-x-10 py-8'>
            <button onClick={handleFirstPage}>
                <FontAwesomeIcon icon={faAnglesLeft} className='text-grey hover:text-black'/>
            </button>
            <button onClick={handlePreviousPage} disabled={page <= 1}>
                <FontAwesomeIcon icon={faChevronLeft} className='text-grey hover:text-black'/>
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageClick(index + 1)}
                    className={`px-4 py-2 border-0 rounded ${page === index + 1 ? 'font-bold shadow-lg' : 'font-normal'}`} 
                >
                    {index + 1}
                </button>
            ))}
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
