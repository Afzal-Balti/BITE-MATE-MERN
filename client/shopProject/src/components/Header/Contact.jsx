import React from "react";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import phoneImg from "../../assets/Images/phone.jpg";
import GoogleMapComponent from "./GoogleMap";
import Button from "../common/ButtonComp";

function Contact() {
  return (
    <div className="w-full bg-white py-12  px-6 md:px-20 lg:px-40">
      <div className="grid md:grid-cols-2 mt-14 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Contact Us About BiteMate FoodReceips
          </h2>
          <p className="text-gray-600 mb-6">
            <span className="font-bold text-xl">
              🍴 BiteMate – Your Ultimate Food Recipe Companion{" "}
            </span>
            <br />
            <div className="mt-4 text-black space-x-2 p-2 text-lg">
              BiteMate is more than just a recipe collection – it’s your
              everyday kitchen partner designed to make cooking simple,
              exciting, and enjoyable. Whether you’re a beginner looking for
              easy-to-follow meals or a food lover eager to explore unique
              dishes, BiteMate has something special for you. With a carefully
              curated variety of recipes, BiteMate helps you discover flavors
              from around the world while also keeping traditional favorites
              close to your heart. From quick snacks to hearty dinners,
              refreshing drinks to mouthwatering desserts, our platform ensures
              that every craving is satisfied. What makes BiteMate different is
              the balance between simplicity and variety. Each recipe comes with
              step-by-step instructions, ingredient details, and helpful tips so
              you can cook with confidence, even if you’ve never set foot in the
              kitchen before. For experienced cooks, BiteMate opens doors to
              creativity with premium and private recipes, allowing you to
              experiment, learn, and even share your own cooking journey.
              BiteMate also encourages healthy choices by offering wholesome
              meal options, dietary filters, and seasonal recipes, so you can
              enjoy food that’s not only tasty but also nourishing. With
              features like favorites, subscriptions, and community-driven
              sharing, BiteMate transforms cooking from a task into a lifestyle
              filled with joy, learning, and connection. ✨ In short: BiteMate
              isn’t just about recipes – it’s about creating moments, sharing
              flavors, and building a community of food lovers who believe that
              every bite should be memorable.
            </div>
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 border rounded-2xl shadow hover:shadow-lg transition">
              <Phone className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-semibold text-gray-800">Call us directly</h3>
              <p className="text-gray-600 text-sm mt-2">+44 20 3514 0663</p>
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline mt-2"
              >
                See more local numbers
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 border rounded-2xl shadow hover:shadow-lg transition">
              <MessageCircle className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-semibold text-gray-800">
                Chat with our sales team
              </h3>
              <button className="bg-orange-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-orange-600 transition">
                Chat with Sales
              </button>
            </div>

            <div className="flex flex-col items-center text-center p-6 border rounded-2xl shadow hover:shadow-lg transition">
              <Calendar className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-semibold text-gray-800">
                Get a product demo
              </h3>
              <button className="bg-orange-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-orange-600 transition">
                Get a demo
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={phoneImg}
            alt="Contact Us"
            className="rounded-2xl w-full h-full object-cover shadow-lg"
          />
        </div>
      </div>
      <div className=" p-6 mt-14 rounded-2xl ">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Send us a Message
        </h3>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="exmaple@gmail.com"
            className="border  border-gray-300 w-1/3 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>


          <Button type="submit" variant="primary" className="w-fit">
            Submit Message
          </Button>
        </form>
      </div>
      <GoogleMapComponent />
    </div>
  );
}

export default Contact;
