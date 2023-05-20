from flask import request, jsonify
import uuid
import os.path
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from ... import db
from .models import Resume

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

def create_resume_controller():
    request_form = request.form.to_dict()
    
    id = str(uuid.uuid4())
    new_resume = Resume( 
                    id           = id,
                    name         = request_form['name'],
                    price        = float(request_form['price']),
                    description  = request_form['description'],
                    image_link   = request_form['image_link'],
                    account_id   = request_form['account_id'],
                    )
    db.session.add(new_resume)
    db.session.commit()
    
    response = Resume.query.get(id).toDict()
    return jsonify(response)

def retrieve_resume_controller(resume_id):
    response = Resume.query.get(resume_id).toDict()
    return jsonify(response)

def update_resume_controller(resume_id):
    request_form = request.form.to_dict()
    resume = Resume.query.get(resume_id)
    
    resume.name        = request_form['name']
    resume.price       = float(request_form['price'])
    resume.description = request_form['description']
    resume.image_link  = request_form['image_link']
    resume.account_id  = request_form['account_id']
    db.session.commit()
    
    response = Resume.query.get(resume_id).toDict()
    return jsonify(response)
    
def delete_resume_controller(resume_id):
    Resume.query.filter_by(id=resume_id).delete()
    db.session.commit()
    
    return ('Resume with Id "{}" deleted successfully!').format(resume_id)
