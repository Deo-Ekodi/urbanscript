import requests

class GeminiAPI:
    BASE_URL = "https://api.gemini.com/v1/"  # Replace with actual base URL

    @staticmethod
    def generate_suggestions(description=None, image=None):
        url = f"{GeminiAPI.BASE_URL}/generate-suggestions"
        headers = {
            'Authorization': 'Bearer your_api_key',  # Replace with your actual API key
        }
        data = {
            'description': description,
            # Other necessary data fields...
        }
        files = {}
        if image:
            files['image'] = image

        response = requests.post(url, headers=headers, data=data, files=files)
        if response.status_code == 200:
            return response.json()  # Assuming the API returns JSON
        return None
