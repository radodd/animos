import { useEffect, useState } from 'react';

function PetsList() {
    const [pets, setPets] = useState([]);

    const fetchData = async () => {
      const url = 'http://localhost:8000/api/pets'
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setPets(data.pets);
        console.log(data);
      }
    }
    useEffect(() => {
      fetchData();
    }, []);

    const handleDelete = async (event) => {
      const automobilesUrl = `http://localhost:8100/api/automobiles/${event}/`
      const fetchConfig = {
        method: "delete",
      }
      const response = await fetch(automobilesUrl, fetchConfig);
      if (response.ok) {
        console.log(response.deleted, response.breakdown)
        fetchData();
      }
    }

    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Birth / Adoption Date</th>
              <th>Breed</th>
              <th>Dietary Restrictions</th>
              <th>Vibe</th>
              <th>Size</th>
              <th>Pet Picture</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
          {pets.map((pet) => {
            return (
              <tr key={pet.id}>
                <td className="fs-3">{ pet.pet_name }</td>
                <td className="fs-3">{ pet.birth_adoption_date }</td>
                <td className="fs-3">{ pet.breed }</td>
                <td className="fs-3">{ pet.dietary_restrictions }</td>
                <td className="fs-3">{ pet.vibe }</td>
                <td className="fs-3">{ pet.size }</td>
                <td className="fs-3">{ pet.pet_picture_url }</td>
                <td className="fs-3">{ pet.user_id }</td>
                <td>
                    <button onClick={() => handleDelete(pet.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </>
    );
  }

  export default PetsList;
