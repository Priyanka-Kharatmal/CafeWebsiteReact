import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="relative bg-amber-50 min-h-screen flex flex-col items-center justify-center text-center px-6">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        {/* Animated heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-amber-900 drop-shadow-lg"
        >
          Welcome to Raj’s Café ☕
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg md:text-xl text-gray-700"
        >
          Fresh brews, cozy vibes, and a taste of bliss in every cup.
        </motion.p>

        {/* Animated buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 flex justify-center gap-6"
        >
          <Link
            to="/menu"
            className="bg-amber-700 text-white px-6 py-3 rounded-xl hover:bg-amber-900 transition-all shadow-lg"
          >
            View Menu
          </Link>
          <Link
            to="/reservations"
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition-all shadow-lg"
          >
            Reserve Table
          </Link>
        </motion.div>
      </div>

      {/* Floating coffee cup animation */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/924/924514.png"
        alt="coffee cup"
        className="absolute bottom-10 right-10 w-16 md:w-24 opacity-90"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </section>
  );
};

export default Home;

