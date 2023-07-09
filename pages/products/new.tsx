import Layout from "@/components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

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
			<ProductForm />
		</Layout>
	);
}
