import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

const Category =
	mongoose.models.Category || mongoose.model("Category", CategorySchema);
