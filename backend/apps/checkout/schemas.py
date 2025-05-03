from pydantic import BaseModel


class CheckoutInput(BaseModel):
    full_name: str
    email: str
    address: str
    city: str
    country: str
    zip_code: str

