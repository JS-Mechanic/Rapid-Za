// Test ID: IIDSAT

import {calcMinutesLeft, formatCurrency, formatDate} from "../../utils/helpers";
import {getOrder} from "../../services/apiRestaurant.js";
import {useLoaderData} from "react-router-dom";
import OrderItem from "./OrderItem.jsx";

function Order() {
	const order = useLoaderData();
	const {id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart} = order;
	const deliveryIn = calcMinutesLeft(estimatedDelivery);

	return (
		<div className="px-4 py-6 space-y-8">
			<div className="flex items-center justify-between flex-wrap gap-2">
				<h2 className="text-xl font-semibold">Order #{id} Status</h2>

				<div className="space-x-2">
					{priority && (
						<span
							className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold
						 uppercase text-red-50 tracking-wide">
							Priority
						</span>
					)}
					<span
						className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold
						 uppercase text-green-50 tracking-wide">
						{status} order
					</span>
				</div>
			</div>

			<div
				className="flex items-center justify-between flex-wrap gap-2
			bg-stone-200 px-6 py-5 rounded-md">
				<p className="font-medium">
					{deliveryIn >= 0
						? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
						: "Order should have arrived"}
				</p>
				<p className="text-xs text-stone-500">
					(Estimated delivery: {formatDate(estimatedDelivery)})
				</p>
			</div>

			<ul className="divide-y divide-stone-200 border-b border-t">
				{cart.map(item => (
					<OrderItem item={item} key={item.id} />
				))}
			</ul>

			<div className="space-y-2 bg-stone-200 rounded-md py-5 px-6">
				<p className="text-sm font-medium text-stone-600">
					Price pizza: {formatCurrency(orderPrice)}
				</p>
				{priority && (
					<p className="text-sm font-medium text-stone-600">
						Price priority: {formatCurrency(priorityPrice)}
					</p>
				)}
				<p className="font-bold">
					To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
				</p>
			</div>
		</div>
	);
}

export async function loader({params}) {
	return await getOrder(params.orderId);
}
export default Order;
