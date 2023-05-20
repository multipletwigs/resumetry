from flask import request
import os.path
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from ...app import app
from .controllers import list_all_resumes_controller, create_resume_controller, retrieve_resume_controller, update_resume_controller, delete_resume_controller

BASE_ROUTE = "/api"

@app.route(BASE_ROUTE + "/resumes", methods=['GET', 'POST'])
def list_create_resumes():
    if request.method == 'GET': return list_all_resumes_controller()
    if request.method == 'POST': return create_resume_controller()
    else: return 'Method is Not Allowed'
    
@app.route(BASE_ROUTE + "/resumes/<resume_id>", methods=['GET', 'PUT', 'DELETE'])
def retrieve_update_destroy_resume(resume_id):
    if request.method == 'GET': return retrieve_resume_controller(resume_id)
    if request.method == 'PUT': return update_resume_controller(resume_id)
    if request.method == 'DELETE': return delete_resume_controller(resume_id)
    else: return 'Method is Not Allowed'
