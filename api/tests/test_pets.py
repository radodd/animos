from main import app
from fastapi.testclient import TestClient
from queries.pets import PetQueries

client = TestClient(app)


class EmptyPetQueries:
    def get_pets(self):
        return []


class CreatePetQueries:
    def create(self, pet):
        result = {
            "id": "671",
            "pet_name": "The Cat Man",
            "birth_adoption_date": "04 March 1993",
            "breed": "ANIMOS",
            "dietary_restrictions": "Keto",
            "vibe": "Hella Vibey",
            "size": "travel size",
            "pet_picture_url": "https://2.bp.blogspot.com/-Ae0ZTqRk2YU/XLfNY\
                3aGdDI/AAAAAAADHgY/bQ6on20gXwwxpm1HjyFs7Jnicpzx9rNBQCLcBG\
                    As/s1600/IMG_6343.jpg",
            "user_id": "911",
        }
        result.update(pet)
        return result


def test_get_all_pets():
    app.dependency_overrides[PetQueries] = EmptyPetQueries
    response = client.get("/api/pets/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {"pets": []}
