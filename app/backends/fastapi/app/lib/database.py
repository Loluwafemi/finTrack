from sqlmodel import SQLModel, create_engine, Session
from .models import Template
DATABASE_URL = "postgresql://samuelokuboyejo:opeyemi04@localhost:5432/finTrack"
engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session

def init_db():
    SQLModel.metadata.create_all(engine)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def populate_templates():
    templates = [
        Template(name="t-fare", structure="{ 'items': [], 'total': 0 }"),
        Template(name="equipment", structure="{ 'products': [], 'delivery': 0 }"),
        Template(name="rent", structure="{ 'machine': [], 'discount': 0 }")
    ]

    with Session(engine) as session:
        for template in templates:
            if not session.query(Template).filter(Template.name == template.name).first():
                session.add(template)
        session.commit()

if __name__ == "__main__":
    create_db_and_tables()
    populate_templates()
    print("✅ PostgreSQL tables created and data inserted.")
