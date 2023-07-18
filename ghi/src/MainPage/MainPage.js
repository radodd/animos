import './MainPage.css';
import CreateEventButton from '../assets/images/create_event_button.png'
import LeftProfileCard from './LeftFeed'
import EventFeedCard from './CenterFeed'
import RightFeed from './RightFeed';


function MainPage() {
  return (
    <>
      <h3>NavBar Placeholder</h3>
      <div className="container gedf-wrapper">
        <div className="row">
          {/* MAIN PAGE - LEFT SIDE: PROFILE / FRIENDS LIST / LOCATIONS */}
          <div className="col-md-3">
            <LeftProfileCard />
          </div>

          {/* MAIN PAGE - CENTER: CREATE EVENT & EVENT FEED */}
          <div className="col-md-6 gedf-main">
            <div className="gedf-card">
              <div className="card-body-event-btn">
                <a
                  href="/events/create"
                  className="create-event-btn"
                  target="_blank"
                >
                  <img src={CreateEventButton} alt="" width="100%" />
                </a>
              </div>
              <hr />
            </div>
            <EventFeedCard />
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
