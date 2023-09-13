import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
	{
		line_items: Object,
		name: String,
		email: String,
		city: String,
		postalCode: String,
		streetAddress: String,
		country: String,
		paid: Boolean,
		date: String,
	},
	{
		timestamps: true,
	}
);
// {l.price_data?.product_data.name} x{l.quantity}

export const Order = models?.Order || model("Order", OrderSchema);
