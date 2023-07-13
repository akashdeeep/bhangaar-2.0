/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.googleusercontent.com",
				hostname: "*.cloudinary.com",
			},
		],
	},
};

module.exports = nextConfig;
