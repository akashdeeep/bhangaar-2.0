import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import { use, useEffect } from "react";

export default function EditProductPage() {
	const router = useRouter();
	const { id } = router.query;
	useEffect(() => {
		if (!id) return;
		axios.get("/api/products?id=" + id).then((res) => console.log(res.data));
	}, [id]);

	return (
		<Layout>
			<h1>Edit Product</h1>
		</Layout>
	);
}
