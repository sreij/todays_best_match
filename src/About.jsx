import Footer from "./Footer";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main>
      <section>
        <h2>このサイトについて</h2>
        <p>「今夜のベストマッチ！」は、あなたにぴったりのお酒を見つけるためのサイトです。</p>
      </section>
      <Link to="/">戻る</Link>
    </main>
  );
}