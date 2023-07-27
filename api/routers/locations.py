from fastapi import APIRouter, Depends, Response
from models import LocationIn, LocationOut, LocationList, Error
from queries.locations import LocationQueries
from .auth import authenticator
from typing import Union


location_api_router = APIRouter()
location_queries = LocationQueries()


@location_api_router.get(
    "/api/locations", response_model=Union[LocationList, Error]
)
async def list_locations(
    response: Response,
    repo: LocationQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to see locations")
    return LocationList(locations=repo.list_locations())


@location_api_router.get("/api/locations/{id}")
async def get_location(
    response: Response,
    id: str,
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to see location")
    location = location_queries.get_location(id)
    if not location:
        return {"Error": "Location does not exist"}
    return location


@location_api_router.post(
    "/api/locations", response_model=Union[LocationOut, Error]
)
async def create_location(
    response: Response,
    location: LocationIn,
    repo: LocationQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to create location")
    location = repo.create(location)
    return location


@location_api_router.put(
    "/api/locations/{id}", response_model=Union[LocationOut, Error]
)
async def update_location(
    response: Response,
    id: str,
    location: LocationIn,
    repo: LocationQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to edit location")
    updated_location = repo.update(id, location)
    if not updated_location:
        return {"Error": "Location does not exist"}
    return updated_location


@location_api_router.delete("/api/locations/{id}")
async def delete_location(
    response: Response,
    id: str,
    repo: LocationQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to delete location")
    deleted_location = repo.delete(id)
    if deleted_location:
        return {"acknowledged": True, "deletedCount": 1}
    return {"An error occurred", 404, f"Location with id {id} doesn't exist"}
