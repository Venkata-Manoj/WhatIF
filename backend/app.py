from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import time
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

class ComponentAnalyzer:
    def __init__(self):
        self.analysis_cache = {}
    
    def analyze_component(self, component_name):
        """
        4-step AI prompt chaining logic for component analysis
        """
        # Step 1: Component Understanding
        component_understanding = self._understand_component(component_name)
        
        # Step 2: Risk Identification
        risks = self._identify_risks(component_name, component_understanding)
        
        # Step 3: Preventative Strategies
        suggestions = self._generate_preventative_strategies(component_name, risks)
        
        # Step 4: Developer Checklist
        checklist = self._create_developer_checklist(component_name, suggestions)
        
        return {
            "keyPoints": component_understanding,
            "whatIfs": risks,
            "suggestions": suggestions,
            "checklist": checklist
        }
    
    def _understand_component(self, component_name):
        """Step 1: Extract purpose, user flows, and core UI/UX elements"""
        component_lower = component_name.lower()
        
        # Common component analysis patterns
        if "login" in component_lower or "signin" in component_lower:
            return [
                "Primary function: User authentication and session management",
                "Core elements: Username/email field, password field, submit button",
                "User flow: Input credentials → Validation → Authentication → Redirect",
                "Security considerations: Password handling, session management, brute force protection",
                "UX considerations: Clear error messages, loading states, forgot password flow"
            ]
        elif "signup" in component_lower or "register" in component_lower:
            return [
                "Primary function: New user account creation and onboarding",
                "Core elements: Form fields, validation, confirmation, terms acceptance",
                "User flow: Fill form → Validate → Create account → Email verification → Welcome",
                "Data handling: Input validation, password strength, duplicate prevention",
                "UX considerations: Progressive disclosure, clear requirements, success feedback"
            ]
        elif "dashboard" in component_lower:
            return [
                "Primary function: Data overview and navigation hub for authenticated users",
                "Core elements: Navigation, data widgets, action buttons, user profile access",
                "User flow: Load data → Display metrics → Enable interactions → Update views",
                "Performance considerations: Data loading, real-time updates, responsive layout",
                "UX considerations: Information hierarchy, quick actions, customization options"
            ]
        elif "checkout" in component_lower or "payment" in component_lower:
            return [
                "Primary function: Secure transaction processing and order completion",
                "Core elements: Payment forms, order summary, security badges, confirmation",
                "User flow: Review order → Enter payment → Validate → Process → Confirmation",
                "Security considerations: PCI compliance, data encryption, fraud detection",
                "UX considerations: Trust indicators, error handling, progress indication"
            ]
        elif "search" in component_lower:
            return [
                "Primary function: Content discovery and filtering interface",
                "Core elements: Search input, filters, results display, pagination",
                "User flow: Enter query → Apply filters → View results → Refine search",
                "Performance considerations: Query optimization, result caching, instant search",
                "UX considerations: Auto-complete, search suggestions, result relevance"
            ]
        else:
            # Generic component analysis
            return [
                f"Primary function: Core functionality specific to {component_name}",
                "Core elements: Main interactive components and data display areas",
                "User flow: User interaction → Processing → Feedback → Next action",
                "Technical considerations: State management, data handling, performance",
                "UX considerations: User feedback, accessibility, responsive design"
            ]
    
    def _identify_risks(self, component_name, understanding):
        """Step 2: Detect common functional and usability issues"""
        component_lower = component_name.lower()
        
        if "login" in component_lower:
            return [
                "What if users enter incorrect credentials repeatedly? (Brute force attacks)",
                "What if the login form doesn't show clear error messages? (User confusion)",
                "What if there's no 'forgot password' option? (User abandonment)",
                "What if the form doesn't handle special characters in passwords? (Login failures)",
                "What if there's no loading state during authentication? (User uncertainty)",
                "What if the form isn't accessible to screen readers? (Accessibility issues)",
                "What if users can't see their password while typing? (Usability problems)"
            ]
        elif "signup" in component_lower:
            return [
                "What if password requirements aren't clearly communicated? (Form submission failures)",
                "What if email validation fails for valid international domains? (User exclusion)",
                "What if the form doesn't prevent duplicate registrations? (Database conflicts)",
                "What if required fields aren't clearly marked? (Incomplete submissions)",
                "What if there's no email verification step? (Invalid accounts created)",
                "What if the form is too long without progress indication? (User abandonment)",
                "What if terms and conditions aren't clearly presented? (Legal compliance issues)"
            ]
        elif "dashboard" in component_lower:
            return [
                "What if data takes too long to load? (Poor user experience)",
                "What if there are too many elements on screen? (Cognitive overload)",
                "What if critical actions aren't easily accessible? (Reduced productivity)",
                "What if the layout breaks on mobile devices? (Mobile usability issues)",
                "What if real-time data updates cause performance issues? (System slowdown)",
                "What if users can't customize their view? (Reduced user satisfaction)",
                "What if error states aren't handled gracefully? (User confusion)"
            ]
        elif "checkout" in component_lower:
            return [
                "What if payment processing fails without clear error messages? (Transaction abandonment)",
                "What if users can't review their order before payment? (Purchase disputes)",
                "What if the form doesn't validate payment information properly? (Failed transactions)",
                "What if there are hidden fees revealed at the last step? (Cart abandonment)",
                "What if the page isn't secure (no HTTPS)? (Security concerns)",
                "What if users can't save payment methods for future use? (Reduced convenience)",
                "What if the confirmation page doesn't provide order details? (Customer confusion)"
            ]
        else:
            return [
                f"What if {component_name} doesn't handle edge cases properly? (Unexpected failures)",
                f"What if users can't understand how to use {component_name}? (Usability issues)",
                f"What if {component_name} performs poorly under load? (Performance degradation)",
                f"What if {component_name} isn't accessible to all users? (Accessibility violations)",
                f"What if {component_name} doesn't work on mobile devices? (Mobile compatibility issues)",
                f"What if {component_name} doesn't provide adequate feedback? (User uncertainty)",
                f"What if {component_name} has security vulnerabilities? (Security risks)"
            ]
    
    def _generate_preventative_strategies(self, component_name, risks):
        """Step 3: Suggest fixes and optimizations before development starts"""
        component_lower = component_name.lower()
        
        if "login" in component_lower:
            return [
                "Implement progressive rate limiting (3 attempts → CAPTCHA, 5 attempts → temporary lock)",
                "Design clear, specific error messages without revealing system details",
                "Add prominent 'Forgot Password' link with secure reset flow",
                "Use proper input validation for all character sets and formats",
                "Show loading spinner with 'Authenticating...' message during login",
                "Ensure ARIA labels and proper focus management for accessibility",
                "Add password visibility toggle with secure implementation"
            ]
        elif "signup" in component_lower:
            return [
                "Display password requirements dynamically as user types",
                "Use comprehensive email regex that supports international domains",
                "Implement server-side duplicate checking with clear user feedback",
                "Use visual indicators (asterisks, colors) for required fields",
                "Build robust email verification with resend options",
                "Break long forms into steps with clear progress indicators",
                "Make terms and conditions easily accessible with clear consent UI"
            ]
        elif "dashboard" in component_lower:
            return [
                "Implement skeleton screens and progressive data loading",
                "Use progressive disclosure and prioritize most important information",
                "Create floating action buttons or quick access toolbar",
                "Design mobile-first with collapsible sections and touch-friendly controls",
                "Use efficient data fetching strategies (pagination, caching, debouncing)",
                "Provide customizable widgets and layout options",
                "Design comprehensive error boundaries with retry mechanisms"
            ]
        elif "checkout" in component_lower:
            return [
                "Provide detailed error messages with suggested solutions",
                "Include order summary sidebar that updates in real-time",
                "Implement client and server-side validation for all payment fields",
                "Display all costs upfront with clear breakdown",
                "Ensure HTTPS, display security badges, and use trusted payment processors",
                "Offer guest checkout and secure payment method storage options",
                "Create detailed confirmation page with order tracking information"
            ]
        else:
            return [
                f"Implement comprehensive error handling and edge case management for {component_name}",
                f"Design intuitive user interface with clear navigation and instructions",
                f"Optimize performance with lazy loading, caching, and efficient algorithms",
                f"Follow WCAG guidelines for accessibility compliance",
                f"Use responsive design principles and test on multiple devices",
                f"Provide clear feedback for all user actions and system states",
                f"Conduct security review and implement appropriate protection measures"
            ]
    
    def _create_developer_checklist(self, component_name, suggestions):
        """Step 4: Summarize into a concise developer checklist"""
        return [
            "✅ Implement proper input validation and sanitization",
            "✅ Add comprehensive error handling with user-friendly messages",
            "✅ Ensure responsive design works across all device sizes",
            "✅ Test accessibility with screen readers and keyboard navigation",
            "✅ Implement loading states and progress indicators",
            "✅ Add proper security measures and data protection",
            "✅ Test edge cases and error scenarios thoroughly",
            "✅ Optimize performance and monitor load times",
            "✅ Implement proper state management and data flow",
            "✅ Add analytics and monitoring for production issues",
            "✅ Create comprehensive unit and integration tests",
            "✅ Review and test user experience flow end-to-end"
        ]

# Initialize the analyzer
analyzer = ComponentAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze_component():
    try:
        data = request.get_json()
        
        if not data or 'component' not in data:
            return jsonify({'error': 'Component name is required'}), 400
        
        component_name = data['component'].strip()
        
        if not component_name:
            return jsonify({'error': 'Component name cannot be empty'}), 400
        
        # Simulate processing time for better UX
        time.sleep(1)
        
        # Analyze the component
        analysis = analyzer.analyze_component(component_name)
        
        return jsonify({
            'success': True,
            'component': component_name,
            'analysis': analysis
        })
        
    except Exception as e:
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'What IF Component Analyzer'})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=True, host='0.0.0.0', port=port)