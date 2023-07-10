import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import ProductForm from "../../../components/ProductForm";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function EditProductPage() {
	const [productInfo, setProductInfo] = useState(null);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (!id) return;
		axios.get("/api/products?id=" + id).then((res) => {
			setProductInfo(res.data);
		});
	}, [id]);

	console.log(productInfo, "productInfo");

	return (
		<Layout>
			<h1 className="m-6 text-2xl font-bold text-center">Edit Product</h1>
			<ProductForm product={productInfo} />
		</Layout>
	);
}
