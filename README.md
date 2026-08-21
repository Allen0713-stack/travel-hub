# ✈️ TravelHub 旅遊指南（跨電腦開發範例）

這是一個用於練習 **「公司電腦 ⇄ 家用電腦 跨設備開發」** 的實戰示範專案。

---

## 🛠️ 開發流程備忘錄

### 1. 在公司電腦（今日開發收尾）：
```bash
git add .
git commit -m "feat: 更新景點列表與搜尋功能"
git push origin main
```

### 2. 在家用電腦（初次設定）：
```bash
git clone https://github.com/YOUR_USERNAME/travel-hub.git
cd travel-hub
cp .env.example .env
```

### 3. 在家用電腦（日常同步最新進度）：
```bash
git pull origin main
```

---

## 📁 目錄結構說明
* `index.html`：旅遊網頁主頁面（TailwindCSS 響應式佈局）
* `app.js`：景點資料庫、即時搜尋與分類篩選邏輯
* `.gitignore`：排除敏感檔案與依賴（防止上傳垃圾或密碼）
* `.env.example`：環境變數設定範本
