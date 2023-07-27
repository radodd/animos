from main import app
from fastapi.testclient import TestClient
from queries.locations import LocationQueries
from routers.auth import authenticator

client = TestClient(app)


class EmptyLocationQueries:
    def list_locations(self):
        return []


def mock_logged_in_account():
    return True


class CreateLocationQueries:
    def create(self, location):
        result = {
            "id": "1010",
            "name": "Tompkins Square Dog Run",
            "zipcode": "10009",
            "description": "This popular recreation area is fully fenced with\
            plenty of space for your furry friend to run and socialize.",
            "capacity": "85",
            "picture_url": "https://2.bp.blogspot.com/-Ae0ZTqRk2YU/XLfNY\
                3aGdDI/AAAAAAADHgY/bQ6on20gXwwxpm1HjyFs7Jnicpzx9rNBQCLcBG\
                    As/s1600/IMG_6343.jpg",
        }
        result.update(location)
        return result


def test_get_all_locations():
    app.dependency_overrides[LocationQueries] = EmptyLocationQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = mock_logged_in_account
    response = client.get("/api/locations/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {"locations": []}


def test_create_location():
    app.dependency_overrides[LocationQueries] = CreateLocationQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = mock_logged_in_account

    json = {
        "name": "Tompkins Square Dog Run",
        "zipcode": "10009",
        "description": "This popular recreation area is fully fenced with\
        plenty of space for your furry friend to run and socialize.",
        "capacity": "85",
        "picture_url": "https://2.bp.blogspot.com/-Ae0ZTqRk2YU/XLfNY\
            3aGdDI/AAAAAAADHgY/bQ6on20gXwwxpm1HjyFs7Jnicpzx9rNBQCLcBG\
                As/s1600/IMG_6343.jpg",
    }

    expected = {
        "id": "1010",
        "name": "Tompkins Square Dog Run",
        "zipcode": "10009",
        "description": "This popular recreation area is fully fenced with\
        plenty of space for your furry friend to run and socialize.",
        "capacity": "85",
        "picture_url": "https://2.bp.blogspot.com/-Ae0ZTqRk2YU/XLfNY\
            3aGdDI/AAAAAAADHgY/bQ6on20gXwwxpm1HjyFs7Jnicpzx9rNBQCLcBG\
                As/s1600/IMG_6343.jpg",
    }

    response = client.post("/api/locations", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
