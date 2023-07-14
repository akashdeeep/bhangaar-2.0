import { Category } from "../../models/categories";
import mongooseConnect from "../../lib/mongoose";
import clientPromise from "../../lib/mongodb";

export default async function handle(req, res) {
	const { method } = req;
	await mongooseConnect();

	if (method == "POST") {
		const { name } = req.body;
		const category = await Category.create({ name });
		res.json(category);
	}
	if (method == "GET") {
		const categories = await Category.find({});
		res.json(categories);
	}
}
