import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategory } from '../../selectors';
import HeaderImage from '../HeaderImage';

export const CategoryHeader = props => (
    <header className="category-header" >
        <HeaderImage 
            imageURL={props.imageURL}
            imageAlt={`Artwork for the ${props.name} category`}
            imageRef={props.imageRef}
            isArtist={false}
        />
        <div className="category-header__title-container">
            <h1 
                className="heading heading--large"
                ref={props.titleRef}
            >{props.name}</h1>
            <span 
                className="category-header__underline"
                ref={props.underlineRef}
            ></span>
        </div>
    </header>
);

CategoryHeader.propTypes = {
    categoryId: PropTypes.string.isRequired,
    imageRef: PropTypes.object.isRequired,
    titleRef: PropTypes.object.isRequired,
    underlineRef: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const category = getCategory(state, ownProps.categoryId);
    return {
        name: category.name,
        imageURL: category.icons.length ? category.icons[0].url : ''
    };
};

export const ConnectedCategoryHeader = connect(mapStateToProps)(CategoryHeader);