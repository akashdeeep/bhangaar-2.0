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
		const { name, price, description, image, category, quantity } = req.body;
		const product = {
			name,
			price,
			description,
			image,
			category,
			quantity,
			dateCreated: Date.now(),
			dateUpdated: Date.now(),
			dateDeleted: null,
			isDeleted: false,
		};
		const result = await collection.insertOne(product);
		res.status(200).json(result.ops);
	}
	if (method == "GET") {
		const result = await collection.find({ isDeleted: false }).toArray();
		res.status(200).json(result);
	}
}
