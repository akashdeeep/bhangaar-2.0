import Layout from "@/components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [product, setProduct] = useState({
		name: "",
		description: "",
		price: 0,
		image: "",
	});

	async function createProduct(e) {
		e.preventDefault();

		try {
			const res = await axios.post("/api/products", product);
			router.push("/products");
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Layout>
			<form onSubmit={createProduct}>
				<div className="flex flex-col items-center gap-2">
					<h1 className="m-6 text-2xl font-bold text-center">Add Product</h1>
					<label>Product Name</label>
					<input
						className="mb-5"
						type="text"
						placeholder="Product Name"
						value={product.name}
						onChange={(e) => setProduct({ ...product, name: e.target.value })}
					/>
					<label>Product Description</label>
					<textarea
						className="mb-5"
						placeholder="Product Description"
						value={product.description}
						onChange={(e) =>
							setProduct({ ...product, description: e.target.value })
						}
					/>
					<label>Product Price</label>
					<input
						className="mb-5"
						type="number"
						min="1"
						step="any"
						placeholder="Product Price"
						value={product.price}
						onChange={(e) =>
							setProduct({ ...product, price: Number(e.target.value) })
						}
					/>
					<label>Product Image</label>
					<input
						className="mb-5"
						type="file"
						value={product.image}
						onChange={(e) => setProduct({ ...product, image: e.target.value })}
					/>
					<button type="submit" className="btn-primary mt-5">
						Add Product
					</button>
				</div>
			</form>
		</Layout>
	);
}
