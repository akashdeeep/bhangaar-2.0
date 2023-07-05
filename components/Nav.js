import Image from "next/image";
import logo from "../public/logo.png";
import Link from "next/link";
import dashboardIcon from "../public/dashboard.png";
import ordersIcon from "../public/order.png";
import productsIcon from "../public/box.png";

console.log(logo);

export default function Nav() {
	return (
		<aside className="flex flex-col w-64 h-screen bg-green-600 text-white p-4 rounded-r-md">
			<Link href="/">
				<div className="pb-8">
					<Image src={logo} alt="Logo" width={200} height={200} />
				</div>
			</Link>
			<nav>
				<Link href="/dashboard">
					<div className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
						<Image src={dashboardIcon} alt="Dashboard" width={24} height={24} />
						<span>Dashboard</span>
					</div>
				</Link>
				<Link href="/orders">
					<div className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
						<Image src={ordersIcon} alt="Orders" width={24} height={24} />
						<span>Orders</span>
					</div>
				</Link>
				<Link href="/products">
					<div className="flex items-center space-x-2 p-2 hover:bg-green-700 rounded">
						<Image src={productsIcon} alt="Products" width={24} height={24} />
						<span>Products</span>
					</div>
				</Link>
			</nav>
		</aside>
	);
}
