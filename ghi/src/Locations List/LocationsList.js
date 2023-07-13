import { useEffect, useState } from 'react';



function LocationsList({locations}) {

    function Card() {

    return (
        <>
        <div className="location-card">
            {locations.map((location) => (
            <div className="card-body">
                <img width="200px" src={location.picture_url} />
                <h2 className="card-title">{location.name}</h2>
                <p className="card-description">{location.description}</p>
            </div>
            ))}
            <button className="card-button">View details</button>
        </div>
        </>
    );
    }

    return (
    <>
      <h1> Pet Furiendly Locations</h1>
      <Card />

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
