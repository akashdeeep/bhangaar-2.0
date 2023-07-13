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
import Dropzone from "react-dropzone";
import { Container } from "reactstrap";

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

	const [image, setImage] = useState();
	const [loading, setLoading] = useState(false);

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

	async function handleDrop(acceptedFiles) {
		const formData = new FormData();
		formData.append("file", acceptedFiles[0]);
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
		console.log(product, "product");
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
				<Container>
					<h1 className="text-center text-2xl font-bold">Upload Images</h1>
					<Dropzone
						className="flex justify-center items-center border-2 border-dashed border-gray-400 rounded-lg h-32 w-96"
						onDrop={handleDrop}
						onChange={(e) => setImage(e.target.value)}
						value={image}>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div {...getRootProps({ className: "dropzone" })}>
									<span className="text-center text-gray-400">
										<Image
											src={uploadIcon}
											alt="upload icon"
											width={50}
											height={50}
										/>
									</span>
									<p className="text-center text-gray-400">
										Drag 'n' drop some files here, or click to select files
									</p>
									<input {...getInputProps()} />
								</div>
							</section>
						)}
					</Dropzone>
				</Container>

				<button type="submit" className="btn-primary mt-5">
					Save
				</button>
			</div>
		</form>
	);
}
