/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { createUltimatePagination, ITEM_TYPES } from 'react-ultimate-pagination'

const WrapperComponent = ({ children }) => (
    <div className="card-footer py-4">
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end mb-0">
                {children}
            </ul>
        </nav>
    </div>
);

const withPreventDefault = (fn) => (event) => {
    event.preventDefault();
    fn();
}

const Page = ({ value, isActive, onClick }) => (
    <li className={isActive ? 'page-item active' : 'page-item'}>
        <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>{value}</a>
    </li>
);

const Ellipsis = ({ onClick }) => (
    <li className="page-item">
        <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>...</a>
    </li>
);

const FirstPageLink = ({ onClick }) => (
    <li className="page-item">
        <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>&laquo;</a>
    </li>
);

const PreviousPageLink = ({ onClick }) => (
    <li className="page-item">
        <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>&lsaquo;</a>
    </li>
);

const NextPageLink = ({ onClick }) => (
    <li className="page-item">
        <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>&rsaquo;</a>
    </li>
);

const LastPageLink = ({ onClick }) => (
    <li className="page-item">
        <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>&raquo;</a>
    </li>
);

const itemTypeToComponent = {
    [ITEM_TYPES.PAGE]: Page,
    [ITEM_TYPES.ELLIPSIS]: Ellipsis,
    [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
    [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
    [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
    [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink
};

const UltiPagination = createUltimatePagination({ itemTypeToComponent, WrapperComponent });

export default UltiPagination;
