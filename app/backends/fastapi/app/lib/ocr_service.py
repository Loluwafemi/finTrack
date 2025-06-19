import pytesseract
from PIL import Image
from io import BytesIO
from pdf2image import convert_from_bytes

def extract_text_from_image(file: bytes) -> str:
    image = Image.open(BytesIO(file))
    return pytesseract.image_to_string(image)

def extract_text_from_pdf(file: bytes) -> str:
    images = convert_from_bytes(file)
    text = ""
    for img in images:
        text += pytesseract.image_to_string(img) + "\n"
    return text
