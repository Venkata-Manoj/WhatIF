# What IF - Demo Guide

## 🚀 Quick Demo

### Step 1: Start the Application
```bash
./start.sh
```

The startup script will:
- Install dependencies if needed
- Start the backend on port 5001
- Start the frontend on port 8000
- Display access URLs

### Step 2: Open Your Browser
Navigate to: **http://localhost:8000**

### Step 3: Try These Examples

#### Example 1: Login Page Analysis
1. Type "Login Page" in the input field
2. Click "Run Analysis" or press Enter
3. Review the 4 sections of analysis results
4. Try saving the analysis
5. Export to PDF to see the formatted report

#### Example 2: E-commerce Component
1. Click on the "Shopping Cart" suggestion chip
2. Run the analysis
3. Notice how the analysis is tailored to e-commerce concerns
4. Compare with the Login Page results

#### Example 3: Custom Component
1. Enter your own component name like:
   - "User Profile Settings"
   - "File Upload Widget" 
   - "Real-time Chat Interface"
   - "Data Visualization Dashboard"
2. See how the system provides generic analysis for unknown components

### Step 4: Explore Features

#### Mobile Experience
- Resize your browser window to mobile size
- Use the hamburger menu to access navigation
- Test touch interactions on mobile device

#### Dark Mode
- Click Settings in the sidebar
- Toggle Dark Mode
- See the interface adapt to dark theme

#### Saved Analyses
- Save multiple component analyses
- Access them via the "Saved Results" section
- Load previous analyses for comparison

#### PDF Export
- Run an analysis
- Click "Export PDF"
- Review the professional report format
- Share with team members

### Step 5: API Testing (Optional)
Test the backend API directly:

```bash
# Health check
curl http://localhost:5001/health

# Analyze a component
curl -X POST http://localhost:5001/analyze \
  -H "Content-Type: application/json" \
  -d '{"component": "Dashboard"}'
```

## 🎯 Key Features Demonstrated

### 4-Step AI Analysis Chain
1. **Component Understanding** - Identifies purpose and core elements
2. **Risk Identification** - Lists potential "what-if" scenarios  
3. **Prevention Strategies** - Provides actionable suggestions
4. **Developer Checklist** - Creates quality assurance tasks

### Responsive Design
- Works seamlessly on desktop, tablet, and mobile
- Touch-friendly interface
- Collapsible navigation for small screens

### User Experience
- Loading animations during analysis
- Error handling with retry options
- Toast notifications for feedback
- Keyboard shortcuts for power users

### Data Management
- Local storage for saved analyses
- PDF export for sharing
- Settings persistence
- Offline capability for saved data

## 🛠️ Customization Demo

### Adding New Component Types
Edit `backend/app.py` in the `ComponentAnalyzer._understand_component()` method to add specialized analysis for new component types.

### Theming
Modify CSS custom properties in `frontend/styles.css` to change colors, fonts, and spacing.

### API Integration
The frontend can be configured to use different backend URLs via the Settings panel.

## 🔧 Troubleshooting Demo Scenarios

### Backend Connection Issues
1. Check if backend is running: `curl http://localhost:5001/health`
2. Verify port availability: `lsof -i :5001`
3. Check server logs: `cat server.log`

### Frontend Loading Issues
1. Ensure frontend server is running on port 8000
2. Check browser console for JavaScript errors
3. Verify all static files are loading correctly

### Analysis Failures
1. Check network connectivity in browser dev tools
2. Verify JSON format of requests
3. Test with simpler component names

## 🎉 Success Metrics

After completing the demo, you should have:
- ✅ Successfully analyzed multiple UI components
- ✅ Saved and loaded analysis results
- ✅ Exported a PDF report
- ✅ Tested mobile responsiveness
- ✅ Explored dark mode
- ✅ Used keyboard shortcuts
- ✅ Understood the 4-step analysis process

## 📞 Next Steps

1. **Deploy to Production**: Use the deployment instructions in README.md
2. **Customize for Your Team**: Add your specific component types and analysis patterns
3. **Integrate with Workflow**: Use the API to integrate with your development tools
4. **Share with Team**: Export PDFs and share component analysis results

---

**Ready to prevent bugs before they happen? Start analyzing your components now!**