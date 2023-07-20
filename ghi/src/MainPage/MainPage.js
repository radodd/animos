import './MainPage.css';
import { useState } from 'react';
import LeftProfileCard from './LeftFeed'
import EventFeedCard from './CenterFeed'
import RightFeed from './RightFeed';
import EventButtonModal from './CreateEventButtonModal'

function MainPage({ locations, user, users }) {
  return (
    <>
      <div className="container gedf-wrapper">
        <div className="row">
          {/* MAIN PAGE - LEFT SIDE: PROFILE / FRIENDS LIST / LOCATIONS */}
          <div className="col-md-3">
            <LeftProfileCard />
          </div>

          {/* MAIN PAGE - CENTER: CREATE EVENT & EVENT FEED */}
          <div className="col-md-6 gedf-main">
            <EventButtonModal />
            <hr />
            <EventFeedCard loggedInUser={user} />
          </div>

          {/* MAIN PAGE - RIGHT SIDE: ADS / ADD USERS / EVENTS */}
          <div className="col-md-3">
            <RightFeed />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
