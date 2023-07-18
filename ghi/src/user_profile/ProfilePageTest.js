import useToken from "@galvanize-inc/jwtdown-for-react";
import React, { useEffect, useState } from "react";

export default function ProfilePageTest() {
  const { token } = useToken();
  console.log("Before response !!! Profile Page Token:", token);
  const [userData, setUserData] = useState("");

  const getUserData = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/token`;
    console.log("Initial userData:");

    const response = await fetch(url, {
      credentials: "include",
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("After response !!! Profile Page Token:", token);
      console.log("Profile Page userData:", data);
      setUserData(data);
    }
  };

  useEffect(() => {
    console.log("Inside useEffect:");
    getUserData();
  }, [token]);

  return (
    <>
      <div>
        <h1 className="font-weight-bold mt-4">User Profile</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>ID</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userData && userData.account.last_name}</td>
              <td>{userData && userData.account.first_name}</td>
              <td>{userData && userData.account.id}</td>
              <td>{userData && userData.account.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
