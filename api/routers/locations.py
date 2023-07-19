from fastapi import APIRouter, Depends
from models import LocationIn, LocationOut, LocationList
from queries.locations import LocationQueries


location_api_router = APIRouter()
location_queries = LocationQueries()


@location_api_router.get("/api/locations/", response_model=LocationList)
async def list_locations(repo: LocationQueries = Depends()):
    return LocationList(locations=repo.list_locations())


@location_api_router.get("/api/locations/{id}")
async def get_location(id: str):
    location = location_queries.get_location(id)
    if not location:
        return {"Error": "Location does not exist"}
    return location


@location_api_router.post("/api/locations", response_model=LocationOut)
async def create_location(
    location: LocationIn,
    repo: LocationQueries = Depends()
):
    location = repo.create(location)
    return location


@location_api_router.put("/api/locations/{id}", response_model=LocationOut)
async def update_location(
    id: str,
    location: LocationIn,
    repo: LocationQueries = Depends()
):
    updated_location = repo.update(id, location)
    if not updated_location:
        return {"Error": "Location does not exist"}
    return updated_location


@location_api_router.delete("/api/locations/{id}")
async def delete_location(id: str, repo: LocationQueries = Depends()):
    deleted_location = repo.delete(id)
    if deleted_location:
        return {"acknowledged": True, "deletedCount": 1}
    return {"An error occurred", 404, f"Location with id {id} doesn't exist"}
