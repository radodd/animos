import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

const UserProfile = () => {
  const [userData, setUserData] = useState("");
  const { fetchWithCookie } = useToken();

  const handleFetchWithAPI = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    fetch(url, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.account);
        setUserData(data);
      })
      .catch((error) => console.error(error));
  };

  const handleFetchWithJFR = async (e) => {
    e.preventDefault();
    const data = await fetchWithCookie(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`
    );
    console.log(data);
    setUserData(data);
  };

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
              <td>{userData.last_name}</td>
              <td>{userData.first_name}</td>
              <td>{userData.id}</td>
              <td>{userData.email}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card text-bg-dark mb-3">
        <h5 className="card-header d-flex">
          <span className="flex-fill">User Data</span>
          <div
            className="btn-toolbar"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleFetchWithAPI}
              >
                Get User Data using Fetch API{" "}
                <i className="bi bi-cloud-arrow-down"></i>
              </button>

              <button
                type="button"
                className="btn btn-info"
                onClick={handleFetchWithJFR}
              >
                Get User Data using fetchWithCookie{" "}
                <i className="bi bi-cloud-arrow-down-fill"></i>
              </button>

              <button
                type="button"
                className="btn eraser-bg"
                onClick={() => setUserData("")}
              >
                <i className="bi bi-eraser-fill"></i>
              </button>
            </div>
          </div>
        </h5>
      </div>
    </>
  );
};

export default UserProfile;
