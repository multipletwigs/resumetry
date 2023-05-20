import base64
import io
import tempfile
from langchain.document_loaders import PyMuPDFLoader

def produce_question(resume_base64):
    resume_bytes = base64.b64decode(resume_base64)

    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        temp_file.write(resume_bytes)
        temp_file.seek(0)

        loader = PyMuPDFLoader(temp_file.name)
        data = loader.load()
        text = ''
        for page in data:
            text += page.page_content

    return text