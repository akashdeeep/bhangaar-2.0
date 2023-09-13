import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

const adminEmails = ["donaldduckwithpants@gmail.com"];

export const authOptions = {
	secret: process.env.SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	adapter: MongoDBAdapter(clientPromise),
	callbacks: {
		session: ({ session, token, user }) => {
			if (adminEmails.includes(session?.user?.email)) {
				return session;
			} else {
				return false;
			}
		},
	},
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
	try {
		const session = await getServerSession(req, res, authOptions);
		if (!adminEmails.includes(session?.user?.email)) {
			res.status(401).end();
		} else {
			// Continue with the admin request handling here
			// Your admin-specific logic goes here
			// res.status(200).json({ message: "Admin request successful" });
		}
	} catch (error) {
		console.error("Error checking admin status:", error);
		res.status(500).end();
	}
}
