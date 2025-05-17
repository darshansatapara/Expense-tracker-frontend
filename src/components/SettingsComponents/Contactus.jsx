// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Send, Mail, Phone, MapPin } from "lucide-react";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log("Form submitted:", formData);
//     // Reset form after submission
//     setFormData({ name: "", email: "", message: "" });
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//       },
//     },
//   };

//   return (
//     <div
//       className="min-h-screen w-full py-12 px-4 sm:px-8 md:px-12 lg:px-16 font-nunito"
//       style={{
//         background: "linear-gradient(135deg, #f0f4ff, #e0e8ff, #d0d8ff)",
//       }}
//     >
//       {/* Header Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
//           Get In Touch
//         </h1>
//         <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//           We're here to help with any questions about Expense Tracker. Reach out
//           and we'll respond as soon as we can.
//         </p>
//       </motion.div>

//       {/* Main Content Container */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
//         {/* Left Side - Contact Info Card */}
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="w-full lg:w-2/5 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
//         >
//           {/* Top Image Section */}
//           <div className="h-48 sm:h-64 overflow-hidden relative">
//             <div className="absolute inset-0 bg-indigo-900 opacity-80"></div>
//             <img
//               src="/api/placeholder/800/500"
//               alt="Contact Us"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 flex items-center justify-center p-6">
//               <h2 className="text-white text-3xl font-bold text-center">
//                 Contact Information
//               </h2>
//             </div>
//           </div>

//           {/* Contact Details */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="p-6 space-y-6 flex-grow"
//           >
//             <p className="text-gray-600 mb-6">
//               We value your feedback and are dedicated to providing excellent
//               support for all your Expense Tracker needs.
//             </p>

//             <motion.div
//               variants={itemVariants}
//               className="flex items-center gap-4"
//             >
//               <div className="bg-indigo-100 p-3 rounded-full">
//                 <Mail className="w-6 h-6 text-indigo-700" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-800">Email</h3>
//                 <a
//                   href="mailto:expensetracker1908@gmail.com"
//                   className="text-indigo-600 hover:text-indigo-800 transition-colors"
//                 >
//                   expensetracker1908@gmail.com
//                 </a>
//               </div>
//             </motion.div>

//             <motion.div
//               variants={itemVariants}
//               className="flex items-center gap-4"
//             >
//               <div className="bg-indigo-100 p-3 rounded-full">
//                 <Phone className="w-6 h-6 text-indigo-700" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-800">Phone</h3>
//                 <div className="space-y-1">
//                   <p className="text-gray-600">+91 9429468900</p>
//                   <p className="text-gray-600">+91 72038 35504</p>
//                   <p className="text-gray-600">+91 90230 33981</p>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               variants={itemVariants}
//               className="flex items-center gap-4"
//             >
//               <div className="bg-indigo-100 p-3 rounded-full">
//                 <MapPin className="w-6 h-6 text-indigo-700" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-800">Location</h3>
//                 <p className="text-gray-600">Ahmedabad, Gujarat</p>
//               </div>
//             </motion.div>
//           </motion.div>
//         </motion.div>

//         {/* Right Side - Contact Form */}
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="w-full lg:w-3/5 bg-white rounded-2xl shadow-xl p-8"
//         >
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             Send Us a Message
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div className="form-group">
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50"
//                   placeholder="John Doe"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50"
//                   placeholder="your@email.com"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label
//                 htmlFor="message"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Your Message
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows="6"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50"
//                 placeholder="How can we help you?"
//                 required
//               ></textarea>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
//             >
//               <Send className="w-5 h-5" />
//               <span>Send Message</span>
//             </motion.button>
//           </form>

//           {/* FAQ teaser */}
//           <div className="mt-12 pt-8 border-t border-gray-200">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">
//               Frequently Asked Questions
//             </h3>
//             <div className="space-y-4">
//               {[
//                 {
//                   question: "How quickly will I receive a response?",
//                   answer:
//                     "We typically respond to all inquiries within 24-48 hours during business days.",
//                 },
//                 {
//                   question: "Is there a phone support option?",
//                   answer:
//                     "Yes, our phone support is available. You can contact us on any of the phone numbers listed.",
//                 },
//               ].map((faq, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.8 + index * 0.2 }}
//                   className="bg-gray-50 p-4 rounded-lg hover:bg-indigo-50 transition-colors"
//                 >
//                   <h4 className="font-semibold text-gray-800 mb-1">
//                     {faq.question}
//                   </h4>
//                   <p className="text-gray-600 text-sm">{faq.answer}</p>
//                 </motion.div>
//               ))}
//             </div>
//             <motion.div whileHover={{ scale: 1.01 }} className="mt-4">
//               <a
//                 href="#faq"
//                 className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
//               >
//                 View all FAQs
//                 <svg
//                   className="ml-2 w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9 5l7 7-7 7"
//                   ></path>
//                 </svg>
//               </a>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Map Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.6 }}
//         className="max-w-7xl mx-auto mt-16 bg-white rounded-2xl shadow-xl overflow-hidden"
//       >
//         <div className="h-64 sm:h-80 lg:h-96 w-full bg-gray-300 relative">
//           {/* Placeholder for map */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <img
//               src="/api/placeholder/1200/600"
//               alt="Location Map - Ahmedabad, Gujarat"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-indigo-900 opacity-20"></div>
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg">
//               <MapPin className="w-6 h-6 text-indigo-700" />
//             </div>
//             <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg">
//               <p className="font-semibold text-gray-800">Ahmedabad, Gujarat</p>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Newsletter Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.8 }}
//         className="max-w-3xl mx-auto mt-16 text-center"
//       >
//         <h2 className="text-2xl font-bold text-gray-800 mb-3">Stay Updated</h2>
//         <p className="text-gray-600 mb-6">
//           Subscribe to our newsletter for the latest updates and features.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-3 justify-center">
//           <input
//             type="email"
//             placeholder="Your email address"
//             className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-96"
//           />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap"
//           >
//             Subscribe
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Footer */}
//       <div className="mt-20 text-center text-gray-500 text-sm">
//         <p>
//           © {new Date().getFullYear()} Expense Tracker. All rights reserved.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div
      className="min-h-screen w-full py-12 px-4 sm:px-8 md:px-12 lg:px-16 font-nunito"
      style={{
        background: "linear-gradient(135deg, #f0f4ff, #e0e8ff, #d0d8ff)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
          Get In Touch
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          We're here to help with any questions about Expense Tracker. Reach out
          and we'll respond as soon as we can.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-2/5 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
        >
          <div className="h-48 sm:h-64 overflow-hidden relative">
            <div className="absolute inset-0 bg-indigo-900 opacity-80"></div>
            {/* <img
              src="/api/placeholder/800/500"
              alt="Contact Us"
              className="w-full h-full object-cover"
            /> */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <h2 className="text-white text-3xl font-bold text-center">
                Contact Information
              </h2>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 space-y-6 flex-grow"
          >
            <p className="text-gray-600 mb-6">
              We value your feedback and are dedicated to providing excellent
              support for all your Expense Tracker needs.
            </p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <div className="bg-indigo-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-indigo-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <a
                  href="mailto:expensetracker1908@gmail.com"
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  expensetracker1908@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <div className="bg-indigo-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-indigo-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Phone</h3>

                <p className="text-gray-600">+91 9429468900</p>
                <p className="text-gray-600">+91 72038 35504</p>
                <p className="text-gray-600">+91 90230 33981</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <div className="bg-indigo-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-indigo-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Location</h3>
                <p className="text-gray-600">Ahmedabad, Gujarat</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-3/5 bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="form-group">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </motion.button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                {
                  question: "How quickly will I receive a response?",
                  answer:
                    "We typically respond to all inquiries within 24-48 hours during business days.",
                },
                {
                  question: "Is there a phone support option?",
                  answer:
                    "Yes, our phone support is available. You can contact us on any of the phone numbers listed.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  className="bg-gray-50 p-4 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
            {/* <motion.div whileHover={{ scale: 1.01 }} className="mt-4">
              <a
                href="#faq"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
              >
                View all FAQs
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </a>
            </motion.div> */}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-7xl mx-auto mt-16 bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="h-64 sm:h-80 lg:h-96 w-full relative">
          <a
            href="https://www.google.com/maps/place/Ahmedabad,+Gujarat,+India"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235526.91336655504!2d72.41493209999999!3d23.022505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Ahmedabad Location Map"
            ></iframe>
            <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg">
              <p className="font-semibold text-gray-800">Ahmedabad, Gujarat</p>
            </div>
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-3xl mx-auto mt-16 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Stay Updated</h2>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter for the latest updates and features.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Your email address"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-96"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Subscribe
          </motion.button>
        </div>
      </motion.div>

      <div className="mt-20 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
