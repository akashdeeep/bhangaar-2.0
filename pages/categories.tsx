import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
	const [categories, setCategories] = useState([]);
	const [name, setName] = useState("");
	const [parentCategory, setParentCategory] = useState("");
	const [properties, setProperties] = useState([]);
	const [editedCategory, setEditedCategory] = useState(null);

	useEffect(() => {
		fetchCategories();
	}, []);

	async function fetchCategories() {
		const { data } = await axios.get("/api/categories");
		setCategories(data);
	}

	async function saveCategory(ev) {
		ev.preventDefault();
		const category = {
			name,
			parent: parentCategory,
			properties: properties.map(({ name, values }) => ({
				name,
				values: values.split(",").map((v) => v.trim()),
			})),
		};
		if (editedCategory) {
			await axios.put("/api/categories?_id=" + editedCategory._id, category);
		} else {
			await axios.post("/api/categories", category);
		}
		setEditedCategory(null);
		setName("");
		setParentCategory("");
		setProperties([]);
		fetchCategories();
	}

	function editCategory(category) {
		setEditedCategory(category);
		setName(category.name);
		setParentCategory(category.parent?._id || "");
		setProperties(
			category.properties.map(({ name, values }) => ({
				name,
				values: values.join(","),
			}))
		);
	}

	async function deleteCategory(category) {
		const { isConfirmed } = await swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
		});
		if (isConfirmed) {
			await axios.delete("/api/categories?_id=" + category._id);
			fetchCategories();
		}
	}

	function addProperty() {
		setProperties((prev) => {
			return [
				...prev,
				{
					name: "",
					values: "",
				},
			];
		});
	}

	function handlePropertyNameChange(index, property, newName) {
		console.log(index, property, newName);
		setProperties((prev) => {
			const properties = [...prev];
			properties[index].name = newName;
			return properties;
		});
	}

	function handlePropertyValuesChange(index, property, newValues) {
		setProperties((prev) => {
			const properties = [...prev];
			properties[index].values = newValues;
			return properties;
		});
	}

	function removeProperty(index) {
		setProperties((prev) => {
			const properties = [...prev];
			properties.splice(index, 1);
			return properties;
		});
	}

	return (
		<Layout>
			<h1
				className="text-2xl
			font-bold
			mb-4
			">
				Categories
			</h1>
			<label
				className="block
			font-semibold
			mb-2
			">
				{editedCategory
					? `Edit category ${editedCategory.name}`
					: "Create new category"}
			</label>
			<form onSubmit={saveCategory}>
				<div
					className="flex
				mb-2
				gap-1
				">
					<input
						type="text"
						placeholder={"Category name"}
						onChange={(ev) => setName(ev.target.value)}
						value={name}
					/>
					<select
						onChange={(ev) => setParentCategory(ev.target.value)}
						value={parentCategory}>
						<option value="">No parent category</option>
						{categories.length > 0 &&
							categories.map((category) => (
								<option key={category._id} value={category._id}>
									{category.name}
								</option>
							))}
					</select>
				</div>
				<div className="">
					<label
						className="
					block
					font-semibold
					mb-2
					">
						Properties
					</label>
					<button
						onClick={addProperty}
						type="button"
						className="btn-primary text-sm mb-2">
						Add new property
					</button>
					{properties.length > 0 &&
						properties.map((property, index) => (
							<div key={property._id} className="flex gap-1 mb-2">
								<input
									type="text"
									className="mb-0"
									value={property.name}
									onChange={(ev) =>
										handlePropertyNameChange(index, property, ev.target.value)
									}
									placeholder="property name"
								/>
								<input
									type="text"
									className="mb-0"
									value={property.values}
									onChange={(ev) =>
										handlePropertyValuesChange(index, property, ev.target.value)
									}
									placeholder="values, comma separated"
								/>
								<button
									type="button"
									onClick={() => removeProperty(index)}
									className="btn-primary-red"
									disabled={properties.length === 1}>
									Remove
								</button>
							</div>
						))}
				</div>
				<div className="flex gap-1">
					{editedCategory && (
						<button
							type="button"
							onClick={() => {
								setEditedCategory(null);
								setName("");
								setParentCategory("");
								setProperties([]);
							}}
							className="btn-primary
						mr-1
						mb-2
						mt-2">
							Cancel
						</button>
					)}
					<button
						type="submit"
						className="btn-primary
						mr-1
						mb-2
						mt-2
					">
						Save
					</button>
				</div>
			</form>
			{!editedCategory && (
				<table
					className="basic mt-4
				table-auto
				border-collapse
				border
				border-black
				">
					<thead>
						<tr>
							<td>Category name</td>
							<td>Parent category</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{categories.length > 0 &&
							categories.map((category) => (
								<tr key={category._id}>
									<td>{category.name}</td>
									<td>{category?.parent?.name}</td>
									<td>
										<button
											onClick={() => editCategory(category)}
											className="btn-primary mr-1">
											Edit
										</button>
										<button
											onClick={() => deleteCategory(category)}
											className="btn-primary-red">
											Delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
		</Layout>
	);
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
