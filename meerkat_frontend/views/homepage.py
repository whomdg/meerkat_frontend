"""
homepage.py

A Flask Blueprint module for the homepage.
"""
from flask import Blueprint, render_template, current_app

homepage = Blueprint('homepage', __name__)

@homepage.route('/')
def index():
    return render_template('homepage/index.html', content=current_app.config['HOMEPAGE_CONFIG'])

