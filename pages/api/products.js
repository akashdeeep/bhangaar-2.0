import mongooseConnect from "../../lib/mongoose";
import clientPromise from "../../lib/mongodb";
import { Product } from "../../models/product";

export default async function handle(req, res) {
	const { method } = req;
	await mongooseConnect();
	const client = await clientPromise;
	const db = await client.db();
	const collection = await db.collection("Products");
	if (method == "POST") {
		const product = new Product(req.body);
		await product.save();
		res.json(product);
	}
	if (method == "GET") {
		if (req.query?.id) {
			res.json(await Product.findById(req.query.id));
		} else {
			res.json(await Product.find({}));
		}
	}
}
