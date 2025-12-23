import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toHiragana } from "wanakana";

export default function Osake() {
  const [brands, setBrands] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("/brand.json")
      .then((res) => res.json())
      .then((data) => {
        const all = Object.values(data).flat();
        setBrands(all);
        setFiltered(all);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setFiltered(brands);
      return;
    }

    const valueHira = toHiragana(value);

    const results = brands.filter((item) => {
      const name = item.name || "";
      const brand = item.brand || "";
      const reading = item.reading || "";

      const nameHira = toHiragana(name);
      const brandHira = toHiragana(brand);
      const readingHira = toHiragana(reading);

      return (
        name.includes(value) ||
        brand.includes(value) ||
        nameHira.includes(valueHira) ||
        brandHira.includes(valueHira) ||
        (reading && readingHira.includes(valueHira))
      );
    });

    setFiltered(results);
  };

  return (
    <main style={{ padding: "20px" }}>
      <section>
        <h2>お酒のページ</h2>
        <p>お酒を一覧表示し、入力に応じて絞り込みできます。</p>
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

      {}
      <div className="grid search-grid">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div className="grid-item" key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.brand}</p>
            </div>
          ))
        ) : (
          <p>該当するお酒はありません</p>
        )}
      </div>
    </main>
  );
}
