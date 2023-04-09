import React, { useState } from 'react'

export default function Search({ onSearch }) {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };

    return (
        
        <div className="input-group input-group-alternative input-group-merge">
            <div className="input-group-prepend">
                <span className="input-group-text"><i className="fas fa-search" /></span>
            </div>
            <input
                className="form-control"
                value={search}
                onChange={e => onInputChange(e.target.value)}
                placeholder="Search"
                type="text"
            />
        </div>
    )
}
