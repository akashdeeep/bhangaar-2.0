import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Products() {
	const router = useRouter();
	const { data: session, status } = useSession();

	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios.get("/api/products").then((res) => {
			setProducts(res.data);
		});
	}, []);

	return (
		<Layout>
			<div className="flex flex-col items-center justify-center ">
				<Link className="btn-primary mt-6" href={"products/new"}>
					Add new Product
				</Link>

				<table className="w-full mt-6 border-collapse border border-black">
					<thead>
						<tr className="border-collapse border border-black">
							<th className="border-collapse border border-black">Name</th>
							<th className="border-collapse border border-black">Price</th>
							<th className="border-collapse border border-black">Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr
								key={product._id}
								className="border-collapse border border-black">
								<td className="border-collapse border border-black">
									{product.name}
								</td>
								<td className="border-collapse border border-black">
									{product.price}
								</td>
								<td className="border-collapse border border-black">
									<button
										className="btn-primary"
										onClick={() => router.push(`/products/${product._id}`)}>
										View
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Layout>
	);
}
