import { Link } from "react-router-dom";

export default function Otsumami() {
  return (
    <main>
      <section>
        <h2>おつまみのページ</h2>
        <p>ここはおつまみの詳細情報を表示するページです。</p>
      </section>
      <Link to="/">戻る</Link>
    </main>
  );
}