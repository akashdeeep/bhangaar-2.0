import mongooseConnect from "../../lib/mongoose";
import clientPromise from "../../lib/mongodb";
import { Product } from "../../models/product";

export default async function handle(req, res) {
	const { method } = req;
	await mongooseConnect();
	const client = await clientPromise;
	const db = await client.db();
	// const collection = await db.collection("Products");
	if (method == "POST") {
		const product = new Product(req.body);
		await product.save();
		res.json(product);
	}
	if (method == "GET") {
		if (req.query?.id) {
			res.json(await Product.findById(req.query.id));
			// console.log(req.query.id);
		} else {
			// console.log("products called *****************************");
			res.json(await Product.find({}));
		}
	}
	if (method == "PUT") {
		const product = await Product.findById(req.body._id);
		product.name = req.body.name;
		product.description = req.body.description;
		product.price = req.body.price;
		product.images = req.body.images;
		product.category = req.body.category;
		product.properties = req.body.properties;

		await product.save();
		res.json(product);
	}
	if (method == "DELETE") {
		if (req.query?.id) {
			await Product.deleteOne({ _id: req.query?.id });
			res.json({ message: "Product deleted" });
		}
	}
}
