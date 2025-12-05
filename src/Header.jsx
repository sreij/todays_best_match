import { Link } from "react-router-dom";

// Webサイト上部のデザインを組み込むためのコンポーネントです。
export default function Header() {
  return (
    <>
      <header className="header">
        <div className="header-left">
          <Link to="/"><img src="/pictures/Osake.png" alt="ロゴ画像" width={100} /></Link>
          <h1>今夜のベストマッチ！</h1>
        </div>
        <p>Edited by Team Osake</p>
      </header>
      <nav className="header-nav" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/Osake">Osake</Link>
        <Link to="/Otsumami">Otsumami</Link>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}