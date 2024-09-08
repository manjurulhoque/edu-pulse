from pydantic import BaseModel


class CategorySchema(BaseModel):
    id: int
    name: str
    description: str

    class Config:
        # orm_mode = True
        from_attributes = True
