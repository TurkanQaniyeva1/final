import React from "react";
import { motion } from "framer-motion";

const Dashboard: React.FC = () => {
  return (
    <motion.div
      className="bg-white shadow-md rounded-lg p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Xoş Gəlmisiniz</h2>
      <p className="text-gray-600">Bu sizin admin panelinizdir. Buradan məlumatları idarə edə bilərsiniz.</p>
    </motion.div>
  );
};

export default Dashboard;
