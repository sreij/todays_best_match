import Footer from "./Footer";
import Header from "./Header";

export default function App() {
  return (
      <div>
        <Header />
        <h1>今夜のベストマッチ！</h1>
        <h2>edited by kouki noyo</h2>

      <main>
        <label for="category">お酒の種類を選択：</label>
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
      </main>
      <Footer />
    </div>
  );
}