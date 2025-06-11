import json

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