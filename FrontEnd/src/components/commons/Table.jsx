/* eslint-disable array-callback-return */
import React, { useMemo, useState } from 'react'
import Search from './Search';
// import Pagination from '../commons/Pagination'
import UltiPagination from './UltiPagination';
import TableHeader from './TableHeader';

export default function Table({ name, columns, data, component: Component, hasNewBtn }) {
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(data.length);
    const [sorting, setSorting] = useState({ field: "", order: "" });

    // const [filteredDatas, setFilteredDatas] = useState(data);
    // const [loading, setLoading] = useState(false);

    const ITEMS_PER_PAGE = 5;


    // Change page
    // const paginate = pageNumber => setCurrentPage(pageNumber);

    const filteredData = useMemo(() => {
        let filteredDatas = data
        if (search) {
            filteredDatas = filteredDatas.filter(
                (item) =>
                    Object
                        .keys(item)
                        .some(key => item[key].toString().toLowerCase().includes(search.toLowerCase()))
            )

        }
        setTotalItems(filteredDatas.length);
        setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE))

        //Sorting
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            filteredDatas = filteredDatas.sort(
                (a, b) => {
                    if (!isNaN(a[sorting.field]) && !isNaN(b[sorting.field])) {
                        return reversed * (a[sorting.field] - b[sorting.field])
                    }
                    return reversed * a[sorting.field].localeCompare(b[sorting.field])
                }

            );
        }
        //slice data
        return filteredDatas.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [currentPage, data, search, sorting.field, sorting.order, totalItems])

    return (
        <>
            {/* Header Table */}
            <div className="card-header border-0">
                <div className="row align-items-center">
                    <div className="col-6">
                        <h3 className="mb-0">{name}</h3>
                    </div>
                    <div className="col-6 ml-auto">
                        <form className="navbar-search navbar-search-light" id="navbar-search-main">
                            <div className="form-group mb-0">
                                <Search
                                    onSearch={value => {
                                        setSearch(value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Table */}
            <div className="table-responsive">
                {/* Projects table */}
                <table className="table align-items-center table-flush">
                    <TableHeader
                        headers={columns}
                        onSorting={(field, order) =>
                            setSorting({ field, order })
                        }
                    />
                    <tbody>
                        <Component data={filteredData} />
                    </tbody>
                </table>
            </div>
            {totalPages > 0 ? <UltiPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={pageNumber => setCurrentPage(pageNumber)}
                siblingPagesRange={0}
            /> : null}

            {/* <Pagination
                datasPerPage={datasPerPage}
                totalDatas={data.length}
                paginate={paginate}
                currpage={currentPage}
            /> */}
        </>
    )
}
