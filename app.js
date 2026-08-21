// 景點資料庫
const DESTINATIONS = [
  {
    id: 1,
    name: "嵐山竹林小徑",
    city: "京都",
    country: "日本",
    category: "asia",
    rating: 4.9,
    price: "免費參觀",
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
    price: "€ 28 起",
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
    price: "免費參觀",
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
    price: "€ 15 起",
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
    price: "¥ 1,200 起",
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
    price: "€ 18 起",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
    description: "古羅馬帝國最偉大的建築奇蹟，感受兩千年前角鬥士的磅礴歷史與震撼。"
  }
];

let favorites = new Set();

// 渲染景點卡片
function renderCards(items) {
  const container = document.getElementById('cardsGrid');
  const resultCount = document.getElementById('resultCount');
  resultCount.textContent = `共 ${items.length} 個景點`;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <p class="text-3xl mb-2">🔍</p>
        <p class="text-base font-medium">找不到符合條件的景點，請嘗試其他關鍵字</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => {
    const isFav = favorites.has(item.id);
    return `
      <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
        <div class="relative h-48 overflow-hidden bg-slate-100">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-xs font-bold px-2.5 py-1 rounded-full text-slate-700">
            ${item.country} · ${item.city}
          </span>
          <button onclick="toggleFavorite(${item.id})" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-sm shadow hover:scale-110 active:scale-95 transition">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <h3 class="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">${item.name}</h3>
              <span class="text-amber-500 font-bold text-sm flex items-center">⭐ ${item.rating}</span>
            </div>
            <p class="text-slate-500 text-xs leading-relaxed line-clamp-2">${item.description}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-600">${item.price}</span>
            <button onclick="alert('已選擇【${item.name}】！可在家用電腦接續串接真實 API 或訂單系統。')" class="text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg transition-colors">
              查看詳情
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 收藏功能
window.toggleFavorite = function(id) {
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }
  document.getElementById('favBadge').textContent = favorites.size;
  filterDestinations();
};

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
