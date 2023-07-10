import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";

export default function DeleteProductPage() {
	const router = useRouter();
	const [productInfo, setProductInfo] = useState(null);
	const { id } = router.query;
	useEffect(() => {
		if (!id) return;
		axios.get("/api/products?id=" + id).then((res) => {
			setProductInfo(res.data);
		});
	}, [id]);

	function goBack() {
		router.back();
	}
	console.log(productInfo, "productInfo");

	async function deleteProduct() {
		await axios.delete("/api/products?id=" + id);
		console.log("deleted");
		goBack();
	}

	return (
		<Layout>
			<h1 className="m-6 text-2xl font-bold text-center">
				Are you sure you want to delete &nbsp;"{productInfo?.name}"?
			</h1>
			<div className="flex justify-center gap-5">
				<button
					className="btn-primary 
                    bg-red-500 hover:bg-red-600"
					onClick={deleteProduct}>
					Yes
				</button>
				<button className="btn-primary" onClick={goBack}>
					No
				</button>
			</div>
		</Layout>
	);
}
