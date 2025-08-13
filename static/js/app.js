class WhatIFApp {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.currentResults = null;
    }

    initializeElements() {
        // Core elements
        this.componentInput = document.getElementById('componentInput');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.analyzeBtnText = document.getElementById('analyzeBtnText');
        this.analyzeBtnSpinner = document.getElementById('analyzeBtnSpinner');
        this.resultsSection = document.getElementById('resultsSection');
        this.emptyState = document.getElementById('emptyState');
        this.exportBtn = document.getElementById('exportBtn');
        
        // Result containers
        this.keyPoints = document.getElementById('keyPoints');
        this.whatIfs = document.getElementById('whatIfs');
        this.suggestions = document.getElementById('suggestions');
        this.checklist = document.getElementById('checklist');
        
        // Mobile elements
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.sidebar = document.getElementById('sidebar');
        this.newPromptBtn = document.getElementById('newPromptBtn');
    }

    bindEvents() {
        // Analysis button
        this.analyzeBtn.addEventListener('click', () => this.runAnalysis());
        
        // Enter key in input
        this.componentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.runAnalysis();
            }
        });
        
        // Export button
        this.exportBtn.addEventListener('click', () => this.exportToPDF());
        
        // Mobile menu
        this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        
        // New prompt button
        this.newPromptBtn.addEventListener('click', () => this.resetForm());
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.sidebar.contains(e.target) && !this.mobileMenuBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    async runAnalysis() {
        const componentName = this.componentInput.value.trim();
        
        if (!componentName) {
            this.showError('Please enter a component name');
            return;
        }

        this.setLoadingState(true);
        
        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ component: componentName })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const results = await response.json();
            this.currentResults = results;
            this.displayResults(results);
            this.showSuccess('Analysis completed successfully!');
            
        } catch (error) {
            console.error('Analysis failed:', error);
            this.showError('Analysis failed. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    displayResults(results) {
        // Hide empty state and show results
        this.emptyState.classList.add('hidden');
        this.resultsSection.classList.remove('hidden');
        
        // Populate each section
        this.populateList(this.keyPoints, results.keyPoints);
        this.populateList(this.whatIfs, results.whatIfs);
        this.populateList(this.suggestions, results.suggestions);
        this.populateList(this.checklist, results.checklist);
        
        // Scroll to results
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    populateList(container, items) {
        container.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-start space-x-3';
            
            const icon = document.createElement('span');
            icon.className = 'text-blue-500 mt-1 flex-shrink-0';
            icon.innerHTML = '•';
            
            const text = document.createElement('span');
            text.className = 'text-gray-700 leading-relaxed';
            text.textContent = item;
            
            li.appendChild(icon);
            li.appendChild(text);
            container.appendChild(li);
        });
    }

    setLoadingState(loading) {
        if (loading) {
            this.analyzeBtn.disabled = true;
            this.analyzeBtnText.classList.add('hidden');
            this.analyzeBtnSpinner.classList.remove('hidden');
            this.analyzeBtn.classList.add('opacity-75', 'cursor-not-allowed');
        } else {
            this.analyzeBtn.disabled = false;
            this.analyzeBtnText.classList.remove('hidden');
            this.analyzeBtnSpinner.classList.add('hidden');
            this.analyzeBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        }
    }

    exportToPDF() {
        if (!this.currentResults) {
            this.showError('No results to export');
            return;
        }

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Title
            doc.setFontSize(20);
            doc.text('What IF - Component Analysis Report', 20, 20);
            
            // Component name
            doc.setFontSize(16);
            doc.text(`Component: ${this.componentInput.value.trim()}`, 20, 40);
            
            // Date
            doc.setFontSize(12);
            doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 55);
            
            let yPosition = 75;
            const lineHeight = 8;
            const sectionSpacing = 15;
            
            // Key Implementation Points
            yPosition = this.addSectionToPDF(doc, 'Key Implementation Points', this.currentResults.keyPoints, yPosition, lineHeight);
            yPosition += sectionSpacing;
            
            // What-If Scenarios
            yPosition = this.addSectionToPDF(doc, 'What-If Scenarios', this.currentResults.whatIfs, yPosition, lineHeight);
            yPosition += sectionSpacing;
            
            // Suggestions
            yPosition = this.addSectionToPDF(doc, 'Suggestions to Prevent Issues', this.currentResults.suggestions, yPosition, lineHeight);
            yPosition += sectionSpacing;
            
            // Checklist
            this.addSectionToPDF(doc, 'Developer Checklist', this.currentResults.checklist, yPosition, lineHeight);
            
            // Save PDF
            const filename = `what-if-analysis-${this.componentInput.value.trim().toLowerCase().replace(/\s+/g, '-')}.pdf`;
            doc.save(filename);
            
            this.showSuccess('PDF exported successfully!');
            
        } catch (error) {
            console.error('PDF export failed:', error);
            this.showError('PDF export failed. Please try again.');
        }
    }

    addSectionToPDF(doc, title, items, startY, lineHeight) {
        let yPosition = startY;
        
        // Section title
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(title, 20, yPosition);
        yPosition += lineHeight + 5;
        
        // Section items
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        
        items.forEach(item => {
            // Check if we need a new page
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }
            
            doc.text(`• ${item}`, 25, yPosition);
            yPosition += lineHeight;
        });
        
        return yPosition;
    }

    toggleMobileMenu() {
        this.sidebar.classList.toggle('open');
    }

    closeMobileMenu() {
        this.sidebar.classList.remove('open');
    }

    resetForm() {
        this.componentInput.value = '';
        this.resultsSection.classList.add('hidden');
        this.emptyState.classList.remove('hidden');
        this.currentResults = null;
        this.componentInput.focus();
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
        }`;
        
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WhatIFApp();
});

// Add some example components for quick testing
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('componentInput');
    
    // Add placeholder examples
    const examples = [
        'Login Page',
        'Contact Form',
        'Navigation Menu',
        'Dashboard Widget',
        'Search Component',
        'User Profile',
        'Shopping Cart',
        'Payment Form'
    ];
    
    let currentExample = 0;
    
    // Cycle through examples in placeholder
    setInterval(() => {
        input.placeholder = `Enter a UI component like ${examples[currentExample]}`;
        currentExample = (currentExample + 1) % examples.length;
    }, 3000);
});