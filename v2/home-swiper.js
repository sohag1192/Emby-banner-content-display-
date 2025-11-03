class HomeSwiper {
    static init() {
        console.log('HomeSwiper initializing...');
        
        // Check if we're on home page
        if (!window.location.hash.includes('#!/home')) {
            return;
        }

        // Wait for Emby to be ready
        if (!window.ApiClient) {
            setTimeout(() => HomeSwiper.init(), 100);
            return;
        }

        this.setupStyles();
        this.setupBanner();
    }

    static setupStyles() {
        const styles = `
        .misty-home-banner {
            position: relative;
            width: 100%;
            height: 56vw;
            max-height: 70vh;
            min-height: 400px;
            overflow: hidden;
            background: #000;
            margin-bottom: 20px;
        }
        
        .misty-banner-slides {
            width: 100%;
            height: 100%;
            position: relative;
        }
        
        .misty-banner-slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 1s ease-in-out;
        }
        
        .misty-banner-slide.active {
            opacity: 1;
        }
        
        .misty-banner-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(0.7);
        }
        
        .misty-banner-content {
            position: absolute;
            bottom: 100px;
            left: 50px;
            max-width: 600px;
            color: white;
            z-index: 2;
        }
        
        .misty-banner-title {
            font-size: 3em;
            font-weight: bold;
            margin-bottom: 15px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        }
        
        .misty-banner-description {
            font-size: 1.2em;
            margin-bottom: 20px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .misty-banner-button {
            background: rgba(255,255,255,0.2);
            border: 2px solid #fff;
            color: #fff;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .misty-banner-button:hover {
            background: #fff;
            color: #000;
        }
        
        .misty-banner-indicators {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 2;
        }
        
        .misty-banner-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255,255,255,0.5);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .misty-banner-indicator.active {
            background: #fff;
            transform: scale(1.2);
        }
        
        .misty-banner-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.5);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .misty-banner-prev {
            left: 20px;
        }
        
        .misty-banner-next {
            right: 20px;
        }
        
        @media (max-width: 768px) {
            .misty-home-banner {
                height: 60vh;
                min-height: 300px;
            }
            
            .misty-banner-content {
                left: 20px;
                bottom: 80px;
                max-width: 90%;
            }
            
            .misty-banner-title {
                font-size: 2em;
            }
            
            .misty-banner-description {
                font-size: 1em;
            }
            
            .misty-banner-nav {
                width: 40px;
                height: 40px;
                font-size: 16px;
            }
        }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    static async setupBanner() {
        try {
            // Wait for home sections to load
            await this.waitForElement('.homeSectionsContainer');
            
            const sectionsContainer = document.querySelector('.homeSectionsContainer');
            if (!sectionsContainer) return;

            // Remove existing banner if present
            const existingBanner = document.querySelector('.misty-home-banner');
            if (existingBanner) {
                existingBanner.remove();
            }

            // Create banner
            const banner = await this.createBanner();
            if (banner) {
                sectionsContainer.insertBefore(banner, sectionsContainer.firstChild);
                this.startCarousel();
            }
        } catch (error) {
            console.error('Failed to setup banner:', error);
        }
    }

    static async createBanner() {
        try {
            const items = await this.getBannerItems();
            if (!items || items.length === 0) {
                console.log('No items found for banner');
                return null;
            }

            const banner = document.createElement('div');
            banner.className = 'misty-home-banner';
            
            const slidesHTML = items.map((item, index) => 
                this.createSlide(item, index === 0)
            ).join('');
            
            const indicatorsHTML = items.map((_, index) => `
                <div class="misty-banner-indicator ${index === 0 ? 'active' : ''}" 
                     data-index="${index}"></div>
            `).join('');

            banner.innerHTML = `
                <div class="misty-banner-slides">
                    ${slidesHTML}
                </div>
                <button class="misty-banner-nav misty-banner-prev">‹</button>
                <button class="misty-banner-nav misty-banner-next">›</button>
                <div class="misty-banner-indicators">
                    ${indicatorsHTML}
                </div>
            `;

            return banner;
        } catch (error) {
            console.error('Failed to create banner:', error);
            return null;
        }
    }

    static createSlide(item, isActive = false) {
        const backdropUrl = this.getImageUrl(item, { type: 'Backdrop', maxWidth: 1920 });
        const title = item.Name || 'Untitled';
        const description = item.Overview || 'No description available.';
        
        return `
            <div class="misty-banner-slide ${isActive ? 'active' : ''}" data-item-id="${item.Id}">
                <img class="misty-banner-image" src="${backdropUrl}" alt="${title}" loading="lazy">
                <div class="misty-banner-content">
                    <h1 class="misty-banner-title">${this.escapeHtml(title)}</h1>
                    <p class="misty-banner-description">${this.escapeHtml(description)}</p>
                    <button class="misty-banner-button" onclick="Emby.Page.showItem('${item.Id}')">
                        MORE INFO
                    </button>
                </div>
            </div>
        `;
    }

    static async getBannerItems() {
        try {
            const userId = ApiClient.getCurrentUserId();
            const query = {
                ImageTypes: 'Backdrop',
                IncludeItemTypes: 'Movie,Series',
                SortBy: 'Random',
                Recursive: true,
                Limit: 5,
                Fields: 'Overview,BackdropImageTags',
                EnableUserData: false
            };

            const url = ApiClient.getUrl(`Users/${userId}/Items`, query);
            const response = await ApiClient.getJSON(url);
            
            return response.Items || [];
        } catch (error) {
            console.error('Failed to fetch banner items:', error);
            return [];
        }
    }

    static getImageUrl(item, options) {
        if (!ApiClient.getImageUrl) return '';
        
        try {
            if (options.type === 'Backdrop' && item.BackdropImageTags && item.BackdropImageTags.length > 0) {
                return ApiClient.getImageUrl(item.Id, {
                    type: 'Backdrop',
                    maxWidth: options.maxWidth || 1920,
                    tag: item.BackdropImageTags[0]
                });
            }
        } catch (error) {
            console.error('Failed to get image URL:', error);
        }
        
        // Fallback to a placeholder or empty string
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9IiMxMTExMTEiLz48dGV4dCB4PSI5NjAiIHk9IjU0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNTU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
    }

    static startCarousel() {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.misty-banner-slide');
        const indicators = document.querySelectorAll('.misty-banner-indicator');
        const prevBtn = document.querySelector('.misty-banner-prev');
        const nextBtn = document.querySelector('.misty-banner-next');
        
        if (slides.length <= 1) return;

        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Show current slide
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            
            currentSlide = index;
        }

        function nextSlide() {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }
            showSlide(nextIndex);
        }

        function prevSlide() {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length - 1;
            }
            showSlide(prevIndex);
        }

        // Auto-advance
        const interval = setInterval(nextSlide, 8000);

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                // Reset auto-advance timer
                clearInterval(interval);
                setInterval(nextSlide, 8000);
            });
        });

        // Pause on hover
        const banner = document.querySelector('.misty-home-banner');
        if (banner) {
            banner.addEventListener('mouseenter', () => clearInterval(interval));
            banner.addEventListener('mouseleave', () => {
                clearInterval(interval);
                setInterval(nextSlide, 8000);
            });
        }
    }

    static waitForElement(selector, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            const observer = new MutationObserver((mutations, obs) => {
                const element = document.querySelector(selector);
                if (element) {
                    obs.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    }

    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HomeSwiper.init());
} else {
    HomeSwiper.init();
}

// Also initialize when navigating to home
document.addEventListener('viewshow', (e) => {
    if (e.detail.type === 'home') {
        setTimeout(() => HomeSwiper.init(), 100);
    }
});

// Re-initialize when coming back to home
window.addEventListener('hashchange', () => {
    if (window.location.hash.includes('#!/home')) {
        setTimeout(() => HomeSwiper.init(), 500);
    }
});