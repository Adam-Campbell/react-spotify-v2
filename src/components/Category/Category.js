import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryHeader from '../CategoryHeader';
import { collectionTypes } from '../../constants';
import Section from '../Section';
import CardCollection from '../CardCollection';
import { getCategoryPlaylistIds } from '../../selectors';

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
        const { categoryId, categoryPlaylistIds } = this.props;
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
                            itemIds={categoryPlaylistIds}
                            collectionType={collectionTypes.playlists}
                            includeCreatePlaylistCard={false}
                        />
                    </Section> 
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    categoryPlaylistIds: getCategoryPlaylistIds(state, ownProps.categoryId)
});

export default connect(mapStateToProps)(Category);
