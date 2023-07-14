import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Categories() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await axios.get("/api/categories");
			setCategories(response.data);
			setLoading(false);
		};
		fetchCategories();
	}, []);

	const [name, setName] = useState("");

	async function saveCategory(e) {
		e.preventDefault();
		await axios.post("/api/categories", { name });
		setName("");
	}

	return (
		<Layout>
			<h1 className="text-2xl font-semibold tracking-wide mt-6 mb-2">
				Categories
			</h1>
			<label
				htmlFor="category"
				className="block text-md font-medium mb-2 mt-10">
				New category name
			</label>
			<form onSubmit={saveCategory} className="flex gap-2">
				<input
					className="border border-gray-300  m-0"
					type="text"
					placeholder="Category name"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<button type="submit" className="btn-primary">
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
						</tr>
					</thead>
					<tbody>
						{categories.length > 0 &&
							categories.map((category) => (
								<tr key={category.id}>
									<td className="px-4 py-2">{category.name}</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
		</Layout>
	);
}
