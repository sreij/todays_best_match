import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <label htmlFor="category">お酒の種類を選択：</label>
      <select id="category">
        <option value="beer">ビール</option>
        <option value="wine">ワイン</option>
        <option value="whisky">ウィスキー</option>
        <option value="sour">サワー</option>
        <option value="shochu">焼酎</option>
        <option value="sake">日本酒</option>
        <option value="highball">ハイボール</option>
        <option value="other">その他</option>
      </select>

      <button id="matchButton">マッチを探す</button>
      <div id="result"></div>
      <Link to="/about">紹介ページへジャンプ</Link>
    </main>
  );
}