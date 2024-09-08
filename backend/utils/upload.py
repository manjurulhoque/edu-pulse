from fastapi import UploadFile


async def save_image(uploaded_file: UploadFile) -> str:
    file_location = f"media/images/{uploaded_file.filename}"
    with open(file_location, "wb+") as buffer:
        buffer.write(uploaded_file.file.read())
    return file_location
