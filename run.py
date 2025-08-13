#!/usr/bin/env python3
"""
What IF - Bug Prevention Tool
Startup script for easy application launch
"""

import sys
import os
import subprocess
import time

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 7):
        print("❌ Error: Python 3.7 or higher is required")
        print(f"Current version: {sys.version}")
        return False
    return True

def check_dependencies():
    """Check if required packages are installed"""
    try:
        import flask
        import flask_cors
        return True
    except ImportError:
        return False

def install_dependencies():
    """Install required dependencies"""
    print("📦 Installing dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies")
        return False

def start_application():
    """Start the Flask application"""
    print("🚀 Starting What IF - Bug Prevention Tool...")
    print("📍 Application will be available at: http://localhost:5000")
    print("🛑 Press Ctrl+C to stop the application")
    print("-" * 50)
    
    try:
        from app import app
        app.run(debug=True, host='0.0.0.0', port=5000)
    except KeyboardInterrupt:
        print("\n👋 Application stopped by user")
    except Exception as e:
        print(f"❌ Error starting application: {e}")

def main():
    """Main startup function"""
    print("🔍 What IF - Bug Prevention Tool")
    print("=" * 40)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Check dependencies
    if not check_dependencies():
        print("📦 Required packages not found. Installing...")
        if not install_dependencies():
            print("❌ Failed to install dependencies. Please run manually:")
            print("   pip install -r requirements.txt")
            sys.exit(1)
    
    # Start the application
    start_application()

if __name__ == "__main__":
    main()