import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryHeader from '../CategoryHeader';
import Carousel from '../Carousel';
import { collectionTypes } from '../../constants';
import Section from '../Section';
import CardCollection from '../CardCollection';

/* 

Todo - add transition animations for this route. Can't use the generic constructTimeline function, since it 
doesn't have some of the elements required. I either need to just handle any transitions manually within this 
component, or alter the constructTimeline function to handle this case. 

*/

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

        const { categoryId, playlistIds } = this.props;

        return (
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
                            itemIds={playlistIds}
                            collectionType={collectionTypes.playlists}
                            includeCreatePlaylistCard={false}
                        />
                    </Section> 
                </div>
            </main>
        )
    }
}

/*

<Carousel 
                        itemIds={playlistIds}
                        title="Playlists"
                        collectionType={collectionTypes.playlists}
                        includeCreatePlaylistCard={false}
                    />

*/

const mapStateToProps = (state, ownProps) => {
    const category = state.categories.categoryData[ownProps.categoryId];
    return {
        playlistIds: category.playlistIds
    };
};

export default connect(mapStateToProps)(Category);
