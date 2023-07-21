import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [editedCategory, setEditedCategory] = useState(null);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState("");
	const [parentCategory, setParentCategory] = useState("");
	const [properties, setProperties] = useState([]);

	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		const response = await axios.get("/api/categories");
		setCategories(response.data);
		setLoading(false);
	};

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
			<h1 className="text-2xl font-semibold tracking-wide mt-6 mb-2">
				Categories
			</h1>
			<label
				htmlFor="category"
				className="block text-md font-medium mb-2 mt-10">
				{editedCategory
					? `Edit category ${editedCategory.name}`
					: "Create new category"}
			</label>
			<form onSubmit={saveCategory} className="flex flex-col gap-2">
				<div className="flex flex-row gap-2">
					<input
						className="border border-gray-300 "
						type="text"
						placeholder="Category name"
						onChange={(e) => setName(e.target.value)}
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
				<div>
					<label className="">Properties</label>
					<button
						type="button"
						className="btn-secondary
						ml-5
					"
						onClick={addProperty}>
						Add new property
					</button>
					<div className="flex flex-col gap-2 mt-2">
						{properties.map((property, index) => (
							<div key={index} className="flex flex-row gap-2">
								<input
									className="border border-gray-300 "
									type="text"
									placeholder="Property name"
									onChange={(e) =>
										handlePropertyNameChange(index, property, e.target.value)
									}
									value={property.name}
								/>
								<input
									className="border border-gray-300 "
									type="text"
									placeholder="Property values"
									onChange={(e) =>
										handlePropertyValuesChange(index, property, e.target.value)
									}
									value={property.values}
								/>
								<button
									type="button"
									className="btn-secondary
								ml-5
							"
									onClick={() => removeProperty(index)}>
									Remove
								</button>
							</div>
						))}
					</div>
				</div>

				<button type="submit" className="btn-primary max-w-fit">
					Save
				</button>
			</form>

			<h3 className="text-xl font-semibold tracking-wide mt-6 mb-2">
				Existing categories
			</h3>

			{loading ? (
				<p>Loading...</p>
			) : (
				<table className="basic mt-4">
					<thead>
						<tr>
							<th className="px-4 py-2">Category Name</th>
							<th className="px-4 py-2">Parent Category</th>
							<th className="px-4 py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{categories.length > 0 &&
							categories.map((category) => (
								<tr key={category.id}>
									<td className="px-4 py-2">{category.name}</td>
									<td className="px-4 py-2">
										{category.parent && category.parent.name}
									</td>
									<td className="px-4 py-2 flex gap-2 justify-end">
										<button
											onClick={() => editCategory(category)}
											className="btn-primary">
											Edit
										</button>
										<button
											onClick={() => deleteCategory(category)}
											className="btn-primary">
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

export default withSwal(({ swal }, ref) => {
	return <Categories swal={swal} ref={ref} />;
});
