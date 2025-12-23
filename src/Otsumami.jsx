import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toHiragana } from "wanakana";

const sources = [
  "選ばない",
  "サントリー",
  "キリン",
  "Asahi",
  "白鶴",
  "霧島酒造",
  "オエノン",
  "三和酒類",
  "サッポロ",
  "なとり",
];

export default function Otsumami() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("選ばない"); 
  const [filtered, setFiltered] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("/otsumami.json")
      .then((res) => res.json())
      .then((data) => {
        const all = Object.values(data).flat();
        setItems(all);
        setFiltered(all); 
      });
  }, []);

  useEffect(() => {
    let results = items;

    if (sourceFilter !== "選ばない") {
      results = results.filter((item) => {
        return item.source && item.source.includes(sourceFilter);
      });
    }

    if (query.trim()) {
      const value = query;
      const valueHira = toHiragana(value);

      results = results.filter((item) => {
        const name = item.name || "";
        const type = item.type || "";
        const source = item.source || "";

        const nameHira = toHiragana(name);
        const typeHira = toHiragana(type);
        const sourceHira = toHiragana(source);

        return (
          name.includes(value) ||
          type.includes(value) ||
          source.includes(value) ||
          nameHira.includes(valueHira) ||
          typeHira.includes(valueHira) ||
          sourceHira.includes(valueHira)
        );
      });
    }

    const uniqueResults = [];
    const seenNames = new Set();

    for (const item of results) {
      if (!seenNames.has(item.name)) {
        uniqueResults.push(item);
        seenNames.add(item.name);
      }
    }

    setFiltered(uniqueResults);

  }, [query, sourceFilter, items]); 

  return (
    <main style={{ padding: "20px" }}>
      <section>
        <h2>おつまみページ</h2>
        <p>おつまみを一覧表示し、入力に応じて絞り込みできます。</p>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h3>おつまみを検索</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="おつまみの名前を検索…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ 
              padding: "8px", 
              fontSize: "16px", 
              minWidth: "250px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            style={{ 
              padding: "8px", 
              fontSize: "16px", 
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          >
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </section>

      <div className="grid search-grid" style={{ marginTop: "20px" }}>
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              className="grid-item"
              key={item.id}
              onClick={() => setSelectedItem(item)}
              style={{ cursor: "pointer" }}
            >
              <h3>{item.name}</h3>
              <p>種類: {item.type === "classic" ? "王道" : "意外"}</p>
              <p>提供元: {item.source}</p>
              <p style={{ color: "#005fccff", fontSize: "0.9em", marginTop: "10px" }}>
                詳細はクリック！
              </p>
            </div>
          ))
        ) : (
          <p>該当するおつまみはありません</p>
        )}
      </div>

      <Link to="/" style={{ marginTop: "20px", display: "block" }}>
        戻る
      </Link>

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedItem(null)}>
              ×
            </button>
            <h2 className="modal-title">おつまみ詳細</h2>

            <div
              className={`detail-section ${
                selectedItem.type === "surprise" ? "surprise-bg" : "classic-bg"
              }`}
            >
              <h3>{selectedItem.name}</h3>
              <p className="detail-sub">
                種類: {selectedItem.type === "classic" ? "王道" : "意外"}
              </p>
              <p className="detail-sub">提供元: {selectedItem.source}</p>

              <div style={{ marginTop: "15px" }}>
                <a
                  href={selectedItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-link"
                >
                  おつまみのリンク（レシピ/公式サイト）
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}