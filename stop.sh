#!/bin/bash

# What IF - Component Bug Prevention Tool
# Stop Script

echo "🛑 Stopping What IF servers..."

# Check if PID file exists
if [ -f "server.pids" ]; then
    PIDS=$(cat server.pids)
    echo "📋 Found server PIDs: $PIDS"
    
    for PID in $PIDS; do
        if kill -0 $PID 2>/dev/null; then
            echo "🔄 Stopping process $PID..."
            kill $PID
            sleep 1
            
            # Force kill if still running
            if kill -0 $PID 2>/dev/null; then
                echo "💀 Force stopping process $PID..."
                kill -9 $PID
            fi
        fi
    done
    
    rm server.pids
    echo "✅ Servers stopped successfully"
else
    echo "⚠️  No PID file found, attempting to stop by process name..."
    
    # Try to kill by process name
    pkill -f "python3 app.py" 2>/dev/null && echo "🔧 Backend stopped"
    pkill -f "python3 -m http.server" 2>/dev/null && echo "🎨 Frontend stopped"
fi

# Clean up log files
[ -f "server.log" ] && rm server.log
[ -f "frontend.log" ] && rm frontend.log

echo "🧹 Cleanup completed"