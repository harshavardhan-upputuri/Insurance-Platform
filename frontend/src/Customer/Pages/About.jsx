import React from "react";
import { assets } from "../../../Assets/assets";

const About = () => {
  return (
    <div className="flex flex-col w-full px-5 lg:px-20 py-10 space-y-16">
      
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            About Our Insurance Company
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            We provide comprehensive insurance solutions to protect what matters most to you.
            From health and life to property and vehicle insurance, our mission is to deliver
            reliable coverage with exceptional service and peace of mind.
          </p>
        </div>
        <div className="flex-1">
          <img
            src={assets.insuranceHero} // replace with a hero image from your assets
            alt="Insurance"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="grid lg:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To provide trustworthy insurance solutions that secure the future of our clients.
          </p>
        </div>
        <div className="p-6 bg-green-50 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-600">
            To be the leading insurance provider, recognized for innovation, integrity, and service.
          </p>
        </div>
        <div className="p-6 bg-yellow-50 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Our Values</h2>
          <p className="text-gray-600">
            Customer-first, transparency, reliability, and continuous improvement.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Customized insurance plans tailored to your needs</li>
            <li>Fast and hassle-free claim process</li>
            <li>Expert customer support and advice</li>
            <li>Trusted by thousands of satisfied clients</li>
          </ul>
        </div>
        <div className="flex-1">
          <img
            src={assets.whyChooseUs} // replace with relevant image
            alt="Why Choose Us"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 rounded-lg text-white p-10 text-center flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold">Ready to Secure Your Future?</h2>
        <p className="text-lg">Get a personalized insurance plan today!</p>
        <button
          onClick={() => window.location.href = "/products"}
          className="mt-4 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Explore Plans
        </button>
      </section>

    </div>
  );
};

export default About;
