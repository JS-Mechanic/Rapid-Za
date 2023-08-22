import {Link} from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";
import UserName from "../features/user/UserName.jsx";

export default function Header() {
	return (
		<header
			className="flex items-center justify-between border-b border-stone-300
		bg-yellow-400 px-4 py-3 uppercase sm:px-6">
			<Link to="/" className="tracking-widest">
				{/* eslint-disable-next-line react/no-unescaped-entities */}
				Rapid 'Za Co.
			</Link>
			<SearchOrder />
			<UserName />
		</header>
	);
}
