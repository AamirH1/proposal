"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FaHeart, FaSkull, FaBolt, FaCrown, FaFire } from "react-icons/fa";

const questions = [
  { text: "Do you know how special you are to me? 🖤", type: "normal" },
  { text: "Do you enjoy conquering worlds with me?", type: "normal" },
  { text: "Do I make you smile in the darkness?", type: "normal" },
  { text: "Do you crave our dark memories together?", type: "normal" },
  { text: "Do you feel the power when we're united?", type: "normal" },
  { text: "Can you see us ruling side by side?", type: "normal" },
  { text: "Would you fight beside me forever?", type: "normal" },
  { text: "Do you think our legend deserves eternity?", type: "normal" },
  { text: "Will you be my Queen? 👑", type: "final" },
];

export default function Proposal() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [embers, setEmbers] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [showFinalRing, setShowFinalRing] = useState(false);

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
      // Epic finale
      setShowFinalRing(true);
      confetti({
        spread: 200,
        particleCount: 400,
        colors: [
          "#dc2626",
          "#7f1d1d",
          "#991b1b",
          "#fbbf24",
          "#fb923c",
          "#f97316",
        ],
        startVelocity: 40,
        gravity: 0.8,
        ticks: 300,
        decay: 0.95,
      });
      // More confetti bursts
      setTimeout(() => {
        confetti({
          spread: 100,
          particleCount: 200,
          colors: ["#dc2626", "#fbbf24", "#ffffff"],
          startVelocity: 60,
          angle: 60,
          gravity: 0.6,
        });
      }, 300);
      setTimeout(() => {
        confetti({
          spread: 100,
          particleCount: 200,
          colors: ["#dc2626", "#fbbf24", "#ffffff"],
          startVelocity: 60,
          angle: 120,
          gravity: 0.6,
        });
      }, 500);
      setTimeout(() => {
        setAccepted(true);
      }, 1000);
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

  // ⚔️ INTRO SCREEN - EPIC ANIMATIONS
  if (!started) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
        <VengeanceBackground />

        {/* Animated background flames */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-red-900/20"
        />

        {/* Lightning flashes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            transition: { duration: 0.3, repeat: Infinity, repeatDelay: 5 },
          }}
          className="absolute inset-0 bg-white/10 pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative p-1 bg-gradient-to-r from-red-800 via-red-600 to-red-800"
          style={{ borderRadius: "2rem" }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(220, 38, 38, 0.3)",
                "0 0 60px rgba(220, 38, 38, 0.6)",
                "0 0 20px rgba(220, 38, 38, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-red-800 via-red-600 to-red-800 blur-xl opacity-50"
            style={{ borderRadius: "2rem" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative bg-black/95 backdrop-blur-xl p-16 border-2 border-red-800/50"
            style={{ borderRadius: "1.5rem" }}
          >
            {/* Animated corner bolts */}
            {[
              { pos: "top-4 left-4", rot: 0 },
              { pos: "top-4 right-4", rot: 90 },
              { pos: "bottom-4 left-4", rot: -90 },
              { pos: "bottom-4 right-4", rot: 180 },
            ].map((corner, i) => (
              <motion.div
                key={i}
                className={`absolute ${corner.pos} text-red-600 text-xl`}
                style={{ rotate: corner.rot }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              >
                <FaBolt />
              </motion.div>
            ))}

            <div className="text-center">
              <motion.div
                animate={{
                  rotate: [-3, 3, -3],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-700 mb-6 tracking-wider uppercase"
                >
                  A Dark Tale Begins...
                </motion.h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-red-400/70 mb-8 text-lg font-medium"
              >
                Only the brave may enter our kingdom...
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{
                  scale: 1.08,
                  backgroundColor: "#dc2626",
                  boxShadow: "0 0 50px rgba(220, 38, 38, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStarted(true)}
                className="group relative px-12 py-5 bg-red-900/60 border-2 border-red-600 text-red-100 font-bold uppercase tracking-widest overflow-hidden"
                style={{ borderRadius: "1rem" }}
              >
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <FaBolt />
                  </motion.span>
                  Enter the Darkness
                  <motion.span
                    animate={{ rotate: [0, -15, 15, 0] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <FaBolt />
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-800 via-red-600 to-red-800"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-10 left-10 text-red-600/40"
        >
          <FaFire />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute top-20 right-20 text-red-600/40"
        >
          <FaSkull />
        </motion.div>
      </div>
    );
  }

  // 👑 VICTORY SCREEN
  if (accepted) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
        <VengeanceBackground />

        <motion.div
          initial={{ scale: 0, rotate: -360 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.2, bounce: 0.4 }}
          className="relative text-center z-10"
        >
          {/* Glowing ring effect */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 blur-3xl rounded-full"
            style={{ transform: "translate(-50%, -50%)" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Crown with effects */}
            <motion.div
              animate={{
                rotate: [-5, 5, -5],
                y: [0, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-9xl mb-8 relative z-10 filter drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]"
            >
              👑
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 mb-8 uppercase tracking-tighter"
            style={{ textShadow: "0 0 40px rgba(220, 38, 38, 0.5)" }}
          >
            Our Destiny is Sealed!
          </motion.h1>

          {/* Animated hearts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-6 mb-8"
          >
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                className="text-4xl"
                style={{
                  animation:
                    i % 2 === 0
                      ? "pulse 1s infinite"
                      : "pulse 1s infinite 0.5s",
                }}
              >
                {i === 3 ? (
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    💍
                  </motion.span>
                ) : (
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  >
                    💕
                  </motion.span>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-red-400/90 text-2xl font-bold uppercase tracking-widest"
          >
            Together, We Are Unstoppable 🖤
          </motion.p>

          {/* Fire effects */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 text-orange-500"
          >
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🔥
            </motion.span>
            <motion.span
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 0.7, repeat: Infinity }}
            >
              🔥
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🔥
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ⚔️ MAIN PROPOSAL FLOW - EPIC ANIMATIONS
  const isFinal = step === questions.length - 1;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-red-950 to-black relative overflow-hidden">
      <VengeanceBackground />

      {/* Enhanced background for final question */}
      {isFinal && (
        <>
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-yellow-500/10 to-red-600/20"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-yellow-500/10"
          />
        </>
      )}

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 h-1.5 bg-red-900/50 rounded-full overflow-hidden"
        style={{ width: "60%", maxWidth: "400px" }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-red-700 via-red-500 to-yellow-500"
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Progress dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-2"
      >
        {questions.map((_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === step
                ? isFinal
                  ? "bg-gradient-to-r from-red-500 to-yellow-500"
                  : "bg-red-500"
                : i < step
                  ? "bg-red-700"
                  : "bg-red-900/50"
            }`}
            initial={false}
            animate={{
              scale: i === step ? 1.5 : 1,
              opacity: i <= step ? 1 : 0.5,
            }}
          />
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: -200, rotate: -10, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, x: 200, rotate: 10, scale: 0.8 }}
          transition={{
            type: "spring",
            duration: 0.6,
            bounce: 0.3,
          }}
          className={`relative ${isFinal ? "p-2" : "p-1"} bg-gradient-to-br ${
            isFinal
              ? "from-yellow-600 via-red-700 to-red-900"
              : "from-red-800 via-red-600 to-red-900"
          }`}
          style={{ borderRadius: isFinal ? "2rem" : "1rem" }}
        >
          {/* Pulsing glow for final question */}
          {isFinal && (
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-500 blur-xl opacity-60"
              style={{ borderRadius: "2rem" }}
            />
          )}

          <motion.div
            animate={
              isFinal
                ? {
                    boxShadow: [
                      "0 0 30px rgba(220, 38, 38, 0.4)",
                      "0 0 80px rgba(251, 191, 36, 0.6)",
                      "0 0 30px rgba(220, 38, 38, 0.4)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
            className={`relative bg-black/95 backdrop-blur-xl ${
              isFinal ? "p-12" : "p-10"
            } border border-red-800/50 max-w-lg mx-4`}
            style={{ borderRadius: isFinal ? "1.5rem" : "0.75rem" }}
          >
            {/* Skull decoration */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-red-600">
              {isFinal ? (
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="text-5xl"
                >
                  <FaCrown />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  <FaSkull />
                </motion.div>
              )}
            </div>

            {/* Question text */}
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`${
                isFinal ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
              } font-bold text-center leading-relaxed ${
                isFinal
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-400 to-yellow-400"
                  : "text-red-100"
              }`}
              style={
                isFinal
                  ? { textShadow: "0 0 30px rgba(251, 191, 36, 0.5)" }
                  : {}
              }
            >
              {questions[step].text}
            </motion.p>

            {/* Animated separator for final */}
            {isFinal && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-6"
              />
            )}

            {/* Buttons */}
            <div
              className={`flex gap-6 justify-center items-center mt-${
                isFinal ? "10" : "8"
              }`}
            >
              {/* YES Button - EPIC for final */}
              <motion.button
                whileHover={{
                  scale: 1.15,
                  boxShadow: isFinal
                    ? "0 0 60px rgba(34, 197, 94, 0.9)"
                    : "0 0 40px rgba(34, 197, 94, 0.6)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYes}
                className={`relative px-10 py-5 font-bold uppercase tracking-wider overflow-hidden ${
                  isFinal
                    ? "text-2xl rounded-2xl border-4 border-green-500"
                    : "text-lg rounded-xl"
                }`}
                style={{
                  background: isFinal
                    ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                    : undefined,
                }}
              >
                <span className="relative z-10 flex items-center gap-3 text-white">
                  <motion.span
                    animate={isFinal ? { rotate: [0, 360] } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {isFinal ? "💍" : "💚"}
                  </motion.span>
                  {isFinal ? "I ACCEPT!" : "Yes"}
                  <motion.span
                    animate={isFinal ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {isFinal ? "✨" : ""}
                  </motion.span>
                </span>
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>

              {/* NO Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={moveNo}
                className={`relative ${
                  isFinal ? "px-8 py-4 text-lg" : "px-8 py-4 text-base"
                } bg-gray-900/60 border-2 border-gray-700 text-gray-400 font-bold uppercase tracking-wider hover:text-gray-200 hover:border-gray-500`}
                style={{ borderRadius: "0.75rem" }}
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

            {/* Progress text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`mt-6 text-center ${
                isFinal
                  ? "text-yellow-500/80 text-lg"
                  : "text-red-500/60 text-sm"
              } font-medium uppercase tracking-widest`}
            >
              {isFinal
                ? "This is the moment... 💫"
                : `Question ${step + 1} of ${questions.length}`}
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Hint */}
      {!noPos.x && !noPos.y && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 text-white/30 text-sm"
        >
          The "No" button fears your choice... 😈
        </motion.p>
      )}
    </div>
  );
}
