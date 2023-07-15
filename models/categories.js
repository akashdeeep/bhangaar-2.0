import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	parent: {
		type: Schema.Types.ObjectId,
		ref: "Category",
	},
	dateCreated: { type: Date, default: Date.now },
	dateUpdated: { type: Date, default: Date.now },
	dateDeleted: { type: Date },
	isDeleted: { type: Boolean, default: false },
});

export const Category = models.Category || model("Category", CategorySchema);
