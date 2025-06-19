from fastapi import Form, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from sqlmodel import Session
from fastapi import APIRouter, UploadFile, File, Depends
from .auth import authenticate_user, create_access_token, get_current_user
from .ocr_service import extract_text_from_image,extract_text_from_pdf
from .refine import refine_data, apply_template
from .models import Template
from .encrypt import encrypt_data
from .database import get_session


router = APIRouter()

@router.post("/upload")
async def upload_receipt(file: UploadFile = File(...), user=Depends(get_current_user)):
    raw_data = await file.read()
    if file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(raw_data)
    else:
        text = extract_text_from_image(raw_data)

    refined = refine_data(text)
    return {
        "status": "success",
        "refined_data": refined
    }

@router.post("/process")
async def process_file_with_template(
    file: UploadFile = File(...),
    template_name: str = Form(...),
    user=Depends(get_current_user),
    session: Session = Depends(get_session)
):
    template = session.query(Template).filter(Template.name == template_name).first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")

    raw_data = await file.read()
    if file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(raw_data)
    else:
        text = extract_text_from_image(raw_data)

    refined = apply_template(text, template.structure)
    encrypted = encrypt_data(refined)

    return {
        "status": "success",
        "encrypted_data": encrypted
    }


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if not authenticate_user(form_data.username, form_data.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    token = create_access_token(
        data={"sub": form_data.username},
        expires_delta=timedelta(minutes=30)
    )
    return {"access_token": token, "token_type": "bearer"}

