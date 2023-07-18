import { useState, useEffect } from 'react';
import './MainPage.css';
import AdoptionAd from '../assets/images/animal-adoption-ad.png';

function RightFeed() {

    function NewFriendsCard() {
    const [user, setUser] = useState(null);

    async function loadCurrentUser() {
      const response = await fetch('http://localhost:8000/api/protected', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        const user = {
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
        };
        setUser(user);
      } else {
        console.error('user not logged in');
      }
    }

    useEffect(() => {
      loadCurrentUser();
    }, []);

    return (
      <div className="card gedf-card right-card">
        <div className="card-body">
          <h5 className="card-subtitle">Sniff out new friends</h5>
          <br />
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZW5rZDZudDk4cnQ2NjhrbTNmNmVwMzRmZXYxNzl3eXBqdDVwM3lkayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ICOgUNjpvO0PC/giphy.gif"
            alt=""
            className="rounded-circle"
            width="50"
            height="50"
          />
          <br />
          <a href="/users" className="card-link float-right">
            View more
          </a>
        </div>
      </div>
        );
    }

    function UpcomingEventsCard() {
        const [events, setEvents] = useState([]);

        async function getEvents() {
        const response = await fetch('http://localhost:8000/api/events');
        if (response.ok) {
            const data = await response.json();
            setEvents(data.events);
        }
        }

        useEffect(() => {
        getEvents();
        }, []);

        return (
        <>
            <div className="card gedf-card right-card">
            <div className="card-body">
                <h5 className="card-subtitle">Upcoming Events</h5>
                <p className="card-subtitle text-muted">
                Check out events near you
                </p>
                <br />
                {events.slice(0, 3).map((event) => {
                return (
                    <img
                    className="rounded mx-1"
                    width="auto"
                    height="75"
                    src={event.picture_url}
                    alt=""
                    />
                );
                })}
                <br />

                <a href="/events" className="card-link">
                View more
                </a>
            </div>
            </div>
        </>
        );
    }

    return (
        <>
        <NewFriendsCard />
        <UpcomingEventsCard />

        <div className="gedf-card">
            <div className="card-body">
            <a
                href="https://www.humanesociety.org/"
                className="sponsored-ad "
                target="_blank"
            >
                <img className="rounded" src={AdoptionAd} alt="" width="100%" />
            </a>
            </div>
        </div>
        </>
    );
}

export default RightFeed;
