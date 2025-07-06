document.addEventListener('DOMContentLoaded', () => {
    // Function to handle section activation
    function activateSection(section) {
        const currentSection = document.querySelector('.section.active');
        if (currentSection) {
            currentSection.classList.remove('active');
            currentSection.classList.add('fade-out');
        }

        setTimeout(() => {
            section.classList.add('active');
            section.classList.remove('fade-out');
        }, 100);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Add fade-out animation to current section
            const currentSection = document.querySelector('.section.active');
            if (currentSection) {
                currentSection.classList.remove('active');
                currentSection.classList.add('fade-out');
            }

            // Scroll to target section
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Add fade-in animation to target section
                setTimeout(() => {
                    targetSection.classList.add('active');
                    targetSection.classList.remove('fade-out');
                }, 100);
            }, 300);
        });
    });

    // Handle manual scrolling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // Clear the timeout if it exists
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        // Set a new timeout
        scrollTimeout = setTimeout(() => {
            const sections = document.querySelectorAll('.section');
            let currentSection = null;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                // If section is more than 50% visible in the viewport
                if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
                    currentSection = section;
                }
            });

            if (currentSection && !currentSection.classList.contains('active')) {
                activateSection(currentSection);
            }
        }, 100); // Small delay to prevent too many calculations
    });

    // Initialize first section as active
    document.querySelector('.section').classList.add('active');

    // Skills Categories Logic
    const skillsCategories = document.querySelectorAll('.skills-category');
    const skillsPanels = document.querySelectorAll('.skills-panel');

    skillsCategories.forEach(category => {
        category.addEventListener('click', function() {
            skillsCategories.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const selected = this.getAttribute('data-category');
            skillsPanels.forEach(panel => {
                if (panel.getAttribute('data-panel') === selected) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });

    // Skill Descriptions
    const skillDescriptions = {
        'HTML5 & CSS3': 'Proficient in HTML5 and CSS3 for creating responsive and visually appealing web pages.',
        'JavaScript': 'Experienced in JavaScript for dynamic and interactive web applications.',
        'React': 'Skilled in React for building user interfaces and single-page applications.',
        'Next.js': 'Familiar with Next.js for server-rendered React applications.',
        'MongoDB': 'Knowledgeable in MongoDB for NoSQL database management.',
        'MySQL': 'Proficient in MySQL for relational database management.',
        'Responsive Design': 'Experienced in creating responsive designs that work on all devices.',
        'C#': 'Proficient in C# for building robust applications and backend services.',
        'Flexibility': 'Adaptable to changing requirements and environments with ease.',
        'Adaptability': 'Quick to learn and adapt to new technologies and methodologies.',
        'Teamwork': 'Collaborative team player with strong communication and coordination skills.'
    };

    // Add hover listeners for all skills
    function addSkillHoverListeners() {
        document.querySelectorAll('.skills-list li').forEach(li => {
            li.addEventListener('mouseenter', function() {
                const skill = this.getAttribute('data-skill');
                document.getElementById('skill-description').textContent = skillDescriptions[skill] || '';
            });
            li.addEventListener('mouseleave', function() {
                document.getElementById('skill-description').textContent = 'Hover over a skill to see its description.';
            });
        });
    }
    addSkillHoverListeners();

    // Project Modal Functionality
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const projectCards = document.querySelectorAll('.project-card');

    // Project data
    const projectData = {
        project1: {
            title: "Justine's Cargo Services Information and Operation System",
            description: "A comprehensive web application built with MERN STACK that allows users to manage their cargo services and operations. This system is designed to increase efficiency and management of cargo services, operations, inventory, profiling, and more.",
            technologies: [
                { name: "React", icon: "fab fa-react" },
                { name: "Node.js", icon: "fab fa-node-js" },
                { name: "Express", icon: "fas fa-server" },
                { name: "MongoDB", icon: "fas fa-database" },
                { name: "JavaScript", icon: "fab fa-js" },
                { name: "Chakra UI", icon: "fas fa-leaf" }
            ],
            images: ["Portfolio/dashboard.jpg", "Portfolio/billing.jpg", "Portfolio/schedule.jpg"],
            github: "#",
            demo: "#"
        },
        project2: {
            title: "Project 2",
            description: "Description of your second project goes here.",
            technologies: ["Technology 1", "Technology 2", "Technology 3"],
            images: ["Portfolio/dashboard.jpg", "Portfolio/billing.jpg", "Portfolio/schedule.jpg"],
            github: "#",
            demo: "#"
        },
        project3: {
            title: "Project 3",
            description: "Description of your third project goes here.",
            technologies: ["Technology 1", "Technology 2", "Technology 3"],
            images: ["Portfolio/dashboard.jpg", "Portfolio/billing.jpg", "Portfolio/schedule.jpg"],
            github: "#",
            demo: "#"
        }
    };

    // Open modal when project card is clicked
    projectCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Prevent double trigger if View More button is clicked
            if (event.target.classList.contains('view-more-btn')) return;
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-description').textContent = project.description;
                
                // --- Carousel Logic ---
                const carouselTrack = document.querySelector('.carousel-track');
                const carouselDots = document.querySelector('.carousel-dots');
                const leftArrow = document.querySelector('.carousel-arrow.left');
                const rightArrow = document.querySelector('.carousel-arrow.right');
                // Clear previous images and dots
                carouselTrack.innerHTML = '';
                carouselDots.innerHTML = '';
                // Add images
                project.images.forEach((image, idx) => {
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = 'Project Image';
                    img.className = 'project-image';
                    if (idx === 0) img.classList.add('active');
                    carouselTrack.appendChild(img);
                    // Dots
                    const dot = document.createElement('span');
                    dot.className = 'dot' + (idx === 0 ? ' active' : '');
                    dot.addEventListener('click', () => showCarouselImage(idx));
                    carouselDots.appendChild(dot);
                });
                let currentImgIdx = 0;
                function showCarouselImage(idx) {
                    const imgs = carouselTrack.querySelectorAll('img');
                    const dots = carouselDots.querySelectorAll('.dot');
                    imgs.forEach((img, i) => {
                        img.classList.toggle('active', i === idx);
                    });
                    dots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === idx);
                    });
                    currentImgIdx = idx;
                }
                leftArrow.onclick = () => {
                    let idx = (currentImgIdx - 1 + project.images.length) % project.images.length;
                    showCarouselImage(idx);
                };
                rightArrow.onclick = () => {
                    let idx = (currentImgIdx + 1) % project.images.length;
                    showCarouselImage(idx);
                };
                // --- Animated Tech Badges with Tooltips ---
                const techList = document.getElementById('modal-tech');
                techList.innerHTML = '';
                project.technologies.forEach(tech => {
                    const li = document.createElement('li');
                    if (tech.icon) {
                        const icon = document.createElement('i');
                        icon.className = tech.icon;
                        icon.style.marginRight = '0.7em';
                        li.appendChild(icon);
                    }
                    li.appendChild(document.createTextNode(tech.name));
                    // Add tooltip if available
                    let tooltip = '';
                    switch (tech.name) {
                        case 'React': tooltip = 'Frontend UI Library'; break;
                        case 'Node.js': tooltip = 'Backend Runtime'; break;
                        case 'Express': tooltip = 'Web Framework'; break;
                        case 'MongoDB': tooltip = 'NoSQL Database'; break;
                        case 'JavaScript': tooltip = 'Programming Language'; break;
                        case 'Chakra UI': tooltip = 'React UI Component Library'; break;
                    }
                    if (tooltip) li.setAttribute('data-tooltip', tooltip);
                    techList.appendChild(li);
                });
                
                modal.style.display = 'block';
            }
        });
        // Add click event for the View More button inside the card
        const viewMoreBtn = card.querySelector('.view-more-btn');
        if (viewMoreBtn) {
            viewMoreBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                card.click();
            });
        }
    });

    // Close modal when clicking the X button
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

    // Typewriter effect for subtitle
    function typeWriterEffect(element, text, speed = 80) {
        let i = 0;
        function type() {
            if (i <= text.length) {
                element.textContent = text.substring(0, i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Typewriter effect
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
        typeWriterEffect(typewriter, 'WEB DEVELOPER', 90);
    }

    // Floating particles (simple CSS/JS solution)
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.width = particle.style.height = (Math.random() * 8 + 4) + 'px';
            particle.style.opacity = Math.random() * 0.5 + 0.3;
            particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Animated stats counter
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe the stats section
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}); 