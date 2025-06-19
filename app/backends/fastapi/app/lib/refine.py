import json

def apply_template(text: str, template_json: str) -> dict:

    template = json.loads(template_json)
    result = {}
    for key, keyword in template.items():
        if keyword.lower() in text.lower():
            result[key] = f"Found {keyword}"
        else:
            result[key] = "Not found"
    return result


def refine_data(raw_text: str) -> dict:

    lines = [line.strip() for line in raw_text.splitlines() if line.strip()]
    return {
        "lines": lines,
        "total_lines": len(lines)
    }
