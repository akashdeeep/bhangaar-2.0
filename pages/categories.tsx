import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import editIcon from "@/public/edit.png";
import viewIcon from "@/public/analysis.png";
import deleteIcon from "@/public/delete.png";
import Image from "next/image";

export default function Categories() {
	const router = useRouter();
	const { data: session, status } = useSession();

	const [name, setName] = useState("");

	async function saveCategory(e) {
		e.preventDefault();
		const body = {
			name: e.target.name.value,
		};
		try {
			await axios.post("/api/categories", body);
			router.push("/categories");
		} catch (error) {
			console.log(error);
		}
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
		</Layout>
	);
}
