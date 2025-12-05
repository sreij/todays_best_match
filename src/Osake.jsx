import { Link } from "react-router-dom";

export default function Osake() {
  return (
    <main>
      <section>
        <h2>お酒のページ</h2>
        <p>ここはお酒の詳細情報を表示するページです。</p>
      </section>
      <Link to="/">戻る</Link>
    </main>
  );
}