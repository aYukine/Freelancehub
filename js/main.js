// Global variables
let currentUser = null;
let currentChatUser = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkAuthStatus();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize page-specific functionality
    initializePage();
    
    // Initialize mobile menu
    initializeMobileMenu();
});

// Check authentication status
function checkAuthStatus() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateNavigation();
    }
}

// Update navigation based on auth status
function updateNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;
    
    if (currentUser) {
        // User is logged in
        navMenu.innerHTML = `
            <li><a href="index.html" class="nav-link">Home</a></li>
            <li><a href="jobs.html" class="nav-link">Jobs</a></li>
            <li><a href="developers.html" class="nav-link">Developers</a></li>
            <li><a href="chat.html" class="nav-link">Messages</a></li>
            <li><a href="profile.html" class="nav-link">Profile</a></li>
            <li><a href="#" class="nav-link" onclick="logout()">Logout</a></li>
        `;
    }
}

// Initialize navigation highlighting
function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

// Initialize page-specific functionality
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initializeHomePage();
            break;
        case 'jobs.html':
            initializeJobsPage();
            break;
        case 'developers.html':
            initializeDevelopersPage();
            break;
        case 'login.html':
            initializeLoginPage();
            break;
        case 'signup.html':
            initializeSignupPage();
            break;
        case 'chat.html':
            initializeChatPage();
            break;
        case 'profile.html':
            initializeProfilePage();
            break;
        case 'post-job.html':
            initializePostJobPage();
            break;
    }
}

// Home page initialization
function initializeHomePage() {
    loadRecentJobs();
    loadTopDevelopers();
}

// Load recent jobs for home page
function loadRecentJobs() {
    const jobsGrid = document.getElementById('homeJobsGrid');
    if (!jobsGrid) return;
    
    // Get first 3 jobs
    const recentJobs = testJobs.slice(0, 3);
    jobsGrid.innerHTML = recentJobs.map(job => createJobCard(job)).join('');
}

// Load top developers for home page
function loadTopDevelopers() {
    const developersGrid = document.getElementById('homeDevelopersGrid');
    if (!developersGrid) return;
    
    // Get freelancers only, sorted by rating
    const topDevelopers = testUsers
        .filter(user => user.userType === 'freelancer')
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
    
    developersGrid.innerHTML = topDevelopers.map(developer => createDeveloperCard(developer)).join('');
}

// Jobs page initialization
function initializeJobsPage() {
    loadAllJobs();
    initializeJobFilters();
}

// Load all jobs
function loadAllJobs() {
    const jobsGrid = document.getElementById('jobsGrid');
    if (!jobsGrid) return;
    
    jobsGrid.innerHTML = testJobs.map(job => createJobCard(job)).join('');
}

// Initialize job filters
function initializeJobFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const paymentFilter = document.getElementById('paymentFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterJobs);
    }
    if (paymentFilter) {
        paymentFilter.addEventListener('change', filterJobs);
    }
    if (experienceFilter) {
        experienceFilter.addEventListener('change', filterJobs);
    }
    if (searchInput) {
        searchInput.addEventListener('input', filterJobs);
    }
}

// Filter jobs based on criteria
function filterJobs() {
    const category = document.getElementById('categoryFilter')?.value || '';
    const payment = document.getElementById('paymentFilter')?.value || '';
    const experience = document.getElementById('experienceFilter')?.value || '';
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    let filteredJobs = testJobs.filter(job => {
        const matchesCategory = !category || job.category === category;
        const matchesPayment = !payment || job.paymentType === payment;
        const matchesExperience = !experience || job.experienceLevel === experience;
        const matchesSearch = !search || 
            job.title.toLowerCase().includes(search) ||
            job.description.toLowerCase().includes(search) ||
            job.skills.some(skill => skill.toLowerCase().includes(search));
        
        return matchesCategory && matchesPayment && matchesExperience && matchesSearch;
    });
    
    const jobsGrid = document.getElementById('jobsGrid');
    if (jobsGrid) {
        jobsGrid.innerHTML = filteredJobs.map(job => createJobCard(job)).join('');
    }
}

// Developers page initialization
function initializeDevelopersPage() {
    loadAllDevelopers();
    initializeDeveloperFilters();
}

// Load all developers
function loadAllDevelopers() {
    const developersGrid = document.getElementById('developersGrid');
    if (!developersGrid) return;
    
    const developers = testUsers.filter(user => user.userType === 'freelancer');
    developersGrid.innerHTML = developers.map(developer => createDeveloperCard(developer)).join('');
}

// Initialize developer filters
function initializeDeveloperFilters() {
    const skillFilter = document.getElementById('skillFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const hourlyRateFilter = document.getElementById('hourlyRateFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (skillFilter) {
        // Populate skill filter options
        const allSkills = [...new Set(testUsers
            .filter(user => user.userType === 'freelancer')
            .flatMap(user => user.skills))];
        
        skillFilter.innerHTML = '<option value="">All Skills</option>' +
            allSkills.map(skill => `<option value="${skill}">${skill}</option>`).join('');
        
        skillFilter.addEventListener('change', filterDevelopers);
    }
    if (ratingFilter) {
        ratingFilter.addEventListener('change', filterDevelopers);
    }
    if (hourlyRateFilter) {
        hourlyRateFilter.addEventListener('change', filterDevelopers);
    }
    if (searchInput) {
        searchInput.addEventListener('input', filterDevelopers);
    }
}

// Filter developers based on criteria
function filterDevelopers() {
    const skill = document.getElementById('skillFilter')?.value || '';
    const rating = document.getElementById('ratingFilter')?.value || '';
    const hourlyRate = document.getElementById('hourlyRateFilter')?.value || '';
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    let filteredDevelopers = testUsers.filter(user => {
        if (user.userType !== 'freelancer') return false;
        
        const matchesSkill = !skill || user.skills.includes(skill);
        const matchesRating = !rating || user.rating >= parseFloat(rating);
        const matchesHourlyRate = !hourlyRate || 
            (hourlyRate === 'under-50' && user.hourlyRate < 50) ||
            (hourlyRate === '50-100' && user.hourlyRate >= 50 && user.hourlyRate <= 100) ||
            (hourlyRate === 'over-100' && user.hourlyRate > 100);
        const matchesSearch = !search ||
            user.name.toLowerCase().includes(search) ||
            user.title.toLowerCase().includes(search) ||
            user.skills.some(userSkill => userSkill.toLowerCase().includes(search));
        
        return matchesSkill && matchesRating && matchesHourlyRate && matchesSearch;
    });
    
    const developersGrid = document.getElementById('developersGrid');
    if (developersGrid) {
        developersGrid.innerHTML = filteredDevelopers.map(developer => createDeveloperCard(developer)).join('');
    }
}

// Create job card HTML
function createJobCard(job) {
    const paymentDisplay = job.paymentType === 'project' 
        ? `$${job.budget.toLocaleString()}` 
        : `$${job.hourlyRate}/hr`;
    
    return `
        <div class="job-card">
            <div class="job-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <p class="job-company">${job.company}</p>
                </div>
                <div class="job-price">${paymentDisplay}</div>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-skills">
                ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            <div class="job-footer">
                <span class="job-type">${job.paymentType === 'project' ? 'Fixed Price' : 'Hourly'}</span>
                <span>${job.applications} proposals</span>
                <span>Posted ${formatDate(job.postedDate)}</span>
            </div>
        </div>
    `;
}

// Create developer card HTML
function createDeveloperCard(developer) {
    return `
        <div class="developer-card">
            <div class="developer-avatar">${developer.avatar}</div>
            <h3 class="developer-name">${developer.name}</h3>
            <p class="developer-title">${developer.title}</p>
            <div class="developer-rating">
                <div class="stars">
                    ${generateStars(developer.rating)}
                </div>
                <span>${developer.rating}</span>
            </div>
            <div class="developer-stats">
                <div class="stat">
                    <span class="stat-number">${developer.completedProjects}</span>
                    <span class="stat-label">Projects</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${developer.rating}</span>
                    <span class="stat-label">Rating</span>
                </div>
            </div>
            <div class="developer-skills">
                ${developer.skills.slice(0, 3).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                ${developer.skills.length > 3 ? '<span class="skill-tag">+' + (developer.skills.length - 3) + ' more</span>' : ''}
            </div>
            <div class="developer-hourly">$${developer.hourlyRate}/hr</div>
            <button class="btn btn-primary" onclick="contactDeveloper(${developer.id})">Contact</button>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
}

// Login page initialization
function initializeLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', handleSocialLogin);
    });
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Find user in test data
    const user = testUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login successful
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showAlert('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showAlert('Invalid email or password. Try: developer@test.com or client@test.com with password: password123', 'error');
    }
}

// Handle social login
function handleSocialLogin(e) {
    const platform = e.target.classList.contains('google') ? 'Google' :
                    e.target.classList.contains('linkedin') ? 'LinkedIn' : 'Facebook';
    
    showAlert(`${platform} login will be implemented with actual OAuth integration.`, 'info');
}

// Signup page initialization
function initializeSignupPage() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Social signup buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', handleSocialLogin);
    });
    
    // Skills input
    initializeSkillsInput();
}

// Handle signup form submission
function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        id: testUsers.length + 1,
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        userType: formData.get('userType'),
        title: formData.get('title') || '',
        skills: [],
        rating: 0,
        completedProjects: 0,
        joinDate: new Date().toISOString().split('T')[0]
    };
    
    // Get skills from input
    const skillsInput = document.getElementById('skills');
    if (skillsInput && skillsInput.value) {
        userData.skills = skillsInput.value.split(',').map(s => s.trim()).filter(s => s);
    }
    
    // Add user to test data (in real app, this would be sent to backend)
    testUsers.push(userData);
    
    showAlert('Account created successfully! Redirecting to login...', 'success');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// Initialize skills input with autocomplete
function initializeSkillsInput() {
    const skillsInput = document.getElementById('skills');
    if (!skillsInput) return;
    
    // Create skills container for tags
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'skills-tags';
    skillsInput.parentNode.insertBefore(skillsContainer, skillsInput);
    
    let selectedSkills = [];
    
    // Handle Enter and comma for adding skills
    skillsInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addSkill(this.value.trim());
            this.value = '';
        }
    });
    
    // Handle blur for adding skills
    skillsInput.addEventListener('blur', function() {
        if (this.value.trim()) {
            addSkill(this.value.trim());
            this.value = '';
        }
    });
    
    function addSkill(skill) {
        if (skill && !selectedSkills.includes(skill)) {
            selectedSkills.push(skill);
            updateSkillsDisplay();
        }
    }
    
    function removeSkill(skill) {
        selectedSkills = selectedSkills.filter(s => s !== skill);
        updateSkillsDisplay();
    }
    
    function updateSkillsDisplay() {
        skillsContainer.innerHTML = selectedSkills.map(skill => 
            `<span class="skill-tag-removable">
                ${skill}
                <span class="remove" onclick="removeSkill('${skill}')">&times;</span>
            </span>`
        ).join('');
        
        // Update hidden input value
        skillsInput.value = selectedSkills.join(', ');
    }
    
    // Make removeSkill globally accessible
    window.removeSkill = removeSkill;
}

// Chat page initialization
function initializeChatPage() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    loadChatContacts();
    initializeChatInput();
}

// Load chat contacts
function loadChatContacts() {
    const chatContacts = document.getElementById('chatContacts');
    if (!chatContacts) return;
    
    // Get other users (excluding current user)
    const otherUsers = testUsers.filter(user => user.id !== currentUser.id);
    
    chatContacts.innerHTML = otherUsers.map(user => `
        <div class="chat-contact" onclick="openChat(${user.id})">
            <div class="chat-avatar">${user.avatar}</div>
            <div class="chat-info">
                <h4>${user.name}</h4>
                <p>${user.title}</p>
            </div>
        </div>
    `).join('');
}

// Open chat with specific user
function openChat(userId) {
    currentChatUser = testUsers.find(user => user.id === userId);
    if (!currentChatUser) return;
    
    // Update chat header
    const chatHeader = document.querySelector('.chat-header');
    if (chatHeader) {
        chatHeader.innerHTML = `
            <div class="chat-avatar">${currentChatUser.avatar}</div>
            <div>
                <h3>${currentChatUser.name}</h3>
                <p>${currentChatUser.title}</p>
            </div>
        `;
    }
    
    // Load chat messages
    loadChatMessages();
}

// Load chat messages
function loadChatMessages() {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages || !currentChatUser) return;
    
    // Get messages between current user and chat user
    const messages = testChatMessages[1] || []; // Using test data
    
    chatMessages.innerHTML = messages.map(message => {
        const isSent = message.senderId === currentUser.id;
        const time = new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        return `
            <div class="message ${isSent ? 'sent' : 'received'}">
                ${message.message}
                <div class="message-time">${time}</div>
            </div>
        `;
    }).join('');
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize chat input
function initializeChatInput() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    
    if (chatInput && sendButton) {
        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Send message
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput || !currentChatUser || !chatInput.value.trim()) return;
    
    const message = chatInput.value.trim();
    chatInput.value = '';
    
    // Add message to chat (in real app, this would be sent to backend)
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const messageHTML = `
            <div class="message sent">
                ${message}
                <div class="message-time">${time}</div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', messageHTML);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Profile page initialization
function initializeProfilePage() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    loadUserProfile();
}

// Load user profile
function loadUserProfile() {
    const profileContainer = document.querySelector('.profile-container');
    if (!profileContainer) return;
    
    const user = currentUser;
    
    if (user.userType === 'freelancer') {
        profileContainer.innerHTML = `
            <div class="profile-header">
                <div class="profile-avatar">${user.avatar}</div>
                <div class="profile-info">
                    <h1>${user.name}</h1>
                    <p class="profile-title">${user.title}</p>
                    <div class="profile-rating">
                        <div class="stars">${generateStars(user.rating)}</div>
                        <span>${user.rating} (${user.completedProjects} reviews)</span>
                    </div>
                    <div class="profile-stats">
                        <div class="stat">
                            <span class="stat-number">${user.completedProjects}</span>
                            <span class="stat-label">Projects Completed</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">$${user.hourlyRate}/hr</span>
                            <span class="stat-label">Hourly Rate</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="profile-sections">
                <div class="profile-section">
                    <h3>About</h3>
                    <p>${user.description || 'No description available.'}</p>
                </div>
                
                <div class="profile-section">
                    <h3>Skills</h3>
                    <div class="developer-skills">
                        ${user.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                
                <div class="profile-section">
                    <h3>Portfolio</h3>
                    ${user.portfolio ? user.portfolio.map(item => `
                        <div class="portfolio-item">
                            <h4>${item.title}</h4>
                            <p>${item.description}</p>
                            <div class="developer-skills">
                                ${item.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                    `).join('') : '<p>No portfolio items yet.</p>'}
                </div>
                
                <div class="profile-section">
                    <h3>Reviews</h3>
                    <p>Reviews will be displayed here when available.</p>
                </div>
            </div>
        `;
    } else {
        // Client profile
        profileContainer.innerHTML = `
            <div class="profile-header">
                <div class="profile-avatar">${user.avatar}</div>
                <div class="profile-info">
                    <h1>${user.name}</h1>
                    <p class="profile-title">${user.title} at ${user.company}</p>
                    <div class="profile-stats">
                        <div class="stat">
                            <span class="stat-number">${user.postedJobs || 0}</span>
                            <span class="stat-label">Jobs Posted</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">$${(user.totalSpent || 0).toLocaleString()}</span>
                            <span class="stat-label">Total Spent</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="profile-sections">
                <div class="profile-section">
                    <h3>About</h3>
                    <p>${user.description || 'No description available.'}</p>
                </div>
                
                <div class="profile-section">
                    <h3>Posted Jobs</h3>
                    <div class="jobs-grid">
                        ${testJobs.filter(job => job.clientId === user.id).map(job => createJobCard(job)).join('') || '<p>No jobs posted yet.</p>'}
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-20">
                <a href="post-job.html" class="btn btn-primary">Post New Job</a>
            </div>
        `;
    }
}

// Post job page initialization
function initializePostJobPage() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    initializeJobPostForm();
}

// Initialize job post form
function initializeJobPostForm() {
    const jobForm = document.getElementById('jobForm');
    if (jobForm) {
        jobForm.addEventListener('submit', handleJobPost);
    }
    
    // Pricing type selection
    const pricingOptions = document.querySelectorAll('.pricing-option');
    pricingOptions.forEach(option => {
        option.addEventListener('click', function() {
            pricingOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            const type = this.dataset.type;
            document.getElementById('paymentType').value = type;
            
            // Show/hide relevant price inputs
            const budgetGroup = document.getElementById('budgetGroup');
            const hourlyGroup = document.getElementById('hourlyGroup');
            
            if (type === 'project') {
                budgetGroup.style.display = 'block';
                hourlyGroup.style.display = 'none';
            } else {
                budgetGroup.style.display = 'none';
                hourlyGroup.style.display = 'block';
            }
        });
    });
    
    // Initialize skills input for job post
    initializeJobSkillsInput();
}

// Initialize skills input for job posting
function initializeJobSkillsInput() {
    const skillsInput = document.getElementById('jobSkills');
    if (!skillsInput) return;
    
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'skills-tags';
    skillsInput.parentNode.insertBefore(skillsContainer, skillsInput);
    
    let selectedSkills = [];
    
    skillsInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addJobSkill(this.value.trim());
            this.value = '';
        }
    });
    
    skillsInput.addEventListener('blur', function() {
        if (this.value.trim()) {
            addJobSkill(this.value.trim());
            this.value = '';
        }
    });
    
    function addJobSkill(skill) {
        if (skill && !selectedSkills.includes(skill)) {
            selectedSkills.push(skill);
            updateJobSkillsDisplay();
        }
    }
    
    function removeJobSkill(skill) {
        selectedSkills = selectedSkills.filter(s => s !== skill);
        updateJobSkillsDisplay();
    }
    
    function updateJobSkillsDisplay() {
        skillsContainer.innerHTML = selectedSkills.map(skill => 
            `<span class="skill-tag-removable">
                ${skill}
                <span class="remove" onclick="removeJobSkill('${skill}')">&times;</span>
            </span>`
        ).join('');
        
        skillsInput.value = selectedSkills.join(', ');
    }
    
    window.removeJobSkill = removeJobSkill;
}

// Handle job post form submission
function handleJobPost(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const jobData = {
        id: testJobs.length + 1,
        title: formData.get('title'),
        company: currentUser.company || currentUser.name,
        clientId: currentUser.id,
        description: formData.get('description'),
        skills: formData.get('skills').split(',').map(s => s.trim()).filter(s => s),
        paymentType: formData.get('paymentType'),
        budget: formData.get('paymentType') === 'project' ? parseInt(formData.get('budget')) : null,
        hourlyRate: formData.get('paymentType') === 'hourly' ? parseInt(formData.get('hourlyRate')) : null,
        duration: formData.get('duration'),
        experienceLevel: formData.get('experienceLevel'),
        category: formData.get('category'),
        postedDate: new Date().toISOString().split('T')[0],
        deadline: formData.get('deadline'),
        status: 'open',
        applications: 0,
        location: formData.get('location') || 'Remote'
    };
    
    // Add job to test data
    testJobs.unshift(jobData);
    
    showAlert('Job posted successfully! Redirecting to jobs page...', 'success');
    
    setTimeout(() => {
        window.location.href = 'jobs.html';
    }, 1500);
}

// Contact developer function
function contactDeveloper(developerId) {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // In a real application, this would open a chat or contact form
    showAlert('Chat functionality will redirect to messaging system.', 'info');
    setTimeout(() => {
        window.location.href = 'chat.html';
    }, 1500);
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showAlert('Logged out successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Show alert messages
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Insert at top of page
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alert, container.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Utility function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
