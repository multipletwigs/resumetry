from flask import request
import os.path
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from ...app import app
from .controllers import *

BASE_ROUTE = "/api"

@app.route(BASE_ROUTE + "/accounts", methods=['GET', 'POST'])
def list_create_accounts():
    if request.method == 'GET': return list_all_accounts_controller()
    if request.method == 'POST': return create_account_controller()
    else: return 'Method is Not Allowed'

@app.route(BASE_ROUTE + "/accounts/<account_id>", methods=['GET', 'PUT', 'DELETE'])
def retrieve_update_destroy_account(account_id):
    if request.method == 'GET': return retrieve_account_controller(account_id)
    if request.method == 'PUT': return update_account_controller(account_id)
    if request.method == 'DELETE': return delete_account_controller(account_id)
    else: return 'Method is Not Allowed'

@app.route(BASE_ROUTE + "/accounts/<account_id>/jobs/<job_id>/upload", methods=['POST'])
def upload_resume(account_id, job_id):
    if request.method == 'POST': return upload_resume_controller(account_id, job_id)
    else: return 'Method is Not Allowed'