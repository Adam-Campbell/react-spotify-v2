import reducer from './highlightsReducer';
import * as actionTypes from '../actionTypes';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({
        newReleases: [],
        featuredPlaylists: [],
        categories: []
    });
});

test('handles FETCH_HIGHLIGHTS_SUCCESS', () => {
    expect(reducer(undefined, {
        type: actionTypes.FETCH_HIGHLIGHTS_SUCCESS,
        payload: {
            timestamp: 1553458874883
        }
    })).toEqual({
        newReleases: [],
        featuredPlaylists: [],
        categories: [],
        fullHighlightsFetched: true,
        lastFetchedAt: 1553458874883
    });
});