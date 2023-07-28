// import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from "react-router";
import FindFriendTitle from "../assets/images/find_friends.png";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar";
import "./FindFriend.css";
import { fetchUsers } from "../actions/userAction.js";

function FindFriend() {
  const tokenUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const pets = useSelector((state) => state.pets);
  const userEmail = tokenUser && tokenUser["email"];
  const databaseUser = users.filter((user) => user.email === userEmail);
  const usersExceptToken = users.filter((user) => user !== databaseUser[0]);

  const dispatch = useDispatch();

  const followingUsersList =
    databaseUser[0] && databaseUser[0]["following_list"];

  let navigate = useNavigate();
  const userProfileRedirect = (userId) => {
    let path = `/users/${userId}/`;
    navigate(path);
  };

  const handleFollow = async (profileCardUserId, requestingUserId) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/users/addfriend/`;
    const data = {
      user_id: profileCardUserId,
      requesting_user_id: requestingUserId,
    };
    const fetchOptions = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      dispatch(fetchUsers());
    }
  };

  // const { token } = useToken();
  // const navigate = useNavigate();
  // if (!token) {
  //     navigate('/');
  // }

  return (
    <>
      <NavBar />
      <br />
      <div className="image-title-holder">
        <img
          className="find-friends-title"
          src={FindFriendTitle}
          width="900px"
          alt="title reads sniff out new friends to follow"
        />
      </div>
      <br />
      <div className="friend-card-container">
        {usersExceptToken.map((profileCardUser) => (
          <div key={profileCardUser.id} className="profile-card">
            <div className="user-card-body p-4">
              <div className="d-flex text-black">
                <div className="flex-shrink-0">
                  <img
                    src={profileCardUser && profileCardUser.picture_url}
                    alt=""
                    className="rounded"
                    width="115px"
                    height="115px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="user-name mb-1">
                    {profileCardUser.first_name} {profileCardUser.last_name}
                  </h5>
                  <div className="div-tag-test d-flex justify-content-start rounded-3 p-2 mb-2">
                    <div>
                      {profileCardUser &&
                        profileCardUser.pets.map((petId) => {
                          const pet = pets.find((pet) => pet.id === petId);
                          if (pet) {
                            return (
                              <img
                                key={pet.id}
                                className="rounded-circle pets-list-view"
                                src={pet.pet_picture_url}
                                alt="pet"
                                width="40px"
                                height="40px"
                                style={{
                                  objectFit: "cover",
                                }}
                              />
                            );
                          } else {
                            return null;
                          }
                        })}
                    </div>
                  </div>
                  <div className="d-flex pt-1">
                    <button
                      onClick={() => {
                        userProfileRedirect(profileCardUser.id);
                      }}
                      type="button"
                      className="view-profile-btn btn-outline-primary me-1 flex-grow-1"
                    >
                      View Profile
                    </button>
                    {tokenUser &&
                    followingUsersList.includes(profileCardUser.id) ? (
                      <button
                        type="button"
                        className="following-btn btn-primary flex-grow-1"
                      >
                        Following
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleFollow(profileCardUser.id, tokenUser.id)
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
        ))}
      </div>
    </>
  );
}

export default FindFriend;
