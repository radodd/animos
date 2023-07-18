import { useEffect } from "react";

export default function ProfilePage({ user, loadAccount }) {
  useEffect(() => {
    loadAccount();
  }, []);

  console.log("user data:", user);
  return (
    <>
      <h1>User profile</h1>
      <div className="user-profile">
        <div className="user" key={user && user.id}>
          <div className="user-first_name">{user && user.first_name}</div>
          <div className="user-last_name">{user && user.last_name}</div>
          <div className="user-email">{user && user.email}</div>
          <div className="user-zipcode">{user && user.zipcode}</div>
          <div className="user-pets">{user && user.pets}</div>
          <div className="user-hosted_events">{user && user.hosted_events}</div>
          <div className="user-attending_events">
            {user && user.attending_events}
          </div>
        </div>
      </div>
    </>
  );
}
