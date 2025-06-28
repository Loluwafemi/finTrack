"""
Define app entry points here
attach function that extract and refine data here as an api to be used publicly
Make sure an auth function is defined to authenticate user before an activity.

"""

from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {
        "status": "in progess",
        "message": "integrate the system with\nThe database api\npytesseract and sqlmodel\nThen use the user request to get required file[template] from the database, then use the user request with the fetched template to generate data\nParse result to a refining funtion and return a refined data as a response to user.\nThe Response is secured with a primary encrypted key to be acknowlege later by the next use the response on the app.",
        "request-structure": "api/id/blob-data[file]",
        "response-structure": "an encrypted json file with status:success|fail"
        }

