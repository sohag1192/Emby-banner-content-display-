class HomeSwiper {
    static init() {
        console.log('HomeSwiper Premium initializing...');
        
        // Check if we're on home page
        if (!window.location.hash.includes('#!/home')) {
            return;
        }

        // Wait for Emby to be ready
        if (!window.ApiClient) {
            setTimeout(() => HomeSwiper.init(), 100);
            return;
        }

        this.setupPremiumStyles();
        this.setupBanner();
    }

    static setupPremiumStyles() {
        const styles = `
        .misty-home-banner {
            position: relative;
            width: 100%;
            height: 56.25vw; /* 16:9 aspect ratio (1080/1920 = 0.5625) */
            max-height: 85vh;
            min-height: 500px;
            overflow: hidden;
            background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
            margin-bottom: 30px;
            border-radius: 0 0 24px 24px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6);
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
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
            transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform: scale(1.02);
        }
        
        .misty-banner-slide.active {
            opacity: 1;
            transform: scale(1);
        }
        
        .misty-banner-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            filter: brightness(0.35) saturate(1.2);
            transition: filter 1.5s ease;
        }
        
        .misty-banner-slide.active .misty-banner-image {
            filter: brightness(0.5) saturate(1.1);
        }
        
        .misty-banner-gradient {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                90deg, 
                rgba(10,10,10,0.95) 0%, 
                rgba(10,10,10,0.6) 30%, 
                rgba(10,10,10,0.2) 60%,
                transparent 100%
            );
            z-index: 1;
        }
        
        .misty-banner-content {
            position: absolute;
            bottom: 140px;
            left: 80px;
            max-width: 680px;
            color: white;
            z-index: 2;
            transform: translateY(40px);
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
            opacity: 0;
        }
        
        .misty-banner-slide.active .misty-banner-content {
            transform: translateY(0);
            opacity: 1;
        }
        
        .misty-banner-badge {
            display: inline-flex;
            align-items: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 0.85em;
            font-weight: 700;
            margin-bottom: 25px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .misty-banner-title {
            font-size: 4.2em;
            font-weight: 900;
            margin-bottom: 25px;
            text-shadow: 0 4px 20px rgba(0,0,0,0.8);
            line-height: 1.05;
            background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.5px;
        }
        
        .misty-banner-meta {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 30px;
            font-size: 1.15em;
            color: #d0d0d0;
        }
        
        .misty-banner-rating {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #ffd700;
            font-weight: 600;
        }
        
        .misty-banner-year {
            background: rgba(255,255,255,0.12);
            padding: 6px 16px;
            border-radius: 16px;
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255,255,255,0.1);
            font-weight: 600;
        }
        
        .misty-banner-description {
            font-size: 1.35em;
            line-height: 1.7;
            margin-bottom: 40px;
            color: #e8e8e8;
            text-shadow: 0 2px 8px rgba(0,0,0,0.6);
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-weight: 400;
        }
        
        .misty-banner-actions {
            display: flex;
            gap: 20px;
            align-items: center;
        }
        
        .misty-btn-play {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            color: white;
            padding: 18px 40px;
            border-radius: 60px;
            font-size: 1.15em;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
            position: relative;
            overflow: hidden;
        }
        
        .misty-btn-play::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.6s ease;
        }
        
        .misty-btn-play:hover::before {
            left: 100%;
        }
        
        .misty-btn-play:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 20px 45px rgba(102, 126, 234, 0.6);
        }
        
        .misty-btn-play:active {
            transform: translateY(-1px) scale(0.98);
        }
        
        .misty-btn-more {
            background: rgba(255,255,255,0.12);
            border: 2px solid rgba(255,255,255,0.25);
            color: white;
            padding: 16px 35px;
            border-radius: 60px;
            font-size: 1.15em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(15px);
            position: relative;
            overflow: hidden;
        }
        
        .misty-btn-more:hover {
            background: rgba(255,255,255,0.2);
            border-color: rgba(255,255,255,0.4);
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        
        .misty-banner-indicators {
            position: absolute;
            bottom: 50px;
            left: 80px;
            display: flex;
            gap: 10px;
            z-index: 2;
        }
        
        .misty-banner-indicator {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: rgba(255,255,255,0.25);
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
            border: 2px solid transparent;
        }
        
        .misty-banner-indicator.active {
            background: linear-gradient(135deg, #667eea, #764ba2);
            transform: scale(1.3);
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.6);
            border-color: rgba(255,255,255,0.3);
        }
        
        .misty-banner-indicator::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
            transition: left 0.5s ease;
        }
        
        .misty-banner-indicator:hover::after {
            left: 100%;
        }
        
        .misty-banner-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.4);
            color: white;
            border: 2px solid rgba(255,255,255,0.15);
            width: 65px;
            height: 65px;
            border-radius: 50%;
            font-size: 26px;
            cursor: pointer;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            backdrop-filter: blur(15px);
            opacity: 0;
        }
        
        .misty-home-banner:hover .misty-banner-nav {
            opacity: 1;
        }
        
        .misty-banner-nav:hover {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-color: rgba(255,255,255,0.4);
            transform: translateY(-50%) scale(1.15);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }
        
        .misty-banner-prev {
            left: 35px;
        }
        
        .misty-banner-next {
            right: 35px;
        }
        
        .misty-progress-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: rgba(255,255,255,0.1);
            z-index: 2;
            overflow: hidden;
        }
        
        .misty-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            width: 0%;
            transition: width 0.1s linear;
            border-radius: 0 4px 4px 0;
            position: relative;
        }
        
        .misty-progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 20px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4));
            animation: shimmer 2s infinite;
        }
        
        /* Enhanced backdrop overlay */
        .misty-banner-pattern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.05) 0%, transparent 50%);
            z-index: 1;
            pointer-events: none;
        }
        
        /* Mobile Responsive */
        @media (max-width: 1024px) {
            .misty-home-banner {
                height: 60vh;
                min-height: 450px;
                border-radius: 0 0 20px 20px;
            }
            
            .misty-banner-content {
                left: 40px;
                bottom: 120px;
                max-width: 85%;
            }
            
            .misty-banner-title {
                font-size: 3.2em;
            }
            
            .misty-banner-description {
                font-size: 1.2em;
                -webkit-line-clamp: 2;
            }
            
            .misty-banner-nav {
                opacity: 1;
                width: 55px;
                height: 55px;
                font-size: 22px;
            }
        }
        
        @media (max-width: 768px) {
            .misty-home-banner {
                height: 65vh;
                min-height: 400px;
                border-radius: 0;
                margin-bottom: 30px;
            }
            
            .misty-banner-content {
                left: 25px;
                bottom: 110px;
                max-width: 90%;
            }
            
            .misty-banner-title {
                font-size: 2.6em;
            }
            
            .misty-banner-description {
                font-size: 1.1em;
                -webkit-line-clamp: 2;
                margin-bottom: 30px;
            }
            
            .misty-banner-actions {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }
            
            .misty-btn-play, .misty-btn-more {
                padding: 16px 30px;
                font-size: 1.05em;
            }
            
            .misty-banner-nav {
                width: 50px;
                height: 50px;
                font-size: 20px;
            }
            
            .misty-banner-prev {
                left: 20px;
            }
            
            .misty-banner-next {
                right: 20px;
            }
            
            .misty-banner-indicators {
                left: 25px;
                bottom: 35px;
            }
        }
        
        @media (max-width: 480px) {
            .misty-home-banner {
                height: 70vh;
            }
            
            .misty-banner-title {
                font-size: 2.2em;
            }
            
            .misty-banner-description {
                font-size: 1em;
                margin-bottom: 25px;
            }
            
            .misty-banner-meta {
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;
                margin-bottom: 25px;
            }
            
            .misty-banner-content {
                left: 20px;
                bottom: 100px;
            }
        }
        
        /* Animations */
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
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
                this.startPremiumCarousel();
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
                this.createPremiumSlide(item, index === 0)
            ).join('');
            
            const indicatorsHTML = items.map((_, index) => `
                <div class="misty-banner-indicator ${index === 0 ? 'active' : ''}" 
                     data-index="${index}" 
                     aria-label="Go to slide ${index + 1}"></div>
            `).join('');

            banner.innerHTML = `
                <div class="misty-banner-slides">
                    ${slidesHTML}
                    <div class="misty-banner-pattern"></div>
                </div>
                <button class="misty-banner-nav misty-banner-prev" aria-label="Previous slide">‹</button>
                <button class="misty-banner-nav misty-banner-next" aria-label="Next slide">›</button>
                <div class="misty-banner-indicators" role="tablist">
                    ${indicatorsHTML}
                </div>
                <div class="misty-progress-bar">
                    <div class="misty-progress-fill"></div>
                </div>
            `;

            return banner;
        } catch (error) {
            console.error('Failed to create banner:', error);
            return null;
        }
    }

    static createPremiumSlide(item, isActive = false) {
        const backdropUrl = this.getImageUrl(item, { type: 'Backdrop', maxWidth: 1920 });
        const title = item.Name || 'Untitled';
        const description = item.Overview || 'No description available.';
        const year = item.ProductionYear || '';
        const rating = item.CommunityRating ? item.CommunityRating.toFixed(1) : null;
        
        return `
            <div class="misty-banner-slide ${isActive ? 'active' : ''}" 
                 data-item-id="${item.Id}" 
                 role="tabpanel"
                 aria-hidden="${!isActive}">
                <img class="misty-banner-image" src="${backdropUrl}" alt="${title}" loading="lazy" width="1920" height="1080">
                <div class="misty-banner-gradient"></div>
                <div class="misty-banner-content">
                    <div class="misty-banner-badge">
                        <span>🎬</span>
                        <span style="margin-left: 8px;">Featured Content</span>
                    </div>
                    <h1 class="misty-banner-title">${this.escapeHtml(title)}</h1>
                    <div class="misty-banner-meta">
                        ${year ? `<span class="misty-banner-year">${year}</span>` : ''}
                        ${rating ? `
                            <div class="misty-banner-rating">
                                <span>⭐</span>
                                <span>${rating}/10</span>
                            </div>
                        ` : ''}
                        ${item.OfficialRating ? `<span>${this.escapeHtml(item.OfficialRating)}</span>` : ''}
                    </div>
                    <p class="misty-banner-description">${this.escapeHtml(description)}</p>
                    <div class="misty-banner-actions">
                        <button class="misty-btn-play" onclick="HomeSwiper.playItem('${item.Id}')" aria-label="Play ${title}">
                            <span style="font-size: 1.2em;">▶</span>
                            <span>PLAY NOW</span>
                        </button>
                        <button class="misty-btn-more" onclick="Emby.Page.showItem('${item.Id}')" aria-label="More info about ${title}">
                            MORE INFO
                        </button>
                    </div>
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
                Limit: 6,
                Fields: 'Overview,ProductionYear,CommunityRating,OfficialRating,BackdropImageTags',
                EnableUserData: false,
                HasBackdropImage: true
            };

            const url = ApiClient.getUrl(`Users/${userId}/Items`, query);
            const response = await ApiClient.getJSON(url);
            
            // Filter items that actually have backdrop images
            const itemsWithBackdrops = (response.Items || []).filter(item => 
                item.BackdropImageTags && item.BackdropImageTags.length > 0
            );
            
            return itemsWithBackdrops.slice(0, 6);
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
                    maxWidth: 1920,
                    tag: item.BackdropImageTags[0],
                    quality: 90
                });
            }
        } catch (error) {
            console.error('Failed to get image URL:', error);
        }
        
        // Fallback to a 1920x1080 placeholder
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9IiMxMTExMTEiLz48dGV4dCB4PSI5NjAiIHk9IjU0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNTU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4xOTIweDEwODAgSW1hZ2U8L3RleHQ+PC9zdmc+';
    }

    static startPremiumCarousel() {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.misty-banner-slide');
        const indicators = document.querySelectorAll('.misty-banner-indicator');
        const prevBtn = document.querySelector('.misty-banner-prev');
        const nextBtn = document.querySelector('.misty-banner-next');
        const progressFill = document.querySelector('.misty-progress-fill');
        
        if (slides.length <= 1) {
            if (progressFill) progressFill.style.display = 'none';
            return;
        }

        let progressInterval;
        let autoAdvanceInterval;

        function resetProgress() {
            if (progressFill) {
                progressFill.style.width = '0%';
            }
            clearInterval(progressInterval);
        }

        function startProgress() {
            resetProgress();
            if (progressFill) {
                let width = 0;
                progressInterval = setInterval(() => {
                    width += 100 / 80; // 8 seconds = 80 intervals of 100ms
                    progressFill.style.width = width + '%';
                    if (width >= 100) {
                        resetProgress();
                    }
                }, 100);
            }
        }

        function showSlide(index) {
            // Update ARIA attributes
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.setAttribute('aria-hidden', 'true');
            });
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Show current slide
            slides[index].classList.add('active');
            slides[index].setAttribute('aria-hidden', 'false');
            indicators[index].classList.add('active');
            
            currentSlide = index;
            
            // Reset and start progress bar
            resetProgress();
            startProgress();
        }

        function nextSlide() {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            showSlide(nextIndex);
        }

        function prevSlide() {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) prevIndex = slides.length - 1;
            showSlide(prevIndex);
        }

        // Start auto-advance
        function startAutoAdvance() {
            clearInterval(autoAdvanceInterval);
            autoAdvanceInterval = setInterval(nextSlide, 8000);
            startProgress();
        }

        startAutoAdvance();

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoAdvance();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoAdvance();
            });
        }

        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                startAutoAdvance();
            });
        });

        // Pause on hover
        const banner = document.querySelector('.misty-home-banner');
        if (banner) {
            banner.addEventListener('mouseenter', () => {
                clearInterval(autoAdvanceInterval);
                clearInterval(progressInterval);
            });
            
            banner.addEventListener('mouseleave', startAutoAdvance);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!document.querySelector('.misty-home-banner')) return;
            
            if (e.key === 'ArrowLeft') {
                prevSlide();
                startAutoAdvance();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                startAutoAdvance();
            } else if (e.key === 'Home') {
                showSlide(0);
                startAutoAdvance();
            } else if (e.key === 'End') {
                showSlide(slides.length - 1);
                startAutoAdvance();
            }
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        if (banner) {
            banner.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            banner.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                startAutoAdvance();
            }
        }

        // Initial progress
        startProgress();
    }

    static playItem(itemId) {
        try {
            // Try to use Emby's playback manager
            if (window.playbackManager && window.playbackManager.play) {
                window.playbackManager.play({ ids: [itemId] });
            } else {
                // Fallback: navigate to item page
                Emby.Page.showItem(itemId);
            }
        } catch (error) {
            console.error('Failed to play item:', error);
            Emby.Page.showItem(itemId);
        }
    }

    static waitForElement(selector, timeout = 15000) {
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
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Enhanced initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => HomeSwiper.init(), 300);
    });
} else {
    setTimeout(() => HomeSwiper.init(), 300);
}

// Enhanced navigation handling
document.addEventListener('viewshow', (e) => {
    if (e.detail && e.detail.type === 'home') {
        setTimeout(() => HomeSwiper.init(), 500);
    }
});

window.addEventListener('hashchange', () => {
    if (window.location.hash.includes('#!/home')) {
        setTimeout(() => HomeSwiper.init(), 700);
    }
});

// Export for global access
window.HomeSwiper = HomeSwiper;
