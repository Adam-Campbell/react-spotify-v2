import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryHeader from '../CategoryHeader';
import { collectionTypes } from '../../constants';
import Section from '../Section';
import CardCollection from '../CardCollection';
import { getCategory, getCategoryPlaylistIds } from '../../selectors';
import { Helmet } from 'react-helmet';

class Category extends Component {

    static propTypes = {
        categoryId: PropTypes.string.isRequired
    }

    imageRef = React.createRef();
    titleRef = React.createRef();
    underlineRef = React.createRef();
    mainContainerRef = React.createRef();
    timeline = null;

    render() {

        const { categoryId, categoryName, categoryPlaylistIds } = this.props;
        
        return (
            <React.Fragment>
                <Helmet>
                    <title>{categoryName} - Reactify</title>
                </Helmet>
                <main className="body-content-container">
                    <CategoryHeader 
                        categoryId={categoryId}
                        imageRef={this.imageRef}
                        titleRef={this.titleRef}
                        underlineRef={this.underlineRef}
                    />
                    <div ref={this.mainContainerRef}>
                        <Section title="Playlists" >
                            <CardCollection 
                                itemIds={categoryPlaylistIds}
                                collectionType={collectionTypes.playlists}
                                includeCreatePlaylistCard={false}
                            />
                        </Section> 
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    categoryName: getCategory(state, ownProps.categoryId).name,
    categoryPlaylistIds: getCategoryPlaylistIds(state, ownProps.categoryId)
});

export default connect(mapStateToProps)(Category);
