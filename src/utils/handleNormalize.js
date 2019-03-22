import { normalize, schema } from 'normalizr';
import { cloneDeep } from 'lodash';


/*

This module contains all of the schema definitions that are used throughout the app. It exports a function 
that internally calls the normalize function to normalize the data passed to it. It also has a set amount
of possible entry points (schemas to start the normalization with, but which may themselves contain additional
nested schemas) which are exported as properties on a dedicated object. This object is used to provide the
second argument when the function is used elsewhere in the app, example:

const normalizedData = handleNormalize(someAlbumData, entryPoints.albums);

*/



// Simple schemas
const artistSchema = new schema.Entity('artists');
const albumSchema = new schema.Entity('albums', { artists: [artistSchema] });
const trackSchema = new schema.Entity('tracks', { album: albumSchema, artists: [artistSchema] });
const playlistSchema = new schema.Entity('playlists');
const categorySchema = new schema.Entity('categories');


// Schema for the tracks appearing nested within a complex album entity. An 'album' property equal to the
// parent album entities id needs to be manually added in since the entities returned from this endpoint 
// lack this property, but for consistency with all other track entities I need to add it back in.
const albumTrackSchema = new schema.Entity('tracks', 
    { artists: [artistSchema] },
    {
        processStrategy: (value, parent, key) => {
            const cloned = cloneDeep(value);
            cloned.album = parent.id;
            return cloned;
        }
    }
);


// The schema for complex album objects, preprocessing is required to allow the nested track entities
// to be extracted cleanly.
const complexAlbumSchema = new schema.Entity(
    'albums', 
    { 
        artists: [artistSchema],
        tracks: [albumTrackSchema]
    },
    {
        processStrategy: (value, parent, key) => {
            const cloned = cloneDeep(value);
            cloned.tracks = [ ...cloned.tracks.items ];
            return cloned;
        }
    }
);


// The schema for complex playlist objects, preprocessing is required to allow the nested track entities
// to be extracted cleanly.
const complexPlaylistSchema = new schema.Entity(
    'playlists', 
    {
        tracks: [trackSchema] 
    },
    {
        processStrategy: (value, parent, key) => {
            const cloned = cloneDeep(value);
            cloned.tracks = cloned.tracks.items.map(item => item.track);
            return cloned;
        }
    }
);


// Previously it was necessary to delete the tracks property here because it clashed with the actual array
// of track ids for complex playlist objects. However, now that the track ids are being store in a seperate
// reducer I don't neccessarily need this anymore. 
const playlistSchemaStripTracks = new schema.Entity('playlists', {}, {
    processStrategy: (value, parent, key) => {
        const cloned = cloneDeep(value);
        delete cloned.tracks;
        return cloned;
    }
});

/*

entryPoints is exported and used to provide the second argument passed to handleNormalize. It provides auto-
complete when the function is being used elsewhere in the codebase and prevents spelling errors by using a 
property of the entryPoints object rather than a raw string. 

When a property is chosen, the string value assigned to that property is used to look up a schema definition
on the schemaTypes object, which is then passed into the normalize function.

*/
export const entryPoints = {
    artists: 'artists',
    tracks: 'tracks',
    albums: 'albums',
    categories: 'categories',
    playlists: 'playlists',
    playlistStripTracks: 'playlistStripTracks',
    complexAlbum: 'complexAlbum',
    complexPlaylist: 'complexPlaylist'
};

// Definitions for all of the different schema types that will be used as entry points.
const schemaTypes = {
    artists: [ artistSchema ],
    tracks: [ trackSchema ],
    albums: [ albumSchema ],
    categories: [ categorySchema ],
    playlists: [ playlistSchema ],
    playlistStripTracks: [ playlistSchemaStripTracks ],
    complexAlbum: complexAlbumSchema,
    complexPlaylist: complexPlaylistSchema
};


export const handleNormalize = (data, schemaType) => {
    return normalize(data, schemaTypes[schemaType]);
}
