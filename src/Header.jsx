import { Link } from "react-router-dom";

// Webサイト上部のデザインを組み込むためのコンポーネントです。「<Header />でアクセス」
export default function Header() {
  return (
    <header>
      <div className="header-left">
        <Link to="/"><img src="/pictures/Osake.png" alt="ロゴ画像" width={100} /></Link>
        <h1>今夜のベストマッチ！</h1>
      </div>
      <h2>edited by Team osake</h2>
    </header>
  );
}