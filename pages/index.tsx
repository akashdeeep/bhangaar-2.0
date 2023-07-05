import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "../components/Nav";

export default function Home() {
	const { data: session } = useSession();
	if (!session) {
		return (
			<div className="bg-blue-900 w-screen h-screen flex items-center">
				<div className="text-center w-full text-white">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded-lg"
						onClick={() => signIn("google")}>
						{" "}
						Login with Google
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-blue-900 w-screen h-screen flex items-center">
			<Nav />
			<div className="text-center w-full text-white">
				<h1 className="text-5xl font-bold mb-4">Welcome {session.user.name}</h1>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 px-4 rounded-lg"
					onClick={() => signOut()}>
					{" "}
					Logout
				</button>
			</div>
		</div>
	);
}
