from flask import Flask, render_template, request, jsonify, redirect, url_for
import os

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Routes
@app.route('/')
def home():
    """Home page - Main landing page"""
    return render_template('index.html')

@app.route('/about')
def about():
    """About page - Company information"""
    return render_template('about.html')

@app.route('/services')
def services():
    """Services page - All manufacturing services"""
    return render_template('services.html')

@app.route('/projects')
def projects():
    """Projects page - Portfolio and case studies"""
    return render_template('projects.html')

@app.route('/contact')
def contact():
    """Contact page - Contact form and information"""
    return render_template('contact.html')

@app.route('/quote')
def quote():
    """Quote page - Request quote form"""
    return render_template('quote.html')

# API Routes
@app.route('/api/contact', methods=['POST'])
def submit_contact():
    """Handle contact form submission"""
    try:
        data = request.get_json()
        
        # Extract form data
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        email = data.get('email')
        phone = data.get('phone')
        service = data.get('service')
        message = data.get('message')
        
        # Here you would typically save to database or send email
        # For now, we'll just return success
        
        return jsonify({
            'success': True,
            'message': 'Thank you for your message! We will contact you soon.'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Sorry, there was an error sending your message. Please try again.'
        }), 500

@app.route('/api/quote', methods=['POST'])
def submit_quote():
    """Handle quote request submission"""
    try:
        data = request.get_json()
        
        # Extract quote data
        company_name = data.get('companyName')
        contact_person = data.get('contactPerson')
        email = data.get('email')
        phone = data.get('phone')
        service_type = data.get('serviceType')
        project_details = data.get('projectDetails')
        timeline = data.get('timeline')
        budget_range = data.get('budgetRange')
        
        # Here you would process the quote request
        
        return jsonify({
            'success': True,
            'message': 'Quote request submitted successfully! Our team will contact you within 24 hours.'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Sorry, there was an error processing your quote request. Please try again.'
        }), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    # Create templates directory if it doesn't exist
    if not os.path.exists('templates'):
        os.makedirs('templates')
    
    # Create static directory if it doesn't exist
    if not os.path.exists('static'):
        os.makedirs('static')
        os.makedirs('static/css')
        os.makedirs('static/js')
        os.makedirs('static/images')
    
    app.run(debug=True, host='0.0.0.0', port=5000)