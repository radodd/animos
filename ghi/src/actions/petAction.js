import { setPets } from '../slices/petsSlice.js';
// import { removePet } from '../slices/petsSlice.js';
export const fetchPets = () => async (dispatch) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/pets`
        );
        if (response.ok) {
            const data = await response.json();
            dispatch(setPets(data.pets));
        } else {
            console.error(response);
        }
    } catch (error) {
        console.error('Cannot fetch pets', error);
    }
};

// export const deletePet = (id) => async (dispatch) => {
//   try {
//     const response = await fetch(
//       `${process.env.REACT_APP_API_HOST}/api/pets/${id}`,
//       {
//         method: 'DELETE',
//       }
//     );

//     if (response.ok) {
//       // Fetch the updated pets list after successful deletion
//       const updatedPetsResponse = await fetch(
//         `${process.env.REACT_APP_API_HOST}/api/pets/`
//       );

//       if (updatedPetsResponse.ok) {
//         const data = await updatedPetsResponse.json();
//         dispatch(setPets(data.pets)); // Update the pets state with the new list
//       } else {
//         console.error(updatedPetsResponse);
//       }

//       // Pet deleted from the server, dispatch the removePet action with petId
//       dispatch(removePet(id));
//     } else {
//       console.error(response);
//     }
//   } catch (error) {
//     console.error('Unable to delete pet', error);
//   }
// };

// export const deletePet = (id) => async (dispatch) => {
//     try {
//         const response = await fetch(
//             `${process.env.REACT_APP_API_HOST}/api/pets/${id}`,
//             {
//                 method: "DELETE",
//             }
//         );
//     if (response.ok) {
//         dispatch(removePet(id));
//     } else {
//         console.error(response);
//     }

//     const updatedPetsResponse = await fetch(
//       `${process.env.REACT_APP_API_HOST}/api/pets/`
//     );

//     if (updatedPetsResponse.ok) {
//       const data = await updatedPetsResponse.json();
//       dispatch(setPets(data.pets)); // Update the pets state with the new list
//     } else {
//       console.error(updatedPetsResponse);
//     }
//   } catch (error) {
//     console.error('Unable to delete pet', error);
//   }
// };
