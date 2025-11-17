#!/bin/bash
# Simple server to run Galaxy Forge locally

echo "Starting Galaxy Forge server..."
echo "Open your browser to: http://localhost:8000"
echo "Press Ctrl+C to stop"
echo ""

python3 -m http.server 8000
