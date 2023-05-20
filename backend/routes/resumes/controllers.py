from flask import request, jsonify
import uuid
import os.path
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from ... import db
from .models import Resume
from .util import *

# ----------------------------------------------- #

# Query Object Methods => https://docs.sqlalchemy.org/en/14/orm/query.html#sqlalchemy.orm.Query
# Session Object Methods => https://docs.sqlalchemy.org/en/14/orm/session_api.html#sqlalchemy.orm.Session
# How to serialize SqlAlchemy PostgreSQL Query to JSON => https://stackoverflow.com/a/46180522
  
def list_all_resumes_controller():
    resumes = Resume.query.all()
    response = []
    for resume in resumes: 
        print(resume)
        response.append(resume.toDict()) 
    return jsonify(response)

def retrieve_resume_controller(resume_id):
    response = Resume.query.get(resume_id).toDict()
    return jsonify(response)

def delete_resume_controller(resume_id):
    Resume.query.filter_by(id=resume_id).delete()
    db.session.commit()

    return ('Resume with Id "{}" deleted successfully!').format(resume_id)