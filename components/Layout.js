import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "../components/Nav";

export default function Layout(props) {
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
		<div className="bg-blue-900 w-screen h-screen flex gap-1">
			<Nav />
			<div className="bg-white text-green-700 flex-grow rounded-l-md p-4">
				{props.children}
			</div>
		</div>
	);
}
