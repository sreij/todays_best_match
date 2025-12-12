import { Link } from "react-router-dom";

export default function About() {
  return (
    <main>
      <section className="about">
        <h1>このサイトについて</h1>
        <p>「今夜のベストマッチ！」は、お酒とおつまみの新しいマッチを見つけるためのサイトです。</p>
        <author>
          <h2>このサイトの制作者</h2>
          <h3>Team Osake</h3>
          5423085 伊藤 数真<br />
          5423083 原 幸輝<br />
          5423060 中川 颯丈<br />
          5423020 齋藤 礼二
        </author>
        このコンテンツは、日本大学文理学部情報科学科デジタルコンテンツの制作課題です。
      </section>
    </main>
  );
}