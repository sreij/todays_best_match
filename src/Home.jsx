import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [results, setResults] = useState([]);
  const [brands, setBrands] = useState({}); // brand.json のデータ
  const [allSnacks, setAllSnacks] = useState([]); // otsumami.json のデータ

  // ▼▼▼ 1. データ読み込み ▼▼▼
  useEffect(() => {
    // brand.json と otsumami.json を同時に読み込む
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

  // 配列からランダムに1つ要素（名前）を取得する関数
  const getRandomName = (arr) => {
    if (!arr || arr.length === 0) return "該当なし";
    const item = arr[Math.floor(Math.random() * arr.length)];
    return item.name;
  };

  const handleMatch = () => {
    const category = document.getElementById("category").value;

    // 「選ばない」が選ばれた場合
    if (category === "none") {
      setResults([]);
      return;
    }

    setResults([]);

    // 選ばれたカテゴリのお酒リストを取得
    const categoryBrands = brands[category] || [];
    let newResults = [];

    // 5つのペアを作成するループ
    for (let i = 0; i < 6; i++) {
      // ▼▼▼ 2. お酒をランダムに選出 ▼▼▼
      const randomBrand =
        categoryBrands.length > 0
          ? categoryBrands[Math.floor(Math.random() * categoryBrands.length)]
          : { id: null, name: "ブランド情報なし" };

      // ▼▼▼ 3. 選ばれたお酒に合うおつまみを抽出 ▼▼▼
      const matchingSnacks = allSnacks.filter((snack) => {
        // カテゴリが違うものは除外
        if (snack.category !== category) return false;

        // 条件A: ID指定があり、かつIDが一致する場合（専用おつまみ）
        if (snack.targetBrandId === randomBrand.id) return true;

        // 条件B: ID指定がなく(null)、汎用として登録されている場合
        if (snack.targetBrandId === null) return true;

        return false;
      });

      // ▼▼▼ 4. 王道と意外に分けてランダム選出 ▼▼▼
      const classicList = matchingSnacks.filter((s) => s.type === "classic");
      const surpriseList = matchingSnacks.filter((s) => s.type === "surprise");

      newResults.push({
        classic: getRandomName(classicList),
        surprise: getRandomName(surpriseList),
        brand: randomBrand.name,
      });
    }

    setTimeout(() => {
      setResults(newResults);
    }, 10);
  };

  return (
    <main className="p-4 space-y-4">
      <label htmlFor="category" className="label-pop">
        お酒の種類を選択：
      </label>

      {/* ▼▼▼ 選択肢は brand.json のキーに合わせてください ▼▼▼ */}
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

      <button
        onClick={handleMatch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        マッチを探す
      </button>

      {/* ▼▼▼ 結果表示エリア ▼▼▼ */}
      <div className="result-list">
        {results.map((item, index) => (
          <div
          className="grid-item result-card"
          key={`${item.brand}-${index}-${Date.now()}`}
         // ★ keyを少し強化
          style={{ animationDelay: `${index * 0.08}s` }} // ★ 順番にふわっ
        >
          <div className="tag o">王道</div>
          <div className="value">{item.classic}</div>
          
          <div className="tag i">意外</div>
          <div className="value">{item.surprise}</div>
          
          <div className="tag b">お酒</div>
          <div className="brand">{item.brand}</div>
        </div>
      ))}
    </div>
    </main>
  );
}