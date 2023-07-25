import './MainPage.css';
import LeftProfileCard from './LeftFeed';
import EventFeedCard from './CenterFeed';
import RightFeed from './RightFeed';
import EventButtonModal from './CreateEventButtonModal';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from 'react-router';
import NavBar from '../NavBar'

function MainPage({ locations, user, users }) {
    const { token } = useToken();
    const navigate = useNavigate();
    if (!token) {
        navigate('/');
    }

    return (
        <>
        <NavBar/>
            <div className="container gedf-wrapper">
                <div className="row">
                    <div className="col-md-3">
                        <LeftProfileCard />
                    </div>
                    <div className="col-md-6 gedf-main">
                        <EventButtonModal />
                        <hr />
                        <EventFeedCard loggedInUser={user} />
                    </div>
                    <div className="col-md-3">
                        <RightFeed />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;
