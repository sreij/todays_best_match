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
    <main>
      <section className="about" style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h2>おつまみページ</h2>
        <p>おつまみを一覧表示し、入力に応じて絞り込みできます。</p>
      </section>

      <section style={{ marginTop: "20px", textAlign: "center" }}>
        <h3 className="label-pop">おつまみを検索</h3>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
          <input
            type="text"
            placeholder="おつまみの名前を検索…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: "300px" }} 
          />

          <select
            className="select-pop"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>
      </section>

      <div className="grid search-grid" style={{ marginTop: "40px" }}>
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              className="grid-item"
              key={item.id}
              onClick={() => setSelectedItem(item)}
              style={{ cursor: "pointer" }}
            >
              <h3 style={{ fontSize: "1.1rem", margin: "0 0 10px 0", color: "#e65100" }}>{item.name}</h3>
              <div style={{ fontSize: "0.95rem", color: "#555" }}>
                <p style={{ margin: "5px 0" }}>種類: <span style={{ fontWeight: "bold" }}>{item.type === "classic" ? "王道" : "意外"}</span></p>
                <p style={{ margin: "5px 0" }}>提供元: {item.source}</p>
              </div>
              <p style={{ color: "#005fcc", fontSize: "0.85rem", marginTop: "15px", textDecoration: "underline" }}>
                詳細はクリック！
              </p>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#777" }}>該当するおつまみはありません</p>
        )}
      </div>

      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedItem(null)}>
              ×
            </button>
            <h2 className="modal-title" style={{ color: "#d45a00", borderBottom: "2px solid #ffe0b2", paddingBottom: "10px" }}>おつまみ詳細</h2>

            <div
              className={`detail-section ${
                selectedItem.type === "surprise" ? "surprise-bg" : "classic-bg"
              }`}
              style={{ marginTop: "20px" }}
            >
              <h3 style={{ fontSize: "1.4rem", color: "#333", marginBottom: "15px" }}>{selectedItem.name}</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                <p className="detail-sub" style={{ fontSize: "1rem" }}>
                  <span style={{ fontWeight: "bold", color: "#ff6f00" }}>種類:</span> {selectedItem.type === "classic" ? "王道" : "意外"}
                </p>
                <p className="detail-sub" style={{ fontSize: "1rem" }}>
                  <span style={{ fontWeight: "bold", color: "#ff6f00" }}>提供元:</span> {selectedItem.source}
                </p>
              </div>

              <div style={{ marginTop: "25px", textAlign: "center" }}>
                <a
                  href={selectedItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-link"
                  style={{ 
                    display: "inline-block", 
                    padding: "10px 20px", 
                    backgroundColor: "#fff", 
                    border: "2px solid #007bff", 
                    borderRadius: "30px",
                    textDecoration: "none",
                    color: "#007bff",
                    transition: "0.3s"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#007bff";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                    e.currentTarget.style.color = "#007bff";
                  }}
                >
                  公式サイトでレシピを見る
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}