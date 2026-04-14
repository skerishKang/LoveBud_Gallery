const allImages = [
    "community_community-discovery.png",
    "community_community-tree-detail.png",
    "community_shared-love-tree-view.png",
    "editor_desktop-love-tree-board.png",
    "editor_editor-desktop-active.png",
    "editor_editor-desktop-empty.png",
    "empty_empty-first-tree.png",
    "home_home-baseline-logged-in.png",
    "home_home-baseline-logged-out.png",
    "introduce_Gemini_Generated_Image_6d00976d00976d00.png",
    "introduce_Gemini_Generated_Image_as08okas08okas08.png",
    "login_login-my-page.png",
    "memory_memory-detail-view.png",
    "memory_story-card-view.png",
    "memory_video-album-view.png",
    "mobile_add-memory-flow.png",
    "mobile_mobile-editor-add-branch.png",
    "mobile_mobile-love-tree.png",
    "my-trees_my-trees-dashboard.png",
    "old_home1.png",
    "old_home2.png",
    "old_old-desktop-tree-board.png",
    "old_old-vertical-timeline.png",
    "old_old_home-landing.png",
    "search_search-save-video.png",
    "settings_settings-privacy.png",
    "slide_Gemini_Generated_Image_tlt4p0tlt4p0tlt4.png",
    "slide_Gemini_Generated_Image_z8g408z8g408z8g4.png",
    "slide_home-slide-01-empty-tree_bts.png",
    "slide_home-slide-01-empty-tree_safe.png",
    "slide_home-slide-02-first-memory_bts.png",
    "slide_home-slide-02-first-memory_safe.png",
    "slide_slide1.png",
    "slide_slide2.png"
];

let currentFilter = 'all';
let currentImages = [...allImages];
let currentIndex = 0;

const slideWrapper = document.getElementById('slideWrapper');
const indicators = document.getElementById('indicators');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

const IMAGE_DIR = './assets/images/';

function renderSlider() {
    slideWrapper.innerHTML = '';
    indicators.innerHTML = '';
    
    currentImages.forEach((img, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = `slide ${index === currentIndex ? 'active' : ''}`;
        
        const category = img.split('_')[0];
        const title = (img.split('_')[1] || img).replace('.png', '').replace(/-/g, ' ');

        slide.innerHTML = `
            <img src="${IMAGE_DIR}${img}" alt="${title}">
            <div class="slide-info">
                <div class="slide-category">${category}</div>
                <div class="slide-title">${title}</div>
            </div>
        `;
        slideWrapper.appendChild(slide);

        // Create indicator dot
        const dot = document.createElement('div');
        dot.className = `dot ${index === currentIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(dot);
    });

    updateCounter();
    updateSlidePositions();
}

function updateCounter() {
    counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

function updateSlidePositions() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next');
        if (index === currentIndex) {
            slide.classList.add('active');
        } else if (index === currentIndex - 1 || (currentIndex === 0 && index === currentImages.length - 1)) {
            slide.classList.add('prev');
        } else {
            slide.classList.add('next');
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    if (index < 0) index = currentImages.length - 1;
    if (index >= currentImages.length) index = 0;
    currentIndex = index;
    updateSlidePositions();
    updateCounter();
}

function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }

// Event Listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        
        currentFilter = btn.dataset.filter;
        if (currentFilter === 'all') {
            currentImages = [...allImages];
        } else {
            currentImages = allImages.filter(img => img.startsWith(currentFilter));
        }
        
        currentIndex = 0;
        renderSlider();
    });
});

// Initial Render
renderSlider();

// Touch support (Optional but good for premium feel)
let touchStartX = 0;
slideWrapper.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
slideWrapper.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
    }
});
