from jwtdown_fastapi.authentication import Token
from .auth import authenticator
from typing import List
from pydantic import BaseModel
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
)
from models import (
    AccountIn,
    AccountOut,
    AddFriend,
    UpdateAccount,
)

router = APIRouter()

not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


class HttpError(BaseModel):
    detail: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


@router.get("/api/protected")
async def get_protected(
    request: Request,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return account_data


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    print("hashed_password from ROUTER:", hashed_password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.put("/api/accounts/{email}", response_model=bool)
async def update_account(
    email: str,
    info: UpdateAccount,
    repo: AccountQueries = Depends(),
):
    updated_account = repo.update(email, info)
    return updated_account


@router.delete("/api/accounts/{email}", response_model=bool)
async def delete_account(
    email: str,
    repo: AccountQueries = Depends(),
):
    deleted = repo.delete(email)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not found or delete failed",
        )
    return True


@router.get("/api/accounts", response_model=List[AccountOut])
async def get_all_accounts(
    repo: AccountQueries = Depends(),
):
    accounts = repo.get_all()
    return [AccountOut(**account.dict()) for account in accounts]


@router.get("/api/accounts/{email}", response_model=AccountOut | None)
async def get_account_by_email(
    email: str,
    repo: AccountQueries = Depends(),
):
    account = repo.get_by_email(email)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not found",
        )
    return AccountOut(**account.dict())


@router.put("/api/users/addfriend", response_model=AccountOut)
async def follow_a_user(
    friend: AddFriend,
    account_repo: AccountQueries = Depends()
):
    updated_account = account_repo.follow_user(friend)
    return updated_account
