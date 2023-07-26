import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
	const [editedCategory, setEditedCategory] = useState(null);
	const [name, setName] = useState("");
	const [parentCategory, setParentCategory] = useState("");
	const [categories, setCategories] = useState([]);
	const [properties, setProperties] = useState([]);
	useEffect(() => {
		fetchCategories();
	}, []);
	function fetchCategories() {
		axios.get("/api/categories").then((result) => {
			setCategories(result.data);
		});
	}
	async function saveCategory(ev) {
		ev.preventDefault();
		const data = {
			name,
			parentCategory,
			properties: properties.map((p) => ({
				name: p.name,
				values: p.values.split(","),
			})),
		};
		if (editedCategory) {
			data._id = editedCategory._id;
			await axios.put("/api/categories", data);
			setEditedCategory(null);
		} else {
			await axios.post("/api/categories", data);
		}
		setName("");
		setParentCategory("");
		setProperties([]);
		fetchCategories();
	}
	function editCategory(category) {
		setEditedCategory(category);
		setName(category.name);
		setParentCategory(category.parent?._id);
		setProperties(
			category.properties.map(({ name, values }) => ({
				name,
				values: values.join(","),
			}))
		);
	}
	function deleteCategory(category) {
		swal
			.fire({
				title: "Are you sure?",
				text: `Do you want to delete ${category.name}?`,
				showCancelButton: true,
				cancelButtonText: "Cancel",
				confirmButtonText: "Yes, Delete!",
				confirmButtonColor: "#d55",
				reverseButtons: true,
			})
			.then(async (result) => {
				if (result.isConfirmed) {
					const { _id } = category;
					await axios.delete("/api/categories?_id=" + _id);
					fetchCategories();
				}
			});
	}
	function addProperty() {
		setProperties((prev) => {
			return [...prev, { name: "", values: "" }];
		});
	}
	function handlePropertyNameChange(index, property, newName) {
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
	function removeProperty(indexToRemove) {
		setProperties((prev) => {
			return [...prev].filter((p, pIndex) => {
				return pIndex !== indexToRemove;
			});
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
							<div key={property.name} className="flex gap-1 mb-2">
								<input
									type="text"
									value={property.name}
									className="mb-0"
									onChange={(ev) =>
										handlePropertyNameChange(index, property, ev.target.value)
									}
									placeholder="property name (example: color)"
								/>
								<input
									type="text"
									className="mb-0"
									onChange={(ev) =>
										handlePropertyValuesChange(index, property, ev.target.value)
									}
									value={property.values}
									placeholder="values, comma separated"
								/>
								<button
									onClick={() => removeProperty(index)}
									type="button"
									className="btn-primary-red text-sm mb-0
									">
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
							className="btn-primary">
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
