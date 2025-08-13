class WhatIfApp {
    constructor() {
        this.apiUrl = localStorage.getItem('apiUrl') || 'http://localhost:5001';
        this.currentAnalysis = null;
        this.savedAnalyses = JSON.parse(localStorage.getItem('savedAnalyses') || '[]');
        
        this.initializeElements();
        this.bindEvents();
        this.loadSettings();
        this.updateSavedAnalysesList();
    }

    initializeElements() {
        // Main elements
        this.componentInput = document.getElementById('componentInput');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.loadingContainer = document.getElementById('loadingContainer');
        this.resultsSection = document.getElementById('resultsSection');
        this.errorContainer = document.getElementById('errorContainer');
        this.errorText = document.getElementById('errorText');
        this.retryBtn = document.getElementById('retryBtn');

        // Result lists
        this.keyPointsList = document.getElementById('keyPointsList');
        this.whatIfsList = document.getElementById('whatIfsList');
        this.suggestionsList = document.getElementById('suggestionsList');
        this.checklistList = document.getElementById('checklistList');

        // Navigation and modals
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.sidebar = document.getElementById('sidebar');
        this.newPromptBtn = document.getElementById('newPromptBtn');
        this.savedBtn = document.getElementById('savedBtn');
        this.settingsBtn = document.getElementById('settingsBtn');

        // Action buttons
        this.saveBtn = document.getElementById('saveBtn');
        this.exportBtn = document.getElementById('exportBtn');

        // Modals
        this.savedModal = document.getElementById('savedModal');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeSavedModal = document.getElementById('closeSavedModal');
        this.closeSettingsModal = document.getElementById('closeSettingsModal');
        this.savedResultsList = document.getElementById('savedResultsList');

        // Settings
        this.apiUrlInput = document.getElementById('apiUrl');
        this.darkModeToggle = document.getElementById('darkMode');
        this.saveSettingsBtn = document.getElementById('saveSettingsBtn');

        // Suggestion chips
        this.suggestionChips = document.querySelectorAll('.suggestion-chip');
    }

    bindEvents() {
        // Main functionality
        this.analyzeBtn.addEventListener('click', () => this.analyzeComponent());
        this.componentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.analyzeComponent();
            }
        });
        this.retryBtn.addEventListener('click', () => this.analyzeComponent());

        // Mobile menu
        this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());

        // Navigation
        this.newPromptBtn.addEventListener('click', () => this.newAnalysis());
        this.savedBtn.addEventListener('click', () => this.showSavedModal());
        this.settingsBtn.addEventListener('click', () => this.showSettingsModal());

        // Action buttons
        this.saveBtn.addEventListener('click', () => this.saveAnalysis());
        this.exportBtn.addEventListener('click', () => this.exportToPDF());

        // Modal controls
        this.closeSavedModal.addEventListener('click', () => this.hideSavedModal());
        this.closeSettingsModal.addEventListener('click', () => this.hideSettingsModal());
        this.savedModal.addEventListener('click', (e) => {
            if (e.target === this.savedModal) this.hideSavedModal();
        });
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) this.hideSettingsModal();
        });

        // Settings
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.darkModeToggle.addEventListener('change', () => this.toggleDarkMode());

        // Suggestion chips
        this.suggestionChips.forEach(chip => {
            chip.addEventListener('click', () => {
                this.componentInput.value = chip.dataset.suggestion;
                this.componentInput.focus();
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.analyzeComponent();
                        break;
                    case 's':
                        e.preventDefault();
                        if (this.currentAnalysis) this.saveAnalysis();
                        break;
                    case 'e':
                        e.preventDefault();
                        if (this.currentAnalysis) this.exportToPDF();
                        break;
                }
            }
            if (e.key === 'Escape') {
                this.hideSavedModal();
                this.hideSettingsModal();
                this.closeMobileMenu();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.sidebar.contains(e.target) && !this.mobileMenuToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    async analyzeComponent() {
        const component = this.componentInput.value.trim();
        
        if (!component) {
            this.showError('Please enter a component name');
            this.componentInput.focus();
            return;
        }

        try {
            this.showLoading();
            
            const response = await fetch(`${this.apiUrl}/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ component })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.success) {
                this.currentAnalysis = {
                    component: data.component,
                    analysis: data.analysis,
                    timestamp: new Date().toISOString(),
                    id: Date.now().toString()
                };
                this.displayResults(data.analysis);
                this.hideLoading();
                this.hideError();
            } else {
                throw new Error(data.error || 'Analysis failed');
            }
            
        } catch (error) {
            console.error('Analysis error:', error);
            this.hideLoading();
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                this.showError('Cannot connect to the analysis service. Please check if the backend is running and the API URL is correct.');
            } else {
                this.showError(error.message || 'Analysis failed. Please try again.');
            }
        }
    }

    displayResults(analysis) {
        this.populateList(this.keyPointsList, analysis.keyPoints);
        this.populateList(this.whatIfsList, analysis.whatIfs);
        this.populateList(this.suggestionsList, analysis.suggestions);
        this.populateList(this.checklistList, analysis.checklist);
        
        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    populateList(listElement, items) {
        listElement.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listElement.appendChild(li);
        });
    }

    showLoading() {
        this.loadingContainer.style.display = 'block';
        this.resultsSection.style.display = 'none';
        this.errorContainer.style.display = 'none';
        this.analyzeBtn.disabled = true;
        this.analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Analyzing...</span>';
    }

    hideLoading() {
        this.loadingContainer.style.display = 'none';
        this.analyzeBtn.disabled = false;
        this.analyzeBtn.innerHTML = '<i class="fas fa-search"></i><span>Run Analysis</span>';
    }

    showError(message) {
        this.errorText.textContent = message;
        this.errorContainer.style.display = 'block';
        this.resultsSection.style.display = 'none';
        this.loadingContainer.style.display = 'none';
    }

    hideError() {
        this.errorContainer.style.display = 'none';
    }

    saveAnalysis() {
        if (!this.currentAnalysis) return;

        // Check if already saved
        const existingIndex = this.savedAnalyses.findIndex(
            analysis => analysis.component === this.currentAnalysis.component
        );

        if (existingIndex >= 0) {
            // Update existing
            this.savedAnalyses[existingIndex] = this.currentAnalysis;
            this.showToast('Analysis updated!', 'success');
        } else {
            // Add new
            this.savedAnalyses.unshift(this.currentAnalysis);
            this.showToast('Analysis saved!', 'success');
        }

        // Limit to 50 saved analyses
        if (this.savedAnalyses.length > 50) {
            this.savedAnalyses = this.savedAnalyses.slice(0, 50);
        }

        localStorage.setItem('savedAnalyses', JSON.stringify(this.savedAnalyses));
        this.updateSavedAnalysesList();
    }

    exportToPDF() {
        if (!this.currentAnalysis) return;

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Title
            doc.setFontSize(20);
            doc.setFont(undefined, 'bold');
            doc.text('What IF - Component Analysis Report', 20, 30);
            
            // Component name
            doc.setFontSize(16);
            doc.text(`Component: ${this.currentAnalysis.component}`, 20, 50);
            
            // Date
            doc.setFontSize(12);
            doc.setFont(undefined, 'normal');
            const date = new Date(this.currentAnalysis.timestamp).toLocaleString();
            doc.text(`Generated: ${date}`, 20, 65);
            
            let yPosition = 85;
            const lineHeight = 7;
            const maxWidth = 170;
            
            // Helper function to add section
            const addSection = (title, items, icon = '•') => {
                doc.setFontSize(14);
                doc.setFont(undefined, 'bold');
                doc.text(title, 20, yPosition);
                yPosition += 10;
                
                doc.setFontSize(10);
                doc.setFont(undefined, 'normal');
                
                items.forEach(item => {
                    const lines = doc.splitTextToSize(`${icon} ${item}`, maxWidth);
                    lines.forEach(line => {
                        if (yPosition > 270) {
                            doc.addPage();
                            yPosition = 30;
                        }
                        doc.text(line, 25, yPosition);
                        yPosition += lineHeight;
                    });
                    yPosition += 2; // Extra space between items
                });
                
                yPosition += 10; // Space between sections
            };
            
            // Add sections
            addSection('Key Implementation Points', this.currentAnalysis.analysis.keyPoints);
            addSection('What-If Scenarios', this.currentAnalysis.analysis.whatIfs, '?');
            addSection('Prevention Strategies', this.currentAnalysis.analysis.suggestions, '→');
            addSection('Developer Checklist', this.currentAnalysis.analysis.checklist, '✓');
            
            // Save the PDF
            const filename = `what-if-analysis-${this.currentAnalysis.component.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`;
            doc.save(filename);
            
            this.showToast('PDF exported successfully!', 'success');
            
        } catch (error) {
            console.error('PDF export error:', error);
            this.showToast('Failed to export PDF', 'error');
        }
    }

    newAnalysis() {
        this.componentInput.value = '';
        this.componentInput.focus();
        this.currentAnalysis = null;
        this.resultsSection.style.display = 'none';
        this.errorContainer.style.display = 'none';
        this.loadingContainer.style.display = 'none';
        this.setActiveNavItem(this.newPromptBtn);
    }

    toggleMobileMenu() {
        this.sidebar.classList.toggle('open');
    }

    closeMobileMenu() {
        this.sidebar.classList.remove('open');
    }

    showSavedModal() {
        this.savedModal.style.display = 'flex';
        this.setActiveNavItem(this.savedBtn);
    }

    hideSavedModal() {
        this.savedModal.style.display = 'none';
    }

    showSettingsModal() {
        this.settingsModal.style.display = 'flex';
        this.setActiveNavItem(this.settingsBtn);
    }

    hideSettingsModal() {
        this.settingsModal.style.display = 'none';
    }

    updateSavedAnalysesList() {
        if (this.savedAnalyses.length === 0) {
            this.savedResultsList.innerHTML = '<p class="empty-state">No saved analyses yet</p>';
            return;
        }

        this.savedResultsList.innerHTML = this.savedAnalyses.map((analysis, index) => `
            <div class="saved-item" data-index="${index}">
                <div class="saved-item-header">
                    <h4>${analysis.component}</h4>
                    <div class="saved-item-actions">
                        <button class="load-btn" onclick="app.loadSavedAnalysis(${index})">
                            <i class="fas fa-eye"></i> Load
                        </button>
                        <button class="delete-btn" onclick="app.deleteSavedAnalysis(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <p class="saved-item-date">${new Date(analysis.timestamp).toLocaleString()}</p>
            </div>
        `).join('');
    }

    loadSavedAnalysis(index) {
        const analysis = this.savedAnalyses[index];
        if (analysis) {
            this.currentAnalysis = analysis;
            this.componentInput.value = analysis.component;
            this.displayResults(analysis.analysis);
            this.hideSavedModal();
            this.setActiveNavItem(this.newPromptBtn);
        }
    }

    deleteSavedAnalysis(index) {
        if (confirm('Are you sure you want to delete this analysis?')) {
            this.savedAnalyses.splice(index, 1);
            localStorage.setItem('savedAnalyses', JSON.stringify(this.savedAnalyses));
            this.updateSavedAnalysesList();
            this.showToast('Analysis deleted', 'success');
        }
    }

    loadSettings() {
        this.apiUrlInput.value = this.apiUrl;
        
        const darkMode = localStorage.getItem('darkMode') === 'true';
        this.darkModeToggle.checked = darkMode;
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    saveSettings() {
        const newApiUrl = this.apiUrlInput.value.trim();
        if (newApiUrl) {
            this.apiUrl = newApiUrl;
            localStorage.setItem('apiUrl', this.apiUrl);
        }

        const darkMode = this.darkModeToggle.checked;
        localStorage.setItem('darkMode', darkMode);
        
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        this.hideSettingsModal();
        this.showToast('Settings saved!', 'success');
    }

    toggleDarkMode() {
        const darkMode = this.darkModeToggle.checked;
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    setActiveNavItem(activeItem) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        activeItem.classList.add('active');
    }

    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add toast styles if not already present
        if (!document.querySelector('#toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                .toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 12px 16px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    z-index: 3000;
                    animation: slideInRight 0.3s ease;
                    min-width: 250px;
                }
                .toast-success { border-left: 4px solid #10b981; }
                .toast-error { border-left: 4px solid #ef4444; }
                .toast-info { border-left: 4px solid #2563eb; }
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .toast-success i { color: #10b981; }
                .toast-error i { color: #ef4444; }
                .toast-info i { color: #2563eb; }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WhatIfApp();
});

// Add some additional utility functions
window.addEventListener('beforeunload', (e) => {
    // Save any pending data
    if (window.app && window.app.currentAnalysis) {
        // Optional: Auto-save current analysis
    }
});

// Handle network status
window.addEventListener('online', () => {
    if (window.app) {
        window.app.showToast('Connection restored', 'success');
    }
});

window.addEventListener('offline', () => {
    if (window.app) {
        window.app.showToast('Connection lost - working offline', 'info');
    }
});