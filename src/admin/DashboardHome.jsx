import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API = "http://localhost:3001";

const DashboardHome = () => {
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value }) => (
    <div className="bg-white shadow rounded-xl p-6">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );

  const ChartCard = ({ title, data, dataKey, barColor }) => (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="font-semibold mb-4 text-gray-700">{title}</h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis tick={{ fill: "#444" }} />
          <YAxis tick={{ fill: "#444" }} />
          <Tooltip />

          <Bar dataKey={dataKey} fill={barColor} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const RecentReservations = ({ reservations }) => (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="font-semibold mb-4">Recent Reservations</h3>

      {/* Header */}
      <div className="grid grid-cols-[1fr_120px_140px] text-xs font-semibold text-gray-500 pb-2 border-b">
        <span>Name</span>
        <span className="text-center">Guests</span>
        <span className="text-right">Date</span>
      </div>

      <ul className="space-y-3 mt-3">
        {reservations.map((r) => (
          <li
            key={r.id}
            className="grid grid-cols-[1fr_120px_140px] items-center text-sm"
          >
            {/* Name */}
            <span className="truncate">{r.name}</span>

            {/* Guests */}
            <span className="text-center font-medium">{r.guests} guests</span>

            {/* Date */}
            <span className="text-right text-gray-600">{r.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const RecentOrders = ({ orders }) => (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="font-semibold mb-4">Recent Orders</h3>

      {/* Header */}
      <div className="grid grid-cols-[1fr_120px_140px] text-xs font-semibold text-gray-500 pb-2 border-b">
        <span>Items</span>
        <span className="text-center">Total</span>
        <span className="text-right">Date</span>
      </div>

      <ul className="space-y-3 mt-3">
        {orders.map((o) => (
          <li
            key={o.id}
            className="grid grid-cols-[1fr_120px_140px] items-center text-sm"
          >
            {/* Items */}
            <span className="truncate">{o.items.length} items</span>

            {/* Total */}
            <span className="text-center font-medium">${o.total}</span>

            {/* Date */}
            <span className="text-right text-gray-600">
              {new Date(o.date).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const fetchDashboardData = async () => {
    const [menu, gallery, orders, reservations] = await Promise.all([
      axios.get(`${API}/menu`),
      axios.get(`${API}/gallery`),
      axios.get(`${API}/order`),
      axios.get(`${API}/reservations`),
    ]);

    setStats({
      menu: menu.data.length,
      gallery: gallery.data.length,
      orders: orders.data.length,
      reservations: reservations.data.length,
    });

    setOrders(orders.data);
    setReservations(reservations.data);
  };

  // Orders grouped by month
  const ordersChartData = Object.values(
    orders.reduce((acc, order) => {
      const month = new Date(order.date).toLocaleString("default", {
        month: "short",
      });
      acc[month] = acc[month] || { month, orders: 0 };
      acc[month].orders += 1;
      return acc;
    }, {})
  );

  // Reservations grouped by month
  const reservationsChartData = Object.values(
    reservations.reduce((acc, r) => {
      const month = new Date(r.date).toLocaleString("default", {
        month: "short",
      });
      acc[month] = acc[month] || { month, reservations: 0 };
      acc[month].reservations += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Welcome Raj 👋</h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={stats.orders} />
        <StatCard title="Reservations" value={stats.reservations} />
        <StatCard title="Menu Items" value={stats.menu} />
        <StatCard title="Gallery Images" value={stats.gallery} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Orders Per Month"
          data={ordersChartData}
          dataKey="orders"
          barColor="#7c2d12"
        />
        <ChartCard
          title="Reservations Per Month"
          data={reservationsChartData}
          dataKey="reservations"
          barColor="#15803d"
        />
      </div>

      {/* RECENT ACTIVITY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentReservations reservations={reservations.slice(-5).reverse()} />
        <RecentOrders orders={orders.slice(-5).reverse()} />
      </div>
    </div>
  );
};

export default DashboardHome;
