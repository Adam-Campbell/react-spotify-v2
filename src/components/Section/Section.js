import React from 'react';
import PropTypes from 'prop-types';

export const Section = props => (
    <section className="page-section">
        <h1 className="heading">{props.title}</h1>
        {props.children}
    </section>
);

Section.propTypes = {
    title: PropTypes.string.isRequired
};
