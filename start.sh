#!/bin/bash

# What IF - Component Bug Prevention Tool
# Startup Script

echo "🚀 Starting What IF - Component Bug Prevention Tool"
echo "=================================================="

# Check if Python3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is not installed. Please install Python3 to continue."
    exit 1
fi

# Start backend
echo "🔧 Starting backend server..."
cd backend

# Check if Flask is installed
if ! python3 -c "import flask" &> /dev/null; then
    echo "📦 Installing backend dependencies..."
    pip3 install --break-system-packages -r requirements.txt || {
        echo "❌ Failed to install dependencies. Please check your Python setup."
        exit 1
    }
fi

# Start Flask server
echo "🌐 Starting Flask server on port 5001..."
python3 app.py > ../server.log 2>&1 &
BACKEND_PID=$!

# Wait for server to start
sleep 3

# Check if server is running
if curl -s http://localhost:5001/health > /dev/null; then
    echo "✅ Backend server started successfully"
else
    echo "❌ Failed to start backend server. Check server.log for details."
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

cd ..

# Start frontend
echo "🎨 Starting frontend server..."
cd frontend

# Check if Python HTTP server is available
if command -v python3 &> /dev/null; then
    echo "🌐 Starting frontend on http://localhost:8000"
    python3 -m http.server 8000 > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    
    sleep 2
    
    echo ""
    echo "🎉 What IF is now running!"
    echo "=================================================="
    echo "Backend API: http://localhost:5001"
    echo "Frontend:    http://localhost:8000"
    echo "=================================================="
    echo ""
    echo "📖 Open your browser and go to: http://localhost:8000"
    echo ""
    echo "To stop the servers, press Ctrl+C or run:"
    echo "  kill $BACKEND_PID $FRONTEND_PID"
    echo ""
    
    # Save PIDs for easy cleanup
    echo "$BACKEND_PID $FRONTEND_PID" > ../server.pids
    
    # Keep script running
    wait $FRONTEND_PID
else
    echo "❌ Python3 HTTP server not available"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi