import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { buttonThemes } from '../../constants';

export const PaginationControls = ({ numberOfPages, currentPage, setPage }) => {
    if (numberOfPages <= 1) {
        return null;
    }
    return (
        <div className="pagination-controls">
            {new Array(numberOfPages).fill(0).map((el, index) => (
                <Button 
                    key={index}
                    text={`${index+1}`}
                    handleClick={() => setPage(index)}
                    theme={currentPage === index ? buttonThemes.alternate : buttonThemes.standard}
                    additionalStyles={{ marginLeft: '5px', marginRight: '5px' }}
                />
            ))}
        </div>
    );
};

PaginationControls.propTypes = {
    numberOfPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired
};

