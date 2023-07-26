from main import app
from fastapi.testclient import TestClient
from models import AccountIn

client = TestClient(app)


def test_create_account():
    client = TestClient(app)
    info = AccountIn(
        email="el@moustachio.com",
        first_name="Pablo",
        last_name="Escobar",
        password="password",
        zipcode="62150",
        picture_url="https://moustache.com/picture.jpg",
        follower_list=["Michou", "Robert"],
        following_list=["Patoche", "Germaine"],
        pets=["Lizard", "Koala"],
        hosted_events=["Pool partayyy", "Snowfight"],
        attending_events=["Catnip session", "Couch scratching"]
    )

    response = client.post("/api/accounts", json=info.dict())
    assert response.status_code == 200
    assert "account" in response.json()
