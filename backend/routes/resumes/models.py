from sqlalchemy import inspect
from datetime import datetime
from flask_validator import ValidateString, ValidateNumber, ValidateURL
from sqlalchemy.orm import validates
import os.path
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from ... import db

# ----------------------------------------------- #

# SQL Datatype Objects => https://docs.sqlalchemy.org/en/14/core/types.html
class Resume(db.Model):
# Auto Generated Fields:
    id           = db.Column(db.String(50), primary_key=True, nullable=False, unique=True)
    created      = db.Column(db.DateTime(timezone=True), default=datetime.now)                           # The Date of the Instance Creation => Created one Time when Instantiation 
    updated      = db.Column(db.DateTime(timezone=True), default=datetime.now, onupdate=datetime.now)    # The Date of the Instance Update => Changed with Every Update
    
# Input by User Fields:
    resume_filename = db.Column(db.String(1000), nullable=False)
    resume_file   = db.Column(db.LargeBinary, nullable=False)

# Relations: SQLAlchemy Basic Relationship Patterns => https://docs.sqlalchemy.org/en/14/orm/basic_relationships.html
    # job    = db.relationship("Job", back_populates="Resumes")
    # job_id = db.Column(db.String(100), db.ForeignKey("job.id"))
    account    = db.relationship("Account", back_populates="resumes")
    account_id = db.Column(db.String(100), db.ForeignKey("account.id"))

    job_id = db.Column(db.String(50), nullable=False)

# Validations => https://flask-validator.readthedocs.io/en/latest/index.html
    @classmethod
    def __declare_last__(cls):
        pass
        # ValidateString(Resume.name, False, True, "The name type must be string")
        # ValidateNumber(Resume.price, True, "The price type must be number")
        # ValidateURL(Resume.image_link, True, True, "The image link is not valid")

# Set an empty string to null for name field => https://stackoverflow.com/a/57294872
    # @validates('name')
    # def empty_string_to_null(self, key, value):
    #     if isinstance(value, str) and value == '': return None
    #     else: return value
    
# How to serialize SqlAlchemy PostgreSQL Query to JSON => https://stackoverflow.com/a/46180522
    def toDict(self): 
        return { c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs }

    def __repr__(self):
        return "<%r>" % self.resume_filename