import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { use, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { useEffect } from "react";
import uploadIcon from "../public/file.png";
import Image from "next/image";

export default function ProductForm(props) {
	console.log(props.product, "props.product");
	const [product, setProduct] = useState(
		props.product || {
			name: "",
			description: "",
			price: 0,
			images: [],
		}
	);
	console.log(product, "product");
	const [goToProducts, setGoToProducts] = useState(false);

	async function saveProduct(e) {
		e.preventDefault();
		if (props.product) {
			await axios.put("/api/products", product);
			setGoToProducts(true);
			return;
		}
		await axios.post("/api/products", product);
		setGoToProducts(true);
	}

	if (goToProducts) {
		Router.push("/products");
	}

	useEffect(() => {
		if (props.product) {
			setProduct(props.product);
		}
	}, [props.product]);

	async function uploadImages(e) {
		if (e.target.files.length === 0) return;
		const files = Array.from(e.target.files);
		const formData = new FormData();
		files.forEach((file, i) => {
			formData.append(i, file);
		});
		const images = await axios.post("/api/upload", formData);
		setProduct({ ...product, images: images.data });
	}

	return (
		<form onSubmit={saveProduct}>
			<div className="flex flex-col items-center gap-2">
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
				<label>Product Images</label>
				<div className="m-5">
					<label className="flex items-center cursor-pointer justify-center border-dashed border border-gray-300 rounded-md h-32 w-32">
						<Image
							src={uploadIcon}
							alt="upload icon"
							height={100}
							width={100}
						/>
						<input type="file" className="hidden" onChange={uploadImages} />
					</label>
					{!product.images.length && (
						<p
							className="text-center 
						text-gray-400
						mt-5
						">
							No images uploaded
						</p>
					)}
				</div>
				<button type="submit" className="btn-primary mt-5">
					Save
				</button>
			</div>
		</form>
	);
}
