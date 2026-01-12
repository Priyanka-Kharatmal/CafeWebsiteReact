const About = () => (
  <section className="bg-amber-50 py-20">
    {/* About Intro */}
    <div className="max-w-4xl mx-auto text-center px-6">
      <h2 className="text-4xl font-bold text-amber-900 mb-6">About Us</h2>

      <p className="text-lg text-gray-700 leading-relaxed mb-10">
        What began as a simple passion for coffee has grown into a much-loved
        café journey — starting from humble beginnings, evolving into an
        award-winning local favourite, and built on quality, community, and a
        genuine love for bringing people together over great coffee.
      </p>
    </div>

    {/* Mission */}
    <div className="max-w-4xl mx-auto text-center px-6 mt-24">
      <h3 className="text-3xl font-bold text-amber-900 mb-6">Our Mission</h3>
      <p className="text-lg text-gray-700 leading-relaxed">
        Our mission is simple — to serve high-quality coffee and food in a warm,
        welcoming space where everyone feels at home. Whether it’s your morning
        cappuccino or an evening catch-up, Raj’s Café is a place to relax,
        connect, and enjoy the moment.
      </p>
    </div>

    {/* Opening Hours */}
    <div className="flex justify-center mt-24 px-6">
      <div className="bg-amber-900 text-white py-12 px-16 rounded-lg text-center max-w-3xl w-full shadow-lg">
        <h3 className="text-2xl font-semibold mb-6">Opening Hours</h3>
        <p className="text-lg mb-2">Mon–Fri: 8:00 AM – 9:00 PM</p>
        <p className="text-lg">Sat–Sun: 9:00 AM – 11:00 PM</p>
      </div>
    </div>
  </section>
);

export default About;
