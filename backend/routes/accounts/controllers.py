from flask import request, jsonify
import uuid
import os.path
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from ... import db
from .models import Account
from ..resumes.models import Resume
from .util import *

# ----------------------------------------------- #

# Query Object Methods => https://docs.sqlalchemy.org/en/14/orm/query.html#sqlalchemy.orm.Query
# Session Object Methods => https://docs.sqlalchemy.org/en/14/orm/session_api.html#sqlalchemy.orm.Session
# How to serialize SqlAlchemy PostgreSQL Query to JSON => https://stackoverflow.com/a/46180522
  
def list_all_accounts_controller():
    accounts = Account.query.all()
    response = []
    util_func()
    for account in accounts: response.append(account.toDict()) 
    return jsonify(response)

def create_account_controller():
    request_form = request.get_json()
    id = str(uuid.uuid4())
    new_account = Account( 
                          id             = id,
                          email          = request_form['email'],
                          username       = request_form['username'],
                          dob            = request_form['dob'],
                          country        = request_form['country'],
                          phone_number   = request_form['phone_number'],
                          )
    db.session.add(new_account)
    db.session.commit()
    
    response = Account.query.get(id).toDict()
    return jsonify(response)

def retrieve_account_controller(account_id):
    response = Account.query.get(account_id).toDict()
    return jsonify(response)

def update_account_controller(account_id):
    request_form = request.get_json()
    account = Account.query.get(account_id)
    
    account.email        = request_form['email']
    account.username     = request_form['username']
    account.dob          = request_form['dob']
    account.country      = request_form['country']
    account.phone_number = request_form['phone_number']
    db.session.commit()
    
    response = Account.query.get(account_id).toDict()
    return jsonify(response)
    
def delete_account_controller(account_id):
    Account.query.filter_by(id=account_id).delete()
    db.session.commit()
    
    return ('Account with Id "{}" deleted successfully!').format(account_id)

def upload_resume_controller(account_id, job_id):
    file = request.files['file']
    print(file)
    filename = file.filename
    print(filename)
    resume_file = file.read()

    id = str(uuid.uuid4())

    # Create a new resume record in the database
    new_resume = Resume(id             = id,
                        account_id=account_id, 
                        resume_file=resume_file, 
                        resume_filename=filename, 
                        job_id=job_id)
    db.session.add(new_resume)
    db.session.commit()

    response = Resume.query.get(id).toDict()
    print(response)
    return jsonify(response.serialize())