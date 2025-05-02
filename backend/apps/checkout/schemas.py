from pydantic import BaseModel


class CheckoutData(BaseModel):
    fullName: str
    email: str
    address: str
    city: str
    country: str
    zipCode: str


class CheckoutRequest(BaseModel):
    course_id: int
    checkout_data: CheckoutData 