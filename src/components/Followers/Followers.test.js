import React from 'react';
import { shallow } from 'enzyme';
import { Followers } from './Followers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const mockedHandleClick = jest.fn();

test('renders an icon and a paragraph element showing the amount of followers', () => {
    const wrapper = shallow(
        <Followers 
            followerCount={9000}
            showButton={false}
            isFollowing={false}
            handleClick={mockedHandleClick}
        />
    );
    expect(wrapper.contains(<FontAwesomeIcon icon={faUsers} />)).toBe(true);
    expect(wrapper.contains(<p className="followers__count">9000 followers</p>)).toBe(true);
});

// test('render a button when the showButton prop is true', () => {
//     const wrapper = shallow(
//         <Followers 
//             followerCount={9000}
//             showButton={true}
//             isFollowing={false}
//             handleClick={mockedHandleClick}
//         />
//     );
//     expect(wrapper.find('button')).toHaveLength(1);
// });

// test('render appropriate text in the button depending on whether the user is following', () => {
//     const withoutFollowing = shallow(
//         <Followers 
//             followerCount={9000}
//             showButton={true}
//             isFollowing={false}
//             handleClick={mockedHandleClick}
//         />
//     );
//     expect(withoutFollowing.contains(<button onClick={mockedHandleClick}>Follow</button>)).toBe(true);
//     expect(withoutFollowing.contains(<button onClick={mockedHandleClick}>Unfollow</button>)).toBe(false);

//     const withFollowing = shallow(
//         <Followers 
//             followerCount={9000}
//             showButton={true}
//             isFollowing={true}
//             handleClick={mockedHandleClick}
//         />
//     );
//     expect(withFollowing.contains(<button onClick={mockedHandleClick}>Follow</button>)).toBe(false);
//     expect(withFollowing.contains(<button onClick={mockedHandleClick}>Unfollow</button>)).toBe(true);
// });
