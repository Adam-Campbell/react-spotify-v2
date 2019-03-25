import React from 'react';
import { shallow } from 'enzyme';
import { Auth } from './Auth';

const mockedStoreToken = jest.fn();
const mockedHistoryPush = jest.fn();
const mockedHistory = { push: mockedHistoryPush }

test(`if an access_token hash exists in window.location, grabs the token and calls storeToken 
then redirects the user`, 
() => {
    window.location.hash = 'access_token=a1b2c3d4'
    const wrapper = shallow(
        <Auth 
            accessToken=''
            timestamp={null}
            storeToken={mockedStoreToken}
            history={mockedHistory}
        />
    );
    expect(mockedStoreToken).toHaveBeenCalledTimes(1);
    // Only the first argument that mockedStoreToken is called with can be tested, the second argument is the 
    // result of a call to Date.now() and can't be known ahead of time.
    expect(mockedStoreToken.mock.calls[0][0]).toBe('a1b2c3d4');
    expect(mockedHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockedHistoryPush).toHaveBeenCalledWith('/me');
});
