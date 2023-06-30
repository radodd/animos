from fastapi import APIRouter, Depends
from models import ThingIn, ThingOut, ThingsList
from queries.things import ThingQueries



router = APIRouter()

@router.get("/api/a_thing")
def show_thing():
    return {
        "hello": {
            "me": 3,
            "you": 17,
            "world": 5,
            "hour": 19,
            "min": "00"
        }
    }


@router.post("/api/things", response_model=ThingOut)
async def create_thing(
    thing: ThingIn,
    repo: ThingQueries = Depends()
):
    thing = repo.create(thing)
    return thing


@router.get("/api/things", response_model=ThingsList)
def get_things(repo: ThingQueries = Depends()):
    return ThingsList(things=repo.get_all())

# @router.get("/api/things/{id}", response_model=ThingOut)
# def get_thing_by_id(repo: ThingQueries = Depends()):
    
#     thing = repo.get_by_id(id)
#     return ThingOut(thing)