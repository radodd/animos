from api.main import app
from fastapi.testclient import TestClient
from queries.events import EventQueries
# import sys
# print(sys.path)


# instance of app lives in main.py, we already did: app = FastAPI()
# & imported FastAPI
client = TestClient(app)

# 1a
class EmptyEventQueries:
    def get_events(self):
        return []


def test_check():
    assert 1 == 1

def test_get_events():
    # Want to make sure we overide what the queiry would actually do
    # like connect to the db
    # This is just a get, but if testing a post or a put or delete, would modify the
    # data in the db, which we dont want
    # We can use dependancy_overrides to circumvent this
    # Which will always be overiding a dict/obj, cause the json looks like:
    # { "events": [event_obj1, event_obj2,...]}

    # ARRANGE
    # place in [] the fn, query, what ever you intend to override
    # also make sure to import it! - from api.queries.events import EventQueries
    app.dependency_overrides[EventQueries] = EmptyEventQueries
    # EmptyEventQueries is the mock data we want to overide in EventQueries
    # We make a class above this fn to mock the data - # 1a

    # client obj to perform the get on this API events endpoint
    response = client.get("/api/events/")

    # b/c client from testclient is based on app, which is everything, it now knows
    # what get("api/events/") endpoint should return

    # ACT
    # some clean up. Incase there are more tests after this one.
    #  Not sure why here and not at the end
    app.dependency_overrides = {}

    # ASSERT
    # we expect JSON response, which a status code would be a JSON response
    assert response.status_code == 200
    # get.("/api/events/") end point will return a list
    # line 34 is calling that endpoint in the app, this is like fn add_2(): return 1+1
    # lines 10-12 is your control, this is 2
    # like:    add_2         == 2
    assert response.json() == {"events": []}
