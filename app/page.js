"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FaHeart, FaSkull, FaBolt, FaCrown } from "react-icons/fa";

const questions = [
  "Do you know how special you are to me? 🖤",
  "Do you enjoy conquering worlds with me?",
  "Do I make you smile in the darkness?",
  "Do you crave our dark memories together?",
  "Do you feel the power when we're united?",
  "Can you see us ruling side by side?",
  "Would you fight beside me forever?",
  "Do you think our legend deserves eternity?",
  "Will you be my king/queen of the night? 👑",
];

export default function Proposal() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [embers, setEmbers] = useState([]);
  const [mounted, setMounted] = useState(false);

  // Generate all random values only on client
  useEffect(() => {
    setMounted(true);
    setParticles(
      [...Array(25)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 5,
      })),
    );
    setEmbers(
      [...Array(30)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 3,
      })),
    );
  }, []);

  // Music
  useEffect(() => {
    if (mounted && started) {
      const audio = new Audio(
        "https://www.bensound.com/bensound-music/bensound-epic.mp3",
      );
      audio.loop = true;
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }
  }, [mounted, started]);

  const moveNo = () => {
    setNoPos({
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
    });
  };

  const handleYes = () => {
    if (step === questions.length - 1) {
      confetti({
        spread: 200,
        particleCount: 300,
        colors: ["#dc2626", "#7f1d1d", "#991b1b", "#450a0a", "#ff0000"],
      });
      setAccepted(true);
    } else {
      setStep(step + 1);
    }
  };

  // 💀 Vengeance Background
  const VengeanceBackground = () => {
    if (!mounted) return null;

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating skulls and hearts */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute text-red-600"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${particle.size}px`,
            }}
            initial={{ opacity: 0, scale: 0, y: "110vh" }}
            animate={{
              opacity: [0, 1, 0.5, 1, 0],
              scale: [0, 1.5, 1, 1.5, 0],
              y: ["110vh", "-20vh"],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {i % 3 === 0 ? <FaSkull /> : <FaHeart />}
          </motion.div>
        ))}

        {/* Ember particles */}
        {embers.map((ember, i) => (
          <motion.div
            key={`ember-${i}`}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            style={{ left: `${ember.x}%` }}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{
              y: "-10vh",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: ember.duration,
              delay: ember.delay,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    );
  };

  // ⚔️ Intro Screen
  if (!started) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
        <VengeanceBackground />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-1 bg-gradient-to-r from-red-800 via-red-600 to-red-800"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-800 via-red-600 to-red-800 blur-lg opacity-50" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative bg-black/90 backdrop-blur-md p-16 border-2 border-red-800/50"
          >
            {/* Corner bolts */}
            <div className="absolute top-4 left-4 text-red-600 text-xl">
              <FaBolt />
            </div>
            <div className="absolute top-4 right-4 text-red-600 text-xl rotate-90">
              <FaBolt />
            </div>
            <div className="absolute bottom-4 left-4 text-red-600 text-xl -rotate-90">
              <FaBolt />
            </div>
            <div className="absolute bottom-4 right-4 text-red-600 text-xl rotate-180">
              <FaBolt />
            </div>

            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-center"
            >
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-700 mb-6 tracking-wider uppercase">
                A Dark Tale Begins...
              </h1>
              <p className="text-red-400/70 mb-8 text-lg font-medium">
                Only the brave may enter our kingdom...
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#dc2626",
                  boxShadow: "0 0 40px rgba(220, 38, 38, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStarted(true)}
                className="group relative px-10 py-4 bg-red-900/50 border border-red-600 text-red-100 font-bold uppercase tracking-widest overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaBolt className="group-hover:rotate-45 transition-transform" />
                  Enter the Darkness
                  <FaBolt className="group-hover:-rotate-45 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // 👑 Victory Screen
  if (accepted) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
        <VengeanceBackground />

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1 }}
          className="relative text-center z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-900 blur-3xl opacity-30 rounded-full"
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-700 mb-8 uppercase tracking-tighter">
              Our Destiny is Sealed!
            </h1>

            <div className="flex justify-center gap-8 mb-8">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-6xl filter drop-shadow-lg"
                >
                  {i === 2 ? (
                    <motion.span
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      👑
                    </motion.span>
                  ) : (
                    <FaHeart className="text-red-600" />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-red-400/80 text-xl font-medium uppercase tracking-widest"
            >
              Together, We Are Unstoppable 🖤
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ⚔️ Main Proposal Flow
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
      <VengeanceBackground />

      {/* Progress bar */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 h-1 bg-red-900/50 rounded-full overflow-hidden"
        style={{ width: "60%", maxWidth: "400px" }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-red-700 to-red-500"
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: -100, rotate: -5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          exit={{ opacity: 0, x: 100, rotate: 5 }}
          className="relative p-1 bg-gradient-to-br from-red-800 via-red-600 to-red-900"
        >
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-red-800 via-red-600 to-red-900 blur-xl"
          />

          <div className="relative bg-black/95 backdrop-blur-xl p-12 border border-red-800/50 max-w-lg mx-4">
            {/* Skull decoration */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-600 text-4xl">
              <FaSkull />
            </div>

            <motion.p
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-red-100 mb-10 text-center leading-relaxed"
            >
              {questions[step]}
            </motion.p>

            <div className="flex gap-6 justify-center items-center">
              {/* YES Button */}
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#dc2626",
                  boxShadow: "0 0 30px rgba(220, 38, 38, 0.5)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYes}
                className="group relative px-8 py-4 bg-red-900/40 border-2 border-red-600 text-red-100 font-bold uppercase tracking-wider overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaHeart className="group-hover:text-red-400 transition-colors" />
                  Yes
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* NO Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={moveNo}
                className="relative px-8 py-4 bg-gray-900/50 border-2 border-gray-700 text-gray-400 font-bold uppercase tracking-wider hover:text-gray-300 hover:border-gray-500"
                animate={{
                  x: noPos.x,
                  y: noPos.y,
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="flex items-center gap-2">
                  <FaSkull />
                  No
                </span>
              </motion.button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center text-red-500/60 text-sm font-medium uppercase tracking-widest"
            >
              Question {step + 1} of {questions.length}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
