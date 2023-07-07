import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products() {
	return (
		<Layout>
			<div className="flex flex-col items-center justify-center ">
				<Link className="btn-primary mt-6" href={"products/new"}>
					Add new Product
				</Link>
			</div>
		</Layout>
	);
}
