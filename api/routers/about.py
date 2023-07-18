from fastapi import APIRouter, Depends
from models import CreatorIn, CreatorOut
from queries.about import AboutQueries
from bson.objectid import ObjectId

router = APIRouter()

@router.post("/api/about", response_model=CreatorOut)
def create(
    creator: CreatorIn,
    repo: AboutQueries = Depends()
):
    return repo.create(creator)

@router.get("/api/about", )
def get_creators(
    repo: AboutQueries = Depends()
):
    return repo.get_creators()
