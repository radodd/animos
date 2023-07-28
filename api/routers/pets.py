from fastapi import (
    Depends,
    APIRouter,
)
from queries.pets import PetQueries
from queries.accounts import AccountQueries
from models import PetIn, PetOut, PetsList, Error, UserPet
from bson import ObjectId
from typing import Union

router = APIRouter()


@router.post("/api/pets", response_model=Union[PetOut, Error])
def create_pet(
    pet: PetIn,
    repo: PetQueries = Depends(),
    account_repo: AccountQueries = Depends(),
):
    pet = repo.create(pet)
    account_repo.add_pet(pet)
    return pet


@router.get("/api/pets", response_model=Union[PetsList, Error])
def get_pets(
    repo: PetQueries = Depends(),
):
    return PetsList(pets=repo.get_pets())


@router.get("/api/pets/{id}", response_model=Union[PetOut, Error])
def get_pet(
    id: str,
    repo: PetQueries = Depends(),
):
    pet = repo.get_pet({"_id": ObjectId(id)})
    return pet


@router.put("/api/pets/{id}", response_model=Union[bool, Error])
async def update_pet(
    id: str,
    pet: UserPet,
    repo: PetQueries = Depends(),
    account_repo: AccountQueries = Depends(),
):
    updated_pet = account_repo.update_pet(id, pet)
    return updated_pet


@router.delete("/api/pets/{id}", response_model=Union[bool, Error])
def delete_pet(
    id: str,
    remove_obj: UserPet,
    repo: PetQueries = Depends(),
    account_repo: AccountQueries = Depends(),
):
    deleted_pet = repo.delete_pet({"_id": ObjectId(id)})
    account_repo.remove_pet(remove_obj)
    return deleted_pet
