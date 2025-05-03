from pydantic import BaseModel
from typing import Optional

class CheckoutInput(BaseModel):
    full_name: str
    email: Optional[str] = None
    address: str
    city: str
    country: str
    zip_code: str

