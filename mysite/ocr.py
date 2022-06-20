import pytesseract
import os
import PyPDF2

pytesseract.pytesseract.tesseract_cmd = "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"

def ocr(file_path,lang):
    # image_path = os.path.join(BASE_DIR,"temp",file.name)
    try:
        if file_path.endswith(".pdf"):
            docinfo = PyPDF2.PdfFileReader(file_path)
            raw_text = ""
            for i in range(docinfo.numPages):
                raw_text += docinfo.getPage(i).extractText()
            # return pytesseract.image_to_string(pdf_to_img)
            return raw_text
        elif file_path.endswith(('.png', '.jpg', '.jpeg')):
            print(lang)
            return pytesseract.image_to_string(file_path,lang=lang)
        else:
            return "Format not Supported !"
    except Exception as e:
        return e
    # os.remove(image_path)