import OrderIcon from "../../icons/OrderIcon";

const OrdersButton = () => {
  return (
    <li>
      <a
        href="/orders"
        className="flex items-center p-2 rounded-lg dark:text-white hover:bg-orange-100 dark:hover:bg-gray-700 group"
      >
        <OrderIcon />
        <span className="ms-3">Órdenes</span>
      </a>
    </li>
  );
};

export default OrdersButton;
