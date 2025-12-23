import { useState, useEffect } from "react";

export default function Home() {
  const [results, setResults] = useState([]);
  const [brands, setBrands] = useState({});
  const [allSnacks, setAllSnacks] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/brand.json").then((res) => res.json()),
      fetch("/otsumami.json").then((res) => res.json()),
    ])
      .then(([brandData, snackData]) => {
        setBrands(brandData);
        setAllSnacks(snackData);
      })
      .catch((error) => console.error("データの読み込みに失敗しました:", error));
  }, []);

  const getRandomItem = (arr) => {
    if (!arr || arr.length === 0) return { name: "該当なし", url: "", source: "" };
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const handleMatch = () => {
    const category = document.getElementById("category").value;
    if (category === "none") {
      setResults([]);
      return;
    }

    setResults([]);

    const categorySnacks = allSnacks.filter((s) => s.category === category);
    const surprisePool = categorySnacks.filter((s) => s.type === "surprise");
    const categoryBrands = brands[category] || [];
    
    let newResults = [];

    for (let i = 0; i < 6; i++) {
      const selectedSurprise = getRandomItem(surprisePool);
      
      let selectedBrand;
      if (selectedSurprise.targetBrandId !== null) {
        selectedBrand = categoryBrands.find(b => b.id === selectedSurprise.targetBrandId) 
                        || getRandomItem(categoryBrands);
      } else {
        selectedBrand = getRandomItem(categoryBrands);
      }

      const classicPool = categorySnacks.filter((snack) => {
        if (snack.type !== "classic") return false;
        return snack.targetBrandId === selectedBrand.id || snack.targetBrandId === null;
      });

      newResults.push({
        classic: getRandomItem(classicPool),
        surprise: selectedSurprise,
        brand: selectedBrand,
      });
    }

    setTimeout(() => {
      setResults(newResults);
    }, 10);
  };

  return (
    <main className="p-4 space-y-4">
      <label htmlFor="category" className="label-pop">お酒の種類を選択：</label>
      <select id="category" className="select-pop">
        <option value="none">選ばない</option>
        <option value="beer">ビール</option>
        <option value="shochu">焼酎</option>
        <option value="wine">ワイン</option>
        <option value="whiskey">ウィスキー</option>
        <option value="sour">サワー</option>
        <option value="sake">日本酒</option>
        <option value="highball">ハイボール</option>
        <option value="others">その他</option>
      </select>

      <button onClick={handleMatch} className="bg-blue-500 text-white px-4 py-2 rounded">
        マッチを探す
      </button>

      {}
      <div className="result-list">
        {results.map((item, index) => (
          <div 
            className="result-card" 
            key={`${item.brand.id}-${index}-${Date.now()}`}
            onClick={() => setSelectedMatch(item)} 
            style={{ 
              cursor: "pointer",
              animationDelay: `${index * 0.08}s` 
            }}
          >
            <div className="tag b">お酒</div>
            <div className="brand">{item.brand.name}</div>
            
            <div className="tag o">王道</div>
            <div className="value">{item.classic.name}</div>

            <div className="tag i">意外</div>
            <div className="value">{item.surprise.name}</div>


          </div>
        ))}
      </div>

      {}
      {selectedMatch && (
        <div className="modal-overlay" onClick={() => setSelectedMatch(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedMatch(null)}>×</button>
            <h2 className="modal-title">ペアリング詳細</h2>
            
            <div className="detail-section">
              <h3>🍺 お酒</h3>
              <p className="detail-text">{selectedMatch.brand.name}</p>
              {selectedMatch.brand.brand && <p className="detail-sub">メーカー: {selectedMatch.brand.brand}</p>}
            </div>

            <div className="detail-section classic-bg">
              <h3>👑 王道: {selectedMatch.classic.name}</h3>
              <p className="detail-sub">提供元: {selectedMatch.classic.source}</p>
              {selectedMatch.classic.url && (
                <a href={selectedMatch.classic.url} target="_blank" rel="noopener noreferrer" className="detail-link">👉 レシピ/公式サイトを見る</a>
              )}
            </div>

            <div className="detail-section surprise-bg">
              <h3>😲 意外: {selectedMatch.surprise.name}</h3>
              <p className="detail-sub">提供元: {selectedMatch.surprise.source}</p>
              {selectedMatch.surprise.url && (
                <a href={selectedMatch.surprise.url} target="_blank" rel="noopener noreferrer" className="detail-link">👉 レシピ/公式サイトを見る</a>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}