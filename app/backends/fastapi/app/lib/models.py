from sqlmodel import SQLModel, Field

class Template(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    structure: str
