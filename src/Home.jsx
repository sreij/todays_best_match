import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [results, setResults] = useState([]); 
  const [brands, setBrands] = useState({});

  useEffect(() => {
    fetch("/brand.json")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
      });
  }, []);

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const handleMatch = () => {
    const category = document.getElementById("category").value;

    const categoryBrands = brands[category] || [];

    const classicSnacks = {
      beer: ["枝豆", "焼き鳥", "唐揚げ", "ソーセージ", "たこわさ"],
      wine: ["チーズ", "生ハム", "オリーブ", "クラッカー", "ぶどう"],
      whiskey: ["ナッツ", "チョコ", "ビーフジャーキー", "燻製チーズ", "ドライフルーツ"],
      sour: ["唐揚げ", "餃子", "ポテチ", "サラダ", "枝豆"],
      shochu: ["さつま揚げ", "漬物", "焼き鳥", "コンニャク", "冷奴"],
      sake: ["刺身", "だし巻き卵", "塩辛", "茶碗蒸し", "焼き魚"],
      highball: ["揚げ物", "唐揚げ", "チーズ", "スルメ", "ピーナッツ"],
      others: ["おつまみ各種"]
    };

    const surpriseSnacks = {
      beer: ["チョコ", "クッキー", "ポップコーン", "フルーツ", "プリン"],
      wine: ["ポテチ", "ナッツ", "チョコ", "せんべい", "サンドイッチ"],
      whiskey: ["燻製チョコ", "キャラメル", "クッキー", "バナナ", "バタークッキー"],
      sour: ["ポップコーン", "チョコ", "ポテチ", "ケーキ", "ゼリー"],
      shochu: ["チョコ最中", "羊羹", "せんべい", "マドレーヌ", "ドーナツ"],
      sake: ["バタークッキー", "チョコ", "プリン", "ラスク", "カステラ"],
      highball: ["ドライフルーツ", "パイ", "クッキー", "ラムネ", "マシュマロ"],
      others: ["意外な組み合わせは今後追加予定！"]
    };

    let newResults = [];

    for (let i = 0; i < 5; i++) {
      const randomBrand =
        categoryBrands.length > 0
          ? getRandom(categoryBrands)
          : { name: "ブランド情報なし" };

      const classic = getRandom(classicSnacks[category]);
      const surprise = getRandom(surpriseSnacks[category]);

      newResults.push({
        classic,
        surprise,
        brand: randomBrand.name
      });
    }

    setResults(newResults);
  };

  return (
    <main className="p-4 space-y-4">
      <label htmlFor="category" className="block font-bold text-lg">
        お酒の種類を選択：
      </label>

      <select id="category" className="border p-2 rounded">
        <option value="beer">ビール</option>
        <option value="wine">ワイン</option>
        <option value="whiskey">ウィスキー</option>
        <option value="sour">サワー</option>
        <option value="shochu">焼酎</option>
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

      {/* ▼▼▼ 縦リスト表示 ▼▼▼ */}
      <div className="vertical-list-container">
        {results.map((item, index) => (
          <div className="vertical-item" key={index}>
            <div className="tag o">王道</div>
            <div className="value">{item.classic}</div>

            <div className="tag i">意外</div>
            <div className="value">{item.surprise}</div>

            <div className="beer">🍺 {item.brand}</div>
          </div>
        ))}
      </div>
      {/* ▲▲▲ ここまで ▲▲▲ */}

      <Link to="/about" className="text-blue-600 underline block">
        紹介ページへジャンプ
      </Link>
    </main>
  );
}
