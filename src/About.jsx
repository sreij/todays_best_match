export default function About() {
  return (
    <main>
      <section className="about">
        <h1>このサイトについて</h1>
        <p>「今夜のベストマッチ！」は、お酒とおつまみの新しいマッチを見つけるためのサイトです。</p>
        <div className="intro-movie">
          <h2>紹介動画</h2>
          <p>このサイトの紹介動画をご覧ください。</p>
          <video controls>
            <source src="videos\intro_video.mp4" type="video/mp4" />
            お使いのブラウザは動画タグに対応していません。
          </video>
        </div>
        <author>
          <h2>このサイトの制作者</h2>
          <h3>Team Osake</h3>
          5423085 伊藤 数真<br />
          5423083 原 幸輝<br />
          5423060 中川 颯丈<br />
          5423020 齋藤 礼二
        </author>
        このコンテンツは、日本大学文理学部情報科学科「デジタルコンテンツ」の制作課題です。
        <br/>
        <a href="https://github.com/sreij/todays_best_match">GitHub リポジトリ</a>
        <br />
        <a href="dc2025_07.pdf">企画書</a>
        <br />
        <a href="マニュアル.pdf">説明文書</a>
      </section>
    </main>
  );
}