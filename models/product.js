import { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
	userName: { type: String, required: true },
	userEmail: { type: String, required: true },
	name: { type: String, required: true },
	price: { type: Number, required: true },
	description: { type: String },
	images: { type: Array, default: [] },
	category: { type: String },
	quantity: { type: Number },
	dateCreated: { type: Date, default: Date.now },
	dateUpdated: { type: Date, default: Date.now },
	dateDeleted: { type: Date },
	isDeleted: { type: Boolean, default: false },
	viewCount: { type: Number, default: 0 },
});

export const Product = models.Product || model("Product", ProductSchema);
