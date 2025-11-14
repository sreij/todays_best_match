import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [result, setResult] = useState("");
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("/brand.json")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data["beer"]); // beer のブランド配列を保存
      });
  }, []);

  const handleMatch = () => {
    const category = document.getElementById("category").value;

    // 今は beer だけ対応
    const categoryBrands = category === "beer" ? brands : [];

    const randomBrand =
      categoryBrands.length > 0
        ? categoryBrands[Math.floor(Math.random() * categoryBrands.length)]
        : null;

    const classicSnacks = {
      beer: "枝豆",
      wine: "チーズ",
      whisky: "ナッツ",
      sour: "唐揚げ",
      shochu: "さつま揚げ",
      sake: "刺身",
      highball: "揚げ物",
      other: "おつまみ各種"
    };

    const surpriseSnacks = {
      beer: "チョコレート",
      wine: "ポテトチップス",
      whisky: "燻製チョコ",
      sour: "ポップコーン",
      shochu: "チョコ最中",
      sake: "バタークッキー",
      highball: "ドライフルーツ",
      other: "意外な組み合わせは今後追加予定！"
    };

    const classic = classicSnacks[category];
    const surprise = surpriseSnacks[category];

    const brandText = randomBrand
      ? `おすすめブランド：${randomBrand.brand}「${randomBrand.name}」`
      : category === "beer"
      ? "ブランド情報を読み込み中..."
      : "（ビール以外はまだデータがありません）";

    const text = `【王道】${classic} / 【意外】${surprise}
${brandText}`;

    setResult(text);
  };

  return (
    <main className="p-4 space-y-4">
      <label htmlFor="category" className="block font-bold text-lg">
        お酒の種類を選択：
      </label>
      <select id="category" className="border p-2 rounded">
        <option value="beer">ビール</option>
        <option value="wine">ワイン</option>
        <option value="whisky">ウィスキー</option>
        <option value="sour">サワー</option>
        <option value="shochu">焼酎</option>
        <option value="sake">日本酒</option>
        <option value="highball">ハイボール</option>
        <option value="other">その他</option>
      </select>

      <button
        id="matchButton"
        onClick={handleMatch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        マッチを探す
      </button>

      <div id="result" className="text-xl font-semibold">{result}</div>

      <Link to="/about" className="text-blue-600 underline block">
        紹介ページへジャンプ
      </Link>
    </main>
  );
}
