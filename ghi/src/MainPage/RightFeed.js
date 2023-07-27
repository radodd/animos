import './MainPage.css';
import AdoptionAd from '../assets/images/animal-adoption-ad.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function RightFeed() {
    const users = useSelector((state) => state.users);

    function NewFriendsCard() {
        return (
            <div className="card gedf-card right-card">
                <div className="card-body">
                    <h5 className="card-subtitle">Sniff out new friends</h5>
                    <br />
                    {users.slice(0, 4).map((user) => {
                        return (
                            <img
                                className="rounded-circle mx-2"
                                width="45"
                                height="45"
                                src={user.picture_url}
                                alt=""
                                style={{ objectFit: 'cover' }}
                                key={user.id}
                            />
                        );
                    })}
                    <br />
                    <br />
                    <Link to="/users" className="card-link float-right">
                        View more
                    </Link>
                </div>
            </div>
        );
    }

    function UpcomingEventsCard() {
        const events = useSelector((state) => state.events);

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
                                    style={{ objectFit: 'cover' }}
                                    alt=""
                                    key={event.id}
                                />
                            );
                        })}
                        <br />
                        <br />
                        <Link to="/events" className="card-link">
                            View more
                        </Link>
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
                    <Link
                        to="https://www.humanesociety.org/"
                        className="sponsored-ad "
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            className="rounded"
                            src={AdoptionAd}
                            alt=""
                            width="100%"
                        />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default RightFeed;
