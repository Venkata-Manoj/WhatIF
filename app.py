from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import re

app = Flask(__name__)
CORS(app)

class ComponentAnalyzer:
    def __init__(self):
        self.component_patterns = {
            'login': {
                'purpose': 'User authentication and access control',
                'flows': ['Input validation', 'Credential verification', 'Session management', 'Error handling'],
                'elements': ['Username/email field', 'Password field', 'Submit button', 'Remember me', 'Forgot password link']
            },
            'form': {
                'purpose': 'Data collection and user input',
                'flows': ['Input validation', 'Data submission', 'Success/error feedback', 'Form reset'],
                'elements': ['Input fields', 'Validation messages', 'Submit button', 'Cancel button']
            },
            'navigation': {
                'purpose': 'Site structure and user guidance',
                'flows': ['Menu expansion', 'Route navigation', 'Breadcrumb tracking', 'Search functionality'],
                'elements': ['Menu items', 'Dropdowns', 'Search bar', 'Breadcrumbs']
            },
            'dashboard': {
                'purpose': 'Data visualization and overview',
                'flows': ['Data loading', 'Filtering', 'Sorting', 'Real-time updates'],
                'elements': ['Charts', 'Tables', 'Filters', 'Action buttons']
            }
        }
    
    def analyze_component(self, component_name):
        """Main analysis method using prompt chaining approach"""
        
        # Step 1: Component Understanding
        component_info = self._understand_component(component_name)
        
        # Step 2: Risk Identification
        risks = self._identify_risks(component_info)
        
        # Step 3: Preventative Strategies
        suggestions = self._generate_suggestions(component_info, risks)
        
        # Step 4: Developer Checklist
        checklist = self._create_checklist(component_info, risks, suggestions)
        
        return {
            'keyPoints': component_info['key_points'],
            'whatIfs': risks['scenarios'],
            'suggestions': suggestions['strategies'],
            'checklist': checklist['items']
        }
    
    def _understand_component(self, component_name):
        """Step 1: Extract purpose, flows, and elements"""
        component_lower = component_name.lower()
        
        # Find matching patterns
        matched_pattern = None
        for key, pattern in self.component_patterns.items():
            if key in component_lower:
                matched_pattern = pattern
                break
        
        if not matched_pattern:
            # Generic component analysis
            matched_pattern = {
                'purpose': 'User interface component for data interaction',
                'flows': ['User input', 'Data processing', 'Response handling', 'State management'],
                'elements': ['Interactive elements', 'Display areas', 'Control buttons', 'Feedback mechanisms']
            }
        
        return {
            'name': component_name,
            'purpose': matched_pattern['purpose'],
            'flows': matched_pattern['flows'],
            'elements': matched_pattern['elements'],
            'key_points': [
                f"Purpose: {matched_pattern['purpose']}",
                f"Primary user flows: {', '.join(matched_pattern['flows'])}",
                f"Core UI elements: {', '.join(matched_pattern['elements'])}",
                "Requires proper error handling and validation",
                "Must be accessible and responsive across devices"
            ]
        }
    
    def _identify_risks(self, component_info):
        """Step 2: Detect common functional and usability issues"""
        risks = {
            'scenarios': [
                "What if the user enters invalid data?",
                "What if the component fails to load?",
                "What if the user has slow internet connection?",
                "What if the user is on a mobile device?",
                "What if the user has accessibility needs?",
                "What if the component receives unexpected data?",
                "What if the user tries to submit multiple times?",
                "What if the component is used in different contexts?"
            ]
        }
        
        # Add component-specific risks
        if 'login' in component_info['name'].lower():
            risks['scenarios'].extend([
                "What if the user forgets their password?",
                "What if the user enters wrong credentials multiple times?",
                "What if the session expires during login?"
            ])
        elif 'form' in component_info['name'].lower():
            risks['scenarios'].extend([
                "What if the user navigates away before submitting?",
                "What if the form data is corrupted?",
                "What if the user tries to submit empty fields?"
            ])
        
        return risks
    
    def _generate_suggestions(self, component_info, risks):
        """Step 3: Suggest fixes and optimizations"""
        suggestions = {
            'strategies': [
                "Implement comprehensive input validation with clear error messages",
                "Add loading states and skeleton screens for better UX",
                "Use progressive enhancement for offline/limited connectivity",
                "Ensure mobile-first responsive design with touch-friendly interactions",
                "Follow WCAG guidelines for accessibility compliance",
                "Implement proper error boundaries and fallback states",
                "Add rate limiting and debouncing for user actions",
                "Use semantic HTML and ARIA labels for screen readers"
            ]
        }
        
        # Add component-specific suggestions
        if 'login' in component_info['name'].lower():
            suggestions['strategies'].extend([
                "Implement account lockout after failed attempts",
                "Add password strength indicators and requirements",
                "Use secure session management with proper expiration"
            ])
        elif 'form' in component_info['name'].lower():
            suggestions['strategies'].extend([
                "Add auto-save functionality for long forms",
                "Implement form validation in real-time",
                "Add confirmation dialogs for destructive actions"
            ])
        
        return suggestions
    
    def _create_checklist(self, component_info, risks, suggestions):
        """Step 4: Summarize into concise checklist"""
        checklist = {
            'items': [
                "✓ Input validation and error handling implemented",
                "✓ Responsive design tested on multiple devices",
                "✓ Accessibility features (ARIA, keyboard navigation) added",
                "✓ Loading states and error boundaries configured",
                "✓ Cross-browser compatibility verified",
                "✓ Performance optimization (lazy loading, debouncing) applied",
                "✓ Security measures (CSRF, XSS protection) implemented",
                "✓ User feedback and confirmation dialogs added"
            ]
        }
        
        # Add component-specific checklist items
        if 'login' in component_info['name'].lower():
            checklist['items'].extend([
                "✓ Password security and session management configured",
                "✓ Account lockout and recovery mechanisms added"
            ])
        elif 'form' in component_info['name'].lower():
            checklist['items'].extend([
                "✓ Form validation and auto-save implemented",
                "✓ Data persistence and recovery mechanisms added"
            ])
        
        return checklist

# Initialize analyzer
analyzer = ComponentAnalyzer()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        component_name = data.get('component', '').strip()
        
        if not component_name:
            return jsonify({'error': 'Component name is required'}), 400
        
        # Run analysis
        result = analyzer.analyze_component(component_name)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)