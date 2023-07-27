from fastapi import (
    Depends,
    APIRouter,
    Response,
)
from queries.pets import PetQueries
from queries.accounts import AccountQueries
from models import PetIn, PetOut, PetsList, Error
from bson import ObjectId
from .auth import authenticator
from typing import Union

router = APIRouter()


@router.post("/api/pets", response_model=Union[PetOut, Error])
def create_pet(
    response: Response,
    pet: PetIn,
    repo: PetQueries = Depends(),
    account_repo: AccountQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to create pet")
    pet = repo.create(pet)
    account_repo.add_pet(pet)
    return pet


@router.get("/api/pets", response_model=Union[PetsList, Error])
def get_pets(
    response: Response,
    repo: PetQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to see pets")
    return PetsList(pets=repo.get_pets())


@router.get("/api/pets/{id}", response_model=Union[PetOut, Error])
def get_pet(
    response: Response,
    id: str,
    repo: PetQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to see pet")
    pet = repo.get_pet({"_id": ObjectId(id)})
    return pet


@router.put("/api/pets/{id}", response_model=Union[PetOut, Error])
async def update_pet(
    response: Response,
    id: str,
    pet: PetIn,
    repo: PetQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to edit pet")
    pet = repo.update_pet(id, pet)
    return pet


@router.delete("/api/pets/{id}", response_model=Union[bool, Error])
def delete_pet(
    response: Response,
    id: str,
    repo: PetQueries = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
):
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to delete pet")
    return repo.delete_pet({"_id": ObjectId(id)})
