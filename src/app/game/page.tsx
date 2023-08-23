import "../styles/GamePage.scss";
import "../styles/Buttons.scss";


export default async function page() {
  return (
    <main className="gamePage">
      <section className="playersArea">
        <div></div>
        <div></div>
        <div></div>
      </section>
      <section className="gameBoard"></section>
      <section className="playerHand">
        <div className="tiles"></div>
        <div className="actionButtons">
          <button className="buttonStyleTwo">123</button>
          <button className="buttonStyleTwo">777</button>
          <button className="buttonStyleTwo">RESET</button>
          <button className="buttonStyleTwo">End turn</button>
        </div>
      </section>
    </main>
  );
}
