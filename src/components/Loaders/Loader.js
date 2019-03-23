import React from 'react';

export const Loader = props => (
    <div className="loader">
        <div className="loader__line-container">
            <span className="loader__line loader__line--1"></span>
            <span className="loader__line loader__line--2"></span>
            <span className="loader__line loader__line--3"></span>
        </div>
        <p className="loader__text">Loading...</p>
    </div>
);