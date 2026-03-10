// ===== DARK MODE TOGGLE =====
const darkModeBtn = document.getElementById('darkModeBtn');
const htmlElement = document.documentElement;

// Initialize dark mode from localStorage
function initializeDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeBtn.textContent = '☀️';
    }
}

// Toggle dark mode
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    darkModeBtn.textContent = isDarkMode ? '☀️' : '🌙';
});

// ===== MOBILE NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== RESUME FORM HANDLING =====
const resumeForm = document.getElementById('resumeForm');

// Update preview in real-time
resumeForm.addEventListener('input', updateResumePreview);
resumeForm.addEventListener('change', updateResumePreview);

function updateResumePreview() {
    // Get form values
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const email = document.getElementById('email').value || 'email@example.com';
    const phone = document.getElementById('phone').value || '+1 (555) 123-4567';
    const university = document.getElementById('university').value || 'XYZ University';
    const degree = document.getElementById('degree').value || 'Bachelor of Science';
    const field = document.getElementById('field').value || 'Computer Science';
    const graduationYear = document.getElementById('graduationYear').value || '2025';
    const gpa = document.getElementById('gpa').value || '';
    const skills = document.getElementById('skills').value || 'Skill 1, Skill 2';
    const jobTitle = document.getElementById('jobTitle').value;
    const company = document.getElementById('company').value;
    const jobDescription = document.getElementById('jobDescription').value;
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;

    // Update preview - Name, Email, Phone
    document.getElementById('previewName').textContent = fullName;
    document.getElementById('previewEmail').textContent = email;
    document.getElementById('previewPhone').textContent = phone;

    // Update Education
    const gpaText = gpa ? ` | GPA: ${gpa}` : '';
    document.getElementById('previewEducation').innerHTML = `
        <p><strong>${university}</strong></p>
        <p>${degree} in ${field}</p>
        <p class="small-text">Expected Graduation: ${graduationYear}${gpaText}</p>
    `;

    // Update Skills
    const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    const skillsHTML = skillsArray.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    document.getElementById('previewSkills').innerHTML = skillsHTML || '<span class="skill-tag">Add your skills</span>';

    // Update Experience
    if (jobTitle || company || jobDescription) {
        document.getElementById('experienceSection').style.display = 'block';
        document.getElementById('previewExperience').innerHTML = `
            <p><strong>${jobTitle || 'Job Title'}</strong> - ${company || 'Company Name'}</p>
            <p>${jobDescription || 'Job description goes here.'}</p>
        `;
    } else {
        document.getElementById('experienceSection').style.display = 'none';
    }

    // Update Projects
    if (projectName || projectDescription) {
        document.getElementById('projectSection').style.display = 'block';
        document.getElementById('previewProject').innerHTML = `
            <p><strong>${projectName || 'Project Name'}</strong></p>
            <p>${projectDescription || 'Project description goes here.'}</p>
        `;
    } else {
        document.getElementById('projectSection').style.display = 'none';
    }
}

// ===== PROFILE PHOTO UPLOAD =====
const profilePhotoInput = document.getElementById('profilePhoto');

profilePhotoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            document.getElementById('previewPhoto').src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Initialize preview on page load
updateResumePreview();

// ===== DOWNLOAD RESUME AS PDF =====
function downloadResumePDF() {
    const resumeContent = document.getElementById('resumePreview');
    
    // Create a new window for printing
    const printWindow = window.open('', '', 'width=800,height=600');
    
    // Get the resume HTML
    const resumeHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Resume</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.4;
                    color: #2c3e50;
                    page-break-inside: avoid;
                }
                
                .resume-preview {
                    padding: 30px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                
                .resume-header {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #3498db;
                }
                
                .resume-photo-container {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 2px solid #3498db;
                }
                
                .resume-photo-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .resume-header h1 {
                    font-size: 24px;
                    margin-bottom: 5px;
                }
                
                .preview-contact {
                    font-size: 13px;
                    opacity: 0.7;
                    margin: 2px 0;
                }
                
                .resume-section {
                    margin-bottom: 15px;
                    page-break-inside: avoid;
                }
                
                .resume-section h3 {
                    color: #3498db;
                    font-size: 14px;
                    page-break-inside: avoid;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    border-bottom: 1px solid #ecf0f1;
                    padding-bottom: 5px;
                }
                
                .resume-section p {
                    margin: 3px 0;
                    font-size: 13px;
                }
                
                .small-text {
                    font-size: 12px;
                    opacity: 0.7;
                }
                
                .skills-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                }
                
                .skill-tag {
                    background-color: #3498db;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 15px;
                    font-size: 12px;
                }
                
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    .resume-preview {
                        padding: 20px;
                    }
                }
            </style>
        </head>
        <body>
            ${resumeContent.innerHTML}
        </body>
        </html>
    `;
    
    // Write the HTML to the print window
    printWindow.document.write(resumeHTML);
    printWindow.document.close();
    
    // Trigger print dialog
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        // Optionally close the window after printing
        printWindow.onafterprint = function() {
            printWindow.close();
        };
    }, 250);
}

// ===== TEMPLATE SELECTION =====
function selectTemplate(templateName) {
    const resumePreview = document.getElementById('resumePreview');
    
    // Remove all template classes
    resumePreview.classList.remove('template-1', 'template-2', 'template-3');
    
    // Add selected template class
    resumePreview.classList.add(templateName);
    
    // Show notification
    showNotification(`Template "${templateName.replace('template-', 'Template ')}" applied successfully!`);
}

// ===== NOTIFICATION FUNCTION =====
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    
    // Validate form
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address');
        return;
    }
    
    // Show success message (in a real app, this would send to a server)
    showNotification('Message sent successfully! We will get back to you soon.');
    
    // Log the message (for demonstration)
    console.log('Contact Form Submission:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    });
    
    // Reset form
    contactForm.reset();
});

// ===== RESUME FORM SUBMISSION =====
resumeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate required fields
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const university = document.getElementById('university').value;
    const degree = document.getElementById('degree').value;
    const field = document.getElementById('field').value;
    const graduationYear = document.getElementById('graduationYear').value;
    const skills = document.getElementById('skills').value;
    
    if (!fullName || !email || !phone || !university || !degree || !field || !graduationYear || !skills) {
        showNotification('Please fill in all required fields (marked with *)');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address');
        return;
    }
    
    showNotification('Resume updated successfully!');
    console.log('Resume Data:', {
        fullName,
        email,
        phone,
        university,
        degree,
        field,
        graduationYear,
        skills,
        timestamp: new Date().toISOString()
    });
});

// ===== SMOOTH SCROLLING FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe template cards and profile cards
document.querySelectorAll('.template-card, .profile-card, .tip-card').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ===== FORM INPUT VALIDATION =====
// Phone number validation
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    // Allow only numbers, spaces, +, (, ), and -
    e.target.value = e.target.value.replace(/[^0-9+\s()\-]/g, '');
});

// Email validation with visual feedback
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#e74c3c';
    } else {
        emailInput.style.borderColor = '';
    }
});

// Contact email validation
const contactEmailInput = document.getElementById('contactEmail');
contactEmailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (contactEmailInput.value && !emailRegex.test(contactEmailInput.value)) {
        contactEmailInput.style.borderColor = '#e74c3c';
    } else {
        contactEmailInput.style.borderColor = '';
    }
});

// GPA validation (0-4.0)
const gpaInput = document.getElementById('gpa');
gpaInput.addEventListener('input', (e) => {
    if (e.target.value > 4) {
        e.target.value = 4;
    }
    if (e.target.value < 0) {
        e.target.value = 0;
    }
});

// ===== KEYBOARD NAVIGATION =====
// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== INITIALIZATION =====
// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    
    // Add focus styles to form inputs
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.style.outline = 'none';
        });
    });
});

// ===== EXPORT RESUME DATA AS JSON =====
function exportResumeData() {
    const data = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        university: document.getElementById('university').value,
        degree: document.getElementById('degree').value,
        field: document.getElementById('field').value,
        graduationYear: document.getElementById('graduationYear').value,
        gpa: document.getElementById('gpa').value,
        skills: document.getElementById('skills').value,
        jobTitle: document.getElementById('jobTitle').value,
        company: document.getElementById('company').value,
        jobDescription: document.getElementById('jobDescription').value,
        projectName: document.getElementById('projectName').value,
        projectDescription: document.getElementById('projectDescription').value
    };
    
    // Create a blob and download
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume_data_${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Resume data exported as JSON');
}

// ===== IMPORT RESUME DATA FROM JSON =====
function importResumeData(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        document.getElementById('fullName').value = data.fullName || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('university').value = data.university || '';
        document.getElementById('degree').value = data.degree || '';
        document.getElementById('field').value = data.field || '';
        document.getElementById('graduationYear').value = data.graduationYear || '';
        document.getElementById('gpa').value = data.gpa || '';
        document.getElementById('skills').value = data.skills || '';
        document.getElementById('jobTitle').value = data.jobTitle || '';
        document.getElementById('company').value = data.company || '';
        document.getElementById('jobDescription').value = data.jobDescription || '';
        document.getElementById('projectName').value = data.projectName || '';
        document.getElementById('projectDescription').value = data.projectDescription || '';
        
        updateResumePreview();
        showNotification('Resume data imported successfully!');
    } catch (error) {
        showNotification('Error importing resume data. Please check the JSON format.');
        console.error('Import error:', error);
    }
}

// ===== PRINT RESUME =====
function printResume() {
    window.print();
}

// Log app initialization
console.log('%c=== Student Resume Making App ===', 'color: #3498db; font-size: 16px; font-weight: bold;');
console.log('%cWelcome! This app helps you create a professional resume.', 'color: #27ae60; font-size: 12px;');
console.log('%cFeatures:', 'color: #f39c12; font-weight: bold;');
console.log('✓ Dark mode toggle\n✓ Responsive design\n✓ PDF download\n✓ Live preview\n✓ Template selection');
console.log('%cTips: Use exportResumeData() and importResumeData(json) in console for advanced features.', 'color: #e74c3c; font-size: 11px;');
