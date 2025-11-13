**Here’s a tailored README for your `Emby-Home-Swiper-UI/v3` version, optimized for 1920x1080 banners and performance.**

---

# 🖼️ Emby Home Swiper UI – v3

A refined, high-resolution banner carousel for Emby Web (tested on version 4.9.1.80), designed for full HD (1920x1080) visuals with enhanced performance, responsive layout, and smoother transitions.

## 🚀 What's New in v3

### 🖼️ **Image Optimization**
- Fixed `getImageUrl()` to enforce **1920px width**
- Maintains **16:9 aspect ratio** using `height: 56.25vw`
- Explicit image attributes: `width="1920"` and `height="1080"`
- Uses `object-fit: cover` and `object-position: center` for clean cropping

### ⚡ **Performance Features**
- **High-quality compression (90%)** for faster load
- **Lazy loading** for non-active slides
- Optimized placeholders with correct dimensions
- HTML includes proper image sizing for smoother rendering

### 📱 **Responsive Design**
- Aspect ratio preserved across all screen sizes
- Adaptive height based on viewport width
- Mobile-optimized breakpoints
- Touch-friendly navigation for swipe gestures

## 🔧 Installation

1. **Download `home.js`** from the `v3` folder.
2. **Inject into Emby Web UI** using browser extension (e.g. Tampermonkey) or embed directly:
   ```html
   <script src="/path/to/home.js"></script>
   ```
3. Ensure your Emby home route is `#!/home` for proper initialization.

## 🖼️ Preview Gallery

Visit [`v3/img`](https://github.com/sohag1192/Emby-Home-Swiper-UI/tree/main/v3/img) for screenshots showcasing the full-HD banner layout and carousel behavior.

## 👨‍💻 Maintainer

**Md. Sohag Rana**  
GitHub: [sohag1192](https://github.com/sohag1192)

---

