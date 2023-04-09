import React, { useState } from 'react'

export default function TableHeader({ headers, onSorting }) {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };
    return (
        <thead className="thead-light">
            <tr>
                {
                    headers.map(({ name, field, sortable }) => (
                        <th scope="col"
                            key={name}
                            onClick={() => sortable ? onSortingChange(field) : null}
                        >
                            {name}
                            {sortingField && sortingField === field && (
                                <i className={
                                    sortingOrder === "asc" ?
                                        "bi bi-caret-down-fill"
                                        : "bi bi-caret-up-fill"}>
                                </i>
                            )}
                        </th>
                    ))
                }
            </tr>
        </thead>
    )
}
