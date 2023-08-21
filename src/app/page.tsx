import "./styles/Buttons.scss";
import ProfileLink from "@/components/Home/ProfileLink";

export default async function Home() {
  return (
    <main className="w-full h-full flex justify-center items-center bg-center bg-no-repeat bg-cover bg-main">
      <ProfileLink />
      <button className="buttonStyleOne">Play Now</button>
    </main>
  );
}
