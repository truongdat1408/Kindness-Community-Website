/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

export default function Pagination({ postsPerPage, totalPosts, paginate, currpage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <div className="card-footer py-4">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end mb-0">
                        {pageNumbers.map(number => {
                            var activeClass = currpage === number ? 'active' : '';
                            return (
                                <li key={number} className={`page-item ${activeClass}`}>
                                    <a onClick={() => paginate(number)} href='#' className='page-link'>
                                        {number}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                    
                </nav>
            </div>

        </>
    )
}
