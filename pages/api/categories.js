import { Category } from "../../models/categories";
import mongooseConnect from "../../lib/mongoose";
import clientPromise from "../../lib/mongodb";

export default async function handle(req, res) {
	const { method } = req;
	await mongooseConnect();

	if (method === "POST") {
		const { name, parentCategory, properties } = req.body;

		const categoryDoc = await Category.create({
			name,
			parent: parentCategory,
			properties,
		});
		res.json(categoryDoc);
	}
	if (method == "GET") {
		const categories = await Category.find({});
		res.json(categories);
	}
}
