import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { use, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { useEffect } from "react";
import uploadIcon from "../public/file.png";
import Image from "next/image";
import { headers } from "next/dist/client/components/headers";
import { Cloudinary } from "@cloudinary/url-gen";

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

	const [imageSrc, setImageSrc] = useState();
	const [uploadData, setUploadData] = useState();

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

	function handleOnChange(changeEvent) {
		const file = changeEvent.target.files[0];
		const fileReader = new FileReader();
		fileReader.onload = (e) => {
			setImageSrc(e.target.result);
		};
		fileReader.readAsDataURL(file);
	}

	async function handleUploadImages(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", e.target.file.files[0]);
		formData.append("upload_preset", "bhangaar2");
		const res = await fetch(
			"https://api.cloudinary.com/v1_1/bhangaar2/image/upload",
			{
				method: "POST",
				body: formData,
			}
		);
		const data = await res.json();
		console.log(data, "data");
		setProduct({ ...product, images: [...product.images, data.secure_url] });
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

				<form
					onSubmit={handleUploadImages}
					className="flex flex-col items-center gap-2"
					onChange={handleOnChange}
					method="POST">
					<label>Upload Images</label>
					<div className="flex flex-col items-center gap-2">
						<input
							className="mb-5"
							type="file"
							name="file"
							multiple
							accept="image/*"
						/>
						<button type="submit" className="btn-primary">
							Upload
						</button>
					</div>
				</form>

				<button type="submit" className="btn-primary mt-5">
					Save
				</button>
			</div>
		</form>
	);
}
