import React from 'react';

export const CardLoader = props => (
    <div className="loader">
        <div className="loader__line-container loader__line-container--card">
            <span className="loader__line loader__line--card loader__line--1"></span>
            <span className="loader__line loader__line--card loader__line--2"></span>
            <span className="loader__line loader__line--card loader__line--3"></span>
        </div>
    </div>
);