import json
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_layout_prompt(image_count, image_sizes, canvas=(1080, 1920)):
    canvas_width, canvas_height = canvas
    height_per_image = canvas_height // image_count
    layout = []

    for i in range(image_count):
        layout.append({
            "x": 0,
            "y": i * height_per_image,
            "width": canvas_width,
            "height": height_per_image
        })

    return layout

@app.post("/generate")
async def generate_story(images: List[UploadFile] = File(...)):
    image_sizes = []
    for image in images:
        img = Image.open(io.BytesIO(await image.read()))
        image_sizes.append((img.width, img.height))

    layout = generate_layout_prompt(len(images), image_sizes)

    print("🔧 Returning layout:", layout)

    return {
        "layout_raw": layout,
        "image_count": len(images),
        "sizes": image_sizes
    }