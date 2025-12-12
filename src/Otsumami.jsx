import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toHiragana } from "wanakana";

export default function Otsumami() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  // otumami.json の読み込み
  useEffect(() => {
    fetch("/otsumami.json")
      .then((res) => res.json())
      .then((data) => {
        const all = Object.values(data).flat();
        setItems(all);
      });
  }, []);

  // 検索処理
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setFiltered([]);
      return;
    }

    const valueHira = toHiragana(value);

    const results = items.filter((item) => {
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

    setFiltered(results);
  };

  return (
    <main style={{ padding: "20px" }}>
      <section>
        <h2>おつまみページ</h2>
        <p>おつまみを名前で検索できます。</p>
      </section>

      <section style={{ marginTop: "20px" }}>
        <h3>おつまみを検索</h3>
        <input
          type="text"
          placeholder="おつまみの名前を検索…"
          value={query}
          onChange={handleSearch}
        />
      </section>

      <div className="grid search-grid">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div className="grid-item" key={item.id}>
              <h3>{item.name}</h3>
              <p>種類: {item.type}</p>
              <p>提供元: {item.source}</p>
            </div>
          ))
        ) : query ? (
          <p>該当なし</p>
        ) : (
          <p>検索ワードを入力してください</p>
        )}
      </div>

      <Link to="/" style={{ marginTop: "20px", display: "block" }}>
        戻る
      </Link>
    </main>
  );
}
