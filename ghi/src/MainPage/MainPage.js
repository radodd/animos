import {useState, useEffect} from 'react'
import './MainPage.css';
import AdoptionAd from '../assets/images/animal-adoption-ad.png';
import CreateEventButton from '../assets/images/create_event_button.png'
import CalendarIcon from '../assets/icons/calendar.png'
import FriendsIcon from '../assets/icons/friends.png';

function EventFeedCard() {
    const [events, setEvents] = useState([]);

    async function getEvents() {
      const response = await fetch('http://localhost:8000/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      }
    }

    useEffect(()=>{
        getEvents();
    })

    return (
      <>
        {events.map((event) => {
          const start_datetime = new Date(event.date_start).toLocaleTimeString([], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
          const end_datetime = new Date(event.date_end).toLocaleTimeString([], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            });


          return (
            <div className="card gedf-card" key={event.id}>
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="mr-2">
                      <img
                        className="rounded-circle"
                        width="45"
                        src="https://picsum.photos/50/50"
                        alt=""
                      />
                    </div>
                    <div className="ml-2">
                      <div className="h5 m-0">@{event.account_id}</div>
                      <div className="h7 text-muted">Miracles Lee Cross</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <img src={event.picture_url} width="100px" />
                <h5>{event.name}</h5>
                <h6>{start_datetime} - {end_datetime}</h6>
                <h6>{event.location_id}</h6>
                <p className="card-text">{event.description}</p>
              </div>
              <div className="card-footer">
                <a href="#" className="card-link">
                  <i className="fa fa-gittip"></i>Like
                </a>
                <a href="#" className="card-link">
                  <i className="fa fa-comment"></i>Comment
                </a>
                <a href="#" className="card-link">
                  <i className="fa fa-mail-forward"></i>Share
                </a>
              </div>
            </div>
          );})}
      </>
    );
}


function MainPage() {
  return (
    <>
      <h3>NavBar Placeholder</h3>

      <div className="container gedf-wrapper">
        <div className="row">
          {/* MAIN PAGE - LEFT SIDE: PROFILE / FRIENDS LIST / LOCATIONS */}
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <img
                  src="https://cdn.dribbble.com/users/1452333/screenshots/16345536/media/6054461fc01fb0d3400ecb9091510274.png"
                  alt=""
                  className="rounded-circle"
                  width="150"
                  height="150"
                />
                <div className="h5">FirstName LastName</div>
                <div className="h6 text-muted">
                  Username : @
                </div>
                <div className="h7">Profile Page | Edit Profile</div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="h6 text-muted">My pets</div>
                  <img
                    src="https://cdn.dribbble.com/userupload/3983353/file/original-3766d806df4ef69750d471f6fef25184.gif"
                    alt=""
                    className="rounded-circle"
                    width="100"
                    height="100"
                  />
                </li>
              </ul>
            </div>

            <br />

            <div className="card">
              <div className="card-body">
                <ul className="list-group events-friends list-group-flush">
                  <li className="list-group-item">
                    <a href="/events">
                      <img
                        className="left-main-icon"
                        src={CalendarIcon}
                        width="35px"
                      />
                      My Events
                    </a>
                  </li>
                  <li className="list-group-item">
                    <a href="/events">
                      <img
                        className="left-main-icon"
                        src={FriendsIcon}
                        width="35px"
                      />
                      Friends
                    </a>
                  </li>
                </ul>
              </div>
            </div>
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
            </div>

            <EventFeedCard />
          </div>

          {/* MAIN PAGE - RIGHT SIDE: ADS / ADD USERS / EVENTS */}
          <div className="col-md-3">
            <div className="gedf-card">
              <div className="card-body">
                <a
                  href="https://www.humanesociety.org/"
                  className="sponsored-ad "
                  target="_blank"
                >
                  <img
                    className="rounded"
                    src={AdoptionAd}
                    alt=""
                    width="100%"
                  />
                </a>
              </div>
            </div>

            <div className="card gedf-card right-card">
              <div className="card-body">
                <h5 className="card-title">Make a new furiend</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="/users" className="card-link">
                  View More
                </a>
              </div>
            </div>

            <div className="card gedf-card right-card">
              <div className="card-body">
                <h5 className="card-title">Events happening</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <a href="/events" className="card-link">
                  View more events
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
