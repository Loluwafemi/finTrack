import json
import base64

def encrypt_data(data: dict) -> str:
    return base64.b64encode(json.dumps(data).encode()).decode()
