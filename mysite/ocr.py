import pytesseract
import os
pytesseract.pytesseract.tesseract_cmd = "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"

def ocr(file_path):
    # image_path = os.path.join(BASE_DIR,"temp",file.name)
    try:
        return pytesseract.image_to_string(file_path,lang='pan+hin')
    except Exception as e:
        return e
    # os.remove(image_path)