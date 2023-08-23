import "../styles/GamePage.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="gamePage">
      <section className="playersArea">
        <div></div>
        <div></div>
        <div></div>
      </section>
      <section className="gameBoard">{children}</section>
      <section className="playerHand"></section>
    </main>
  );
}
