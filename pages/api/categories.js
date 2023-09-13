import { Category } from "../../models/categories";
import mongooseConnect from "../../lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
	const { method } = req;
	await mongooseConnect();
	await isAdminRequest(req, res);

	if (method == "GET") {
		// find all categories
		try {
			var categories = await Category.find({});
			// console.log("999999999999999", typeof categories);
			// console.log({ categories });
			res.json(categories);
		} catch (error) {
			// Handle any errors that might occur during Category.find()
			// console.error("-------------------------", error);
			res.status(500).json({ error: "Internal server error" });
		}
	}

	if (method === "POST") {
		const { name, parentCategory, properties } = req.body;
		const categoryDoc = await Category.create({
			name,
			parent: parentCategory || undefined,
			properties,
		});
		res.json(categoryDoc);
	}

	if (method === "PUT") {
		const { name, parentCategory, properties, _id } = req.body;
		const categoryDoc = await Category.updateOne(
			{ _id },
			{
				name,
				parent: parentCategory || undefined,
				properties,
			}
		);
		res.json(categoryDoc);
	}

	if (method === "DELETE") {
		const { _id } = req.query;
		await Category.deleteOne({ _id });
		res.json("ok");
	}
}
