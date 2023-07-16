import useToken from "@galvanize-inc/jwtdown-for-react";

function UserAccounts({ userDataTest }) {
  const { token } = useToken();
  console.log("User Accounts Token:", token);
  console.log("User Accounts Data:", userDataTest);

  return (
    <>
      <div>
        <h1 className="font-weight-bold mt-4"> User Accounts </h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>id</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {userDataTest.map((userProfile) => {
              return (
                <tr key={userProfile.id}>
                  <td>{userProfile.last_name}</td>
                  <td>{userProfile.first_name}</td>
                  <td>{userProfile.id}</td>
                  <td>{userProfile.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserAccounts;
