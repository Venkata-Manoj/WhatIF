#!/usr/bin/env python3
"""
What IF - Bug Prevention Tool Demo
Showcases the tool's capabilities with various component types
"""

import requests
import json
import time

def test_component(component_name):
    """Test a component and return the analysis results"""
    try:
        response = requests.post(
            'http://localhost:5000/analyze',
            json={'component': component_name},
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            return {'error': f'HTTP {response.status_code}: {response.text}'}
            
    except requests.exceptions.RequestException as e:
        return {'error': f'Request failed: {e}'}

def display_results(component_name, results):
    """Display analysis results in a formatted way"""
    print(f"\n{'='*60}")
    print(f"🔍 ANALYSIS RESULTS FOR: {component_name.upper()}")
    print(f"{'='*60}")
    
    if 'error' in results:
        print(f"❌ Error: {results['error']}")
        return
    
    # Key Implementation Points
    print(f"\n💡 KEY IMPLEMENTATION POINTS:")
    print(f"{'-'*40}")
    for i, point in enumerate(results['keyPoints'], 1):
        print(f"{i}. {point}")
    
    # What-If Scenarios
    print(f"\n❓ WHAT-IF SCENARIOS:")
    print(f"{'-'*40}")
    for i, scenario in enumerate(results['whatIfs'], 1):
        print(f"{i}. {scenario}")
    
    # Suggestions
    print(f"\n🛠️  SUGGESTIONS TO PREVENT ISSUES:")
    print(f"{'-'*40}")
    for i, suggestion in enumerate(results['suggestions'], 1):
        print(f"{i}. {suggestion}")
    
    # Checklist
    print(f"\n✅ DEVELOPER CHECKLIST:")
    print(f"{'-'*40}")
    for i, item in enumerate(results['checklist'], 1):
        print(f"{i}. {item}")

def main():
    """Main demo function"""
    print("🚀 What IF - Bug Prevention Tool Demo")
    print("=" * 50)
    print("This demo showcases the tool's AI-powered analysis capabilities")
    print("Testing various UI component types...")
    
    # Test components
    test_components = [
        "Login Page",
        "Contact Form", 
        "Navigation Menu",
        "Dashboard Widget",
        "Search Component",
        "User Profile",
        "Shopping Cart",
        "Payment Form"
    ]
    
    for component in test_components:
        print(f"\n🔄 Analyzing: {component}")
        results = test_component(component)
        display_results(component, results)
        time.sleep(1)  # Small delay between requests
    
    print(f"\n{'='*60}")
    print("🎉 Demo completed successfully!")
    print("The What IF tool provides comprehensive analysis for any UI component")
    print("Visit http://localhost:5000 to use the interactive web interface")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()