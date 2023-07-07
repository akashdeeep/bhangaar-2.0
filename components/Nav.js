import Image from "next/image";
import logo from "../public/logo.png";
import Link from "next/link";
import dashboardIcon from "../public/dashboard.png";
import ordersIcon from "../public/order.png";
import productsIcon from "../public/box.png";
import settingsIcon from "../public/settings.png";
import { useRouter } from "next/router";

console.log(logo);

export default function Nav() {
	const inactiveLink = "flex items-center space-x-2 hover:bg-green-700 rounded";
	const activeLink = "flex items-center space-x-2 bg-green-700 rounded";

	const router = useRouter();
	const { pathname } = router;

	return (
		<aside className="flex flex-col w-45 h-screen bg-green-600 text-white p-4 rounded-r-md">
			<Link href="/">
				<div className="pb-8">
					<Image src={logo} alt="Logo" width={150} height={150} />
				</div>
			</Link>
			<nav className="flex flex-col gap-2">
				<Link href="/" className={pathname === "/" ? activeLink : inactiveLink}>
					<div className="flex gap-2 items-center space-x-2 p-2 hover:bg-green-700 rounded">
						<Image src={dashboardIcon} alt="Dashboard" width={24} height={24} />
						<span>Dashboard</span>
					</div>
				</Link>

				<Link
					href="/products"
					className={
						pathname.includes("/products") ? activeLink : inactiveLink
					}>
					<div className="flex gap-2 items-center space-x-2 p-2 hover:bg-green-700 rounded">
						<Image src={productsIcon} alt="Products" width={24} height={24} />
						<span>Products</span>
					</div>
				</Link>

				<Link
					href="/orders"
					className={pathname.includes("/orders") ? activeLink : inactiveLink}>
					<div className="flex gap-2 items-center space-x-2 p-2 hover:bg-green-700 rounded">
						<Image src={ordersIcon} alt="Orders" width={24} height={24} />
						<span>Orders</span>
					</div>
				</Link>

				<Link
					href="/settings"
					className={
						pathname.includes("/settings") ? activeLink : inactiveLink
					}>
					<div className="flex gap-2 items-center space-x-2 p-2 hover:bg-green-700 rounded">
						<Image src={settingsIcon} alt="Settings" width={24} height={24} />
						<span>Settings</span>
					</div>
				</Link>
			</nav>
		</aside>
	);
}
