import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "@/components/Layout";
import Image from "next/image";

export default function Home() {
	const { data: session, status } = useSession();
	if (!session) {
		return (
			<Layout>
				<div className="flex flex-col items-center justify-center ">
					Not signed in <br />
					<button onClick={() => signIn()}>Sign in</button>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center">
					<Image
						src={session?.user?.image}
						alt="Picture of the author"
						width={100}
						height={100}
					/>
					<h1 className="text-6xl font-bold">Welcome {session.user.name}</h1>
					<p className="mt-3 text-2xl">
						You can now access our super secret pages
					</p>
					<button
						className="p-3 my-3 text-white bg-indigo-600 rounded-md"
						onClick={() => signOut()}>
						Sign out
					</button>
				</div>
			</div>
		</Layout>
	);
}
