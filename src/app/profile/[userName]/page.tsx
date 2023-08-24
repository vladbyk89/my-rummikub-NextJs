import Logout from "./Logout";

export function generateMetadata({ params }: { params: { userName: string } }) {
  const { userName } = params;

  return {
    title: `${userName} Profile Page`,
  };
}

export default function UserProfile({
  params,
}: {
  params: { userName: string };
}) {
  const { userName } = params;

  return (
    <main className="w-full h-full flex flex-col justify-center items-center gap-2">
      <div>UserID: {userName}</div>
      <Logout />
    </main>
  );
}
