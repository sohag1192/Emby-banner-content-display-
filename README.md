

---

## 📌 Project Overview         ![Badge](https://hitscounter.dev/api/hit?url=https%3A%2F%2Fgithub.com%2Fsohag1192%2FEmby-Home-Swiper-UI&label=Visitors&icon=github&color=%23198754&message=&style=flat&tz=UTC)

**Emby Home Swiper UI** is a lightweight, responsive banner module for Emby Web (tested on version 4.9.1.80). It uses native Emby APIs to display auto-sliding content on the home page (`#!/home`) with minimal setup and no external dependencies.

**Original inspiration:** [Nolovenodie/emby-crx](https://github.com/Nolovenodie/emby-crx)

---

## 🛠️ Installation Instructions

1. **Download the script**  
   Save the file as `home.js` from the [v1 folder](https://github.com/sohag1192/Emby-Home-Swiper-UI/tree/main/v1).

2. **Place in Emby environment**  
   Copy `home.js` into your Emby server’s custom scripts or plugin folder.

3. **Inject into dashboard**  
   Add this line to your Emby dashboard HTML or use a browser extension like Tampermonkey:

   ```html
   <script src="/path/to/home.js"></script>
   ```

---

## 🎯 v1 Features

| ✅ Feature              | 💡 Description                                                  |
|------------------------|------------------------------------------------------------------|
| Simple & Lightweight   | No external libraries required                                   |
| Native API Support     | Uses `ApiClient` from Emby 4.9.1.80                              |
| Auto-sliding Banner    | Rotates every 8 seconds                                          |
| Navigation Controls    | Includes previous/next buttons                                   |
| Indicator Dots         | Clickable for direct navigation                                  |
| Responsive Design      | Works on both desktop and mobile                                 |
| Hover Pause            | Pauses rotation when hovered                                     |
| Error Handling         | Graceful fallback if images or API fail                          |
| Lazy Loading           | Loads images only when needed for better performance             |

---

## 🧪 Troubleshooting Tips

- Open browser console (`F12`) and check for errors.
- Test Emby API availability:

  ```js
  console.log(ApiClient)
  ```

- Confirm you're on the correct route: `#!/home`
- Manually initialize the swiper:

  ```js
  HomeSwiper.init()
  ```

---

## 📸 Banner Previews

![Screenshot 45](https://github.com/sohag1192/Emby-banner-content-display-/raw/main/v1/img/Screenshot_45.png)  
![Screenshot 47](https://github.com/sohag1192/Emby-banner-content-display-/raw/main/v1/img/Screenshot_47.png)

---


## Anyone can update and contribute to this project's Emby Home Swiper UI


