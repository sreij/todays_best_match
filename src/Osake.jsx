import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toHiragana } from "wanakana"; // ← 追加（漢字 → ひらがな変換）

export default function Osake() {
  const [brands, setBrands] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  // brand.json の読み込み
  useEffect(() => {
    fetch("/brand.json")
      .then((res) => res.json())
      .then((data) => {
        // beer / chuhai / sake など全カテゴリーを統合して 1 配列にする
        const all = Object.values(data).flat();
        setBrands(all);
      });
  }, []);

  // 検索処理（ひらがな対応）
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setFiltered([]);
      return;
    }

    const valueHira = toHiragana(value); // 入力をひらがな化

    const results = brands.filter((item) => {
      const name = item.name || "";
      const brand = item.brand || "";
      const reading = item.reading || "";

      const nameHira = toHiragana(name);
      const brandHira = toHiragana(brand);
      const readingHira = toHiragana(reading);

      return (
        // 通常の日本語部分一致
        name.includes(value) ||
        brand.includes(value) ||

        // ひらがな部分一致（例：金麦 → きんむぎ）
        nameHira.includes(valueHira) ||
        brandHira.includes(valueHira)  ||
        (reading && readingHira.includes(valueHira))
      );
    });

    setFiltered(results);
  };

  return (
    <main style={{ padding: "20px" }}>
      <section>
        <h2>お酒のページ</h2>
        <p>ここはお酒の詳細情報を表示するページです。</p>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h3>お酒を名前で検索</h3>
        <input
          type="text"
          placeholder="お酒の名前を検索…"
          value={query}
          onChange={handleSearch}
        />
      </section>

      {/* ▼ 4列固定のタイル表示 ▼ */}
      <div className="grid search-grid">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div className="grid-item" key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.brand}</p>
            </div>
          ))
        ) : query ? (
          <p>該当なし</p>
        ) : (
          <p>検索ワードを入力してください</p>
        )}
      </div>
    </main>
  );
}
