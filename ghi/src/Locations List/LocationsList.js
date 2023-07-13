import { useEffect, useState } from 'react';
import './LocationList.css';

function LocationsList({ locations }) {
  function Card() {
    return (
      <>
        {locations.map((location) => (
          <div className="location-card">
            <div className="card-body">
              <img
                className="card-image"
                width="100%"
                src={location.picture_url}
              />
              <h4 className="card-title">{location.name}</h4>
              {/* <p className="card-description">{location.description}</p> */}
              <button className="card-button">View details</button>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <h1> Pet Furiendly Locations</h1>
      <div className="wrapper">
        <Card />
      </div>
    </>
  );
}
//     return (
//     <>
//       {/* <NavBar /> placeholder for navbar */}
//       <h1>Pet Furiendly Locations</h1>
//       <div className="col">
//         {locations.list.map((data) => {
//           const location = data.location;
//           return (
//             <div key={location.href} className="card mb-3 shadow">
//               <img
//                 src={location.picture_url}
//                 className="card-img-top"
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{location.name}</h5>
//                 <h6 className="card-subtitle mb-2 text-muted">
//                   {location.name}
//                 </h6>
//                 <p className="card-text">{location.description}</p>
//               </div>
//               <div className="card-footer">
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//     );
// }
export default LocationsList;
