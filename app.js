// 景點資料庫（新增冰島與馬爾地夫）
const DESTINATIONS = [
  {
    id: 1,
    name: "嵐山竹林小徑",
    city: "京都",
    country: "日本",
    category: "asia",
    rating: 4.9,
    price: 0,
    priceLabel: "免費參觀",
    weather: "⛅ 22°C 晴時多雲",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    description: "走入宛如仙境的翠綠竹林，傾聽風吹竹葉的沙沙聲，體驗千年古都的靜謐氛圍。"
  },
  {
    id: 2,
    name: "艾菲爾鐵塔 & 塞納河",
    city: "巴黎",
    country: "法國",
    category: "europe",
    rating: 4.8,
    price: 980,
    priceLabel: "NT$ 980 起",
    weather: "☀️ 19°C 陽光普照",
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=600&q=80",
    description: "巴黎最標誌性的地標，漫步塞納河畔欣賞晚霞與夜晚璀璨的燈光秀。"
  },
  {
    id: 3,
    name: "太魯閣國家公園",
    city: "花蓮",
    country: "台灣",
    category: "nature",
    rating: 4.9,
    price: 0,
    priceLabel: "免費參觀",
    weather: "🌤️ 26°C 微風宜人",
    image: "https://images.unsplash.com/photo-1508247967583-7d982ea01526?auto=format&fit=crop&w=600&q=80",
    description: "鬼斧神工的大理石峽谷與碧綠溪水，世界級的自然奇觀與健行步道。"
  },
  {
    id: 4,
    name: "聖托里尼藍頂教堂",
    city: "伊亞",
    country: "希臘",
    category: "europe",
    rating: 4.9,
    price: 520,
    priceLabel: "NT$ 520 起",
    weather: "☀️ 28°C 晴空萬里",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
    description: "愛琴海上最夢幻的藍白小鎮，遠眺無邊際蔚藍海景與被譽為世界上最美的夕陽。"
  },
  {
    id: 5,
    name: "富士山與河口湖",
    city: "山梨縣",
    country: "日本",
    category: "asia",
    rating: 4.9,
    price: 450,
    priceLabel: "NT$ 450 起",
    weather: "🗻 16°C 富士山清晰可見",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    description: "湖畔倒映著壯麗的富士山倒影，春賞櫻花、秋賞紅葉的絕佳名勝。"
  },
  {
    id: 6,
    name: "羅馬競技場",
    city: "羅馬",
    country: "義大利",
    category: "culture",
    rating: 4.7,
    price: 650,
    priceLabel: "NT$ 650 起",
    weather: "🏛️ 24°C 舒適乾爽",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
    description: "古羅馬帝國最偉大的建築奇蹟，感受兩千年前角鬥士的磅礴歷史與震撼。"
  },
  {
    id: 7,
    name: "藍湖地熱溫泉 & 夢幻極光",
    city: "雷克雅維克",
    country: "冰島",
    category: "nature",
    rating: 5.0,
    price: 2800,
    priceLabel: "NT$ 2,800 起",
    weather: "❄️ -2°C 極光指數高",
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80",
    description: "在乳藍色天然地熱溫泉中放鬆身心，夜晚仰望魔幻綠色極光劃破夜空。"
  },
  {
    id: 8,
    name: "馬爾地夫水上度假別墅",
    city: "馬列群島",
    country: "馬爾地夫",
    category: "nature",
    rating: 4.9,
    price: 12500,
    priceLabel: "NT$ 12,500 起",
    weather: "🏝️ 30°C 水質清澈見底",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80",
    description: "推開房門直接跳入印度洋果凍海，私人無邊際泳池與頂級浮潛體驗。"
  }
];

let favorites = new Set();
let currentBookingItem = null;

// 渲染景點卡片
function renderCards(items) {
  const container = document.getElementById('cardsGrid');
  const resultCount = document.getElementById('resultCount');
  resultCount.textContent = `共 ${items.length} 個景點`;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400">
        <p class="text-4xl mb-3">🔍</p>
        <p class="text-lg font-bold text-slate-600">找不到符合條件的景點</p>
        <p class="text-sm mt-1">請嘗試其他關鍵字或切換分類</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => {
    const isFav = favorites.has(item.id);
    return `
      <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
        <div class="relative h-52 overflow-hidden bg-slate-100">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
          <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-xs font-bold px-2.5 py-1 rounded-full text-slate-800 shadow">
            ${item.country} · ${item.city}
          </span>
          <span class="absolute bottom-3 left-3 text-xs font-semibold text-white/90 drop-shadow">
            ${item.weather}
          </span>
          <button onclick="toggleFavorite(${item.id})" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-sm shadow hover:scale-110 active:scale-95 transition">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">${item.name}</h3>
              <span class="text-amber-500 font-bold text-sm flex items-center bg-amber-50 px-2 py-0.5 rounded-md">⭐ ${item.rating}</span>
            </div>
            <p class="text-slate-500 text-xs leading-relaxed line-clamp-2">${item.description}</p>
          </div>
          <div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span class="text-xs text-slate-400 block">參考費用</span>
              <span class="text-sm font-bold text-slate-800">${item.priceLabel}</span>
            </div>
            <button onclick="openBookingModal(${item.id})" class="text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow active:scale-95">
              立即預約諮詢
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 收藏功能
window.toggleFavorite = function(id) {
  const item = DESTINATIONS.find(d => d.id === id);
  if (favorites.has(id)) {
    favorites.delete(id);
    showToast(`已從收藏清單移除：${item.name}`);
  } else {
    favorites.add(id);
    showToast(`❤️ 已成功加入收藏：${item.name}`);
  }
  document.getElementById('favBadge').textContent = favorites.size;
  filterDestinations();
};

// 預約彈窗
window.openBookingModal = function(id) {
  currentBookingItem = DESTINATIONS.find(d => d.id === id);
  if (!currentBookingItem) return;

  document.getElementById('modalTitle').textContent = `預約諮詢：${currentBookingItem.name}`;
  document.getElementById('modalLocation').textContent = `📍 ${currentBookingItem.country} · ${currentBookingItem.city} (${currentBookingItem.priceLabel})`;
  document.getElementById('bookingModal').classList.remove('hidden');
};

window.closeBookingModal = function() {
  document.getElementById('bookingModal').classList.add('hidden');
};

window.submitBooking = function(e) {
  e.preventDefault();
  const name = document.getElementById('guestName').value;
  const date = document.getElementById('travelDate').value;
  const count = document.getElementById('guestCount').value;

  closeBookingModal();
  showToast(`🎉 感謝 ${name}！已收到您在 ${date} (${count}位) 的【${currentBookingItem.name}】預約諮詢！`);
};

// Toast 提示
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}

// 篩選與搜尋邏輯
function filterDestinations() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const category = document.getElementById('categorySelect').value;

  const filtered = DESTINATIONS.filter(item => {
    const matchQuery = !query || 
      item.name.toLowerCase().includes(query) ||
      item.city.toLowerCase().includes(query) ||
      item.country.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    const matchCategory = category === 'all' || item.category === category;

    return matchQuery && matchCategory;
  });

  renderCards(filtered);
}

// 事件監聽
document.addEventListener('DOMContentLoaded', () => {
  renderCards(DESTINATIONS);
  document.getElementById('searchInput').addEventListener('input', filterDestinations);
  document.getElementById('categorySelect').addEventListener('change', filterDestinations);
});
