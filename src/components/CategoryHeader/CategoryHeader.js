import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SmartImage from '../SmartImage';

export const CategoryHeader = props => (
    <header className="category-header" >
        <SmartImage 
            imageURL={props.imageURL}
            isArtist={false}
            isFixedSize={true}
            containerRef={props.imageRef}
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
    //const category = state.categories.categoryData[ownProps.categoryId];
    const category = state.categoryEntities[ownProps.categoryId];
    return {
        name: category.name,
        imageURL: category.icons.length ? category.icons[0].url : ''
    };
};

export const ConnectedCategoryHeader = connect(mapStateToProps)(CategoryHeader);