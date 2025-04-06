import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesIcon, RocketLaunchIcon, LightBulbIcon, CurrencyDollarIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function StartupIdeaGenerator() {
  const [industry, setIndustry] = useState("");
  const [trend, setTrend] = useState("");
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "AIzaSyAlUprZiUtjDUKsLQcMGjE5KwcQUd5D2DI";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const generateIdea = async () => {
    if (!industry || !trend) return;
    setLoading(true);
    setIdea(null);

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Generate a startup idea and a one-liner pitch based on Industry: ${industry} and Trend: ${trend}. Format the response as: \n## Startup Idea: [Idea Name]\nIndustry: [Industry]\nTrend: [Trend]\nConcept: [Brief concept description]\nKey Features:\n* [Feature 1]\n* [Feature 2]\n* [Feature 3]\nTarget Audience:\n* [Audience 1]\n* [Audience 2]\nRevenue Model:\n* [Revenue Model 1]\n* [Revenue Model 2]\nOne-Liner Pitch:\n[Short Pitch]`,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No idea generated.";
      setIdea(generatedText);
    } catch (error) {
      console.error("Error generating idea:", error);
      setIdea("Error generating idea. Try again.");
    }

    setLoading(false);
  };

  const formatIdeaOutput = (text) => {
    if (!text) return null;

    const sections = text.split('\n');
    const formattedSections = sections.map((section, index) => {
      if (section.startsWith('## ')) {
        return (
          <motion.h2 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-amber-400 mb-6"
          >
            {section.replace('## ', '')}
          </motion.h2>
        );
      } else if (section.match(/^[A-Za-z\s]+:/)) {
        const [title, content] = section.split(': ');
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4"
          >
            <h3 className="text-lg font-semibold text-yellow-400">
              {title}
            </h3>
            <p className="text-amber-100/90 mt-1">{content}</p>
          </motion.div>
        );
      } else if (section.startsWith('* ')) {
        return (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-amber-100/80 ml-4 mb-2 flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
            {section.replace('* ', '')}
          </motion.li>
        );
      }
      return (
        <motion.p 
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="text-amber-100/80"
        >
          {section}
        </motion.p>
      );
    });

    return formattedSections;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-amber-950 to-gray-900 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto pt-12"
      >
        <div className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-amber-500/20">
          <motion.div 
            className="flex items-center justify-center gap-3 mb-12"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <SparklesIcon className="w-10 h-10 text-yellow-400" />
            </motion.div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
              Startup Idea Generator
            </h1>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <SparklesIcon className="w-10 h-10 text-yellow-400" />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-amber-200 text-sm font-medium mb-2">Industry</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-black/30 border border-amber-500/20 rounded-xl text-amber-100 placeholder-amber-300/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition group-hover:border-amber-500/30"
                placeholder="e.g., Food, Technology, Healthcare"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-amber-200 text-sm font-medium mb-2">Trend</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-black/30 border border-amber-500/20 rounded-xl text-amber-100 placeholder-amber-300/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition group-hover:border-amber-500/30"
                placeholder="e.g., AI, Sustainability, Remote Work"
                value={trend}
                onChange={(e) => setTrend(e.target.value)}
              />
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-xl text-gray-900 font-semibold flex items-center justify-center gap-2 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 transition shadow-lg shadow-amber-500/20"
            onClick={generateIdea}
            disabled={loading}
          >
            <RocketLaunchIcon className="w-6 h-6" />
            {loading ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Generating your next big idea...
              </motion.span>
            ) : (
              "Generate Startup Idea"
            )}
          </motion.button>

          <AnimatePresence>
            {idea && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 p-8 bg-black/30 border border-amber-500/20 rounded-2xl space-y-6"
              >
                <div className="prose prose-invert max-w-none">
                  {formatIdeaOutput(idea)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}