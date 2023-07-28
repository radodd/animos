import NavBar from '../NavBar';
import './UsersProfilePage.css';
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../actions/userAction.js';



function UsersProfilePage() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const userProfile = users.find((user) => user.id === userId)
    const pets = useSelector((state) => state.pets);
    const userPets = pets.filter((pet) => pet.user_id === userProfile.id);
    const events = useSelector((state) => state.events);
    const userEvents = events.filter(
      (event) => event.account_id === userProfile.id
    );
    const tokenUser = useSelector((state) => state.user);
    const userEmail = tokenUser && tokenUser['email'];
    const databaseUser = users.filter((user) => user.email === userEmail);
    const followingUsersList =
      databaseUser[0] && databaseUser[0]['following_list'];

    const handleFollow = async (userProfile, requestingUserId) => {
      const url = `${process.env.REACT_APP_API_HOST}/api/users/addfriend/`;
      const data = {
        user_id: userProfile,
        requesting_user_id: requestingUserId,
      };
      const fetchOptions = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        dispatch(fetchUsers());
      }
    };


    function PetCard() {
      return (
        <div className="pets-card align-items-center">
          {userPets.map((pet) => {
            return (
              <div
                className="user-profile-pet-card align-items-center"
                key={pet.id}
              >
                <div className="user-profile-pet-card-body d-flex flex-column align-items-center">
                  <img
                    className="rounded-circle user-profile-pet-card-image"
                    src={pet.pet_picture_url}
                    alt=""
                    width="100px"
                    height="100px"
                    style={{ objectFit: 'cover' }}
                  ></img>
                  <h5 className="user-profile-pet-card-title">
                    {pet && pet.pet_name}
                  </h5>
                  <div className="user-profile-pet-card-birthday">
                    🎂: {pet.birth_adoption_date}
                  </div>
                  <div className="size-vibe-breed">
                    {pet.breed} | {pet.size} | {pet.vibe}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    function EventCard() {
        return (
          <div className="events-card align-items-center">
            {userEvents.map((event) => {
              return (
                <div
                  className="user-profile-event-card align-items-center"
                  key={event.id}
                >
                  <div className="user-profile-event-card-body d-flex flex-column align-items-center">
                    <img
                      className="rounded user-profile-event-card-image"
                      src={event.picture_url}
                      alt=""
                      height="100px"
                      style={{ objectFit: 'cover' }}
                    ></img>
                    <h5 className="user-profile-event-card-title">
                      {event && event.name}
                    </h5>
                    <div className="user-profile-event-card-date">
                      {event.date_start}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
    }



  return (
    <>
      <NavBar />
      <br />
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={userProfile && userProfile.picture_url}
                      alt=""
                      className="rounded"
                      width="150"
                      height="150"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="mt-3">
                      <h2>
                        {userProfile && userProfile.first_name}{' '}
                        {userProfile && userProfile.last_name}
                      </h2>
                      <p className="text-secondary mb-1">
                        {userProfile && userProfile.email}
                      </p>
                      <p className="text-muted font-size-sm">
                        {userProfile && userProfile.zipcode}
                      </p>
                      {tokenUser &&
                      followingUsersList.includes(userProfile.id) ? (
                        <button
                          type="button"
                          className="following-btn btn-primary flex-grow-1"
                        >
                          Following
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleFollow(userProfile.id, tokenUser.id)
                          }
                          type="button"
                          className="follow-btn btn-primary flex-grow-1"
                        >
                          Follow
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h4>{userProfile && userProfile.first_name}'s Pet(s)</h4>
                  <div className="card-container">
                    <PetCard />
                  </div>
                </div>
              </div>
              <br />
              <div className="card">
                <div className="card-body">
                  <h4>{userProfile && userProfile.first_name}'s Event(s)</h4>
                  <EventCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersProfilePage;
