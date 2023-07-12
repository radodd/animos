from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from .auth import authenticator

from pydantic import BaseModel

from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
)
from models import (
    Account,
    AccountIn,
    AccountOut,
)

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()


not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

@router.get("/api/protected", response_model=bool)
async def get_protected(#
    # events: EventsQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True
    # return vacations.get_account_vacations(account_data)


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


@router.put("/api/accounts/{email}", response_model=AccountToken | HttpError)
async def update_account(
    email: str,
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    # Update the account with the new information
    original_password = info.password
    hashed_password = authenticator.hash_password(info.password)
    info.password = hashed_password
    updated_account = repo.update(email, info)
    # if not updated_account:
    #     raise HTTPException(
    #         status_code=status.HTTP_404_NOT_FOUND,
    #         detail="Account not found or update failed",
    #     )
    print("updated_account from ROUTER:", updated_account)
    # Create a new token for the updated account
    form = AccountForm(username=updated_account.email, password=original_password)
    token = await authenticator.login(response, request, form, repo)

    # Return the updated account and token
    return AccountToken(account=updated_account, **token.dict())
