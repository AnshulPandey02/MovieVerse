import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Logo.png";
import { FaArrowRight, FaLanguage, FaUserLock, FaFilm } from "react-icons/fa";
import { MovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

export default function Intro({ onFinish }) {
  const [showLogo, setShowLogo] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState("en");
  const [showSteps, setShowSteps] = useState(false);
  const {lang, setLang} = useContext(MovieContext);
  const savedLang = localStorage.getItem("localUserLanguage");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
      if (savedLang) {
        finishIntro();
      } else {
        setShowSteps(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  // ✅ Supported languages
  const languages = [
  { code: "ta", name: "Tamil" },
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "te", name: "Telugu" },
  { code: "ml", name: "Malayalam" },
  { code: "kn", name: "Kannada" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "it", name: "Italian" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
];

  // ✅ Finish function
  const finishIntro = () => {
    sessionStorage.setItem("introShown", "true");
    if(!savedLang) localStorage.setItem("localUserLanguage", selectedLang);
    onFinish();
  };

  const nextStep = () => setStep((p) => p + 1);
  const prevStep = () => setStep((p) => p - 1);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] text-white flex items-center justify-center z-50 overflow-hidden">
      <AnimatePresence mode="wait">
        {/* 🌟 Step 0: Logo Animation */}
        {showLogo && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
            <img
              src={logo}
              alt="MovieVerse Logo"
              style={{ filter: "hue-rotate(195deg)" }}
              className="w-20 sm:w-28 md:w-36 lg:w-40 animate-zoomInOut"
            />
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mt-4 typewriter">
              MovieVerse
            </h1>
          </motion.div>
        )}

        {/* 🌙 Step 1–3: After Animation */}
        {showSteps && (
          <motion.div
            key="steps"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg text-center p-6"
          >
            <AnimatePresence mode="wait">
              {/* 🧭 STEP 1 - Welcome */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <FaFilm className="text-5xl text-[#00A8E1] mx-auto animate-pulse" />
                  <h1 className="text-3xl font-bold">
                    Welcome to <span className="text-[#00A8E1]">MovieVerse</span>
                  </h1>
                  <p className="text-gray-400 leading-relaxed">
                    Explore trending movies, search across languages, and save
                    your favorites — powered by{" "}
                    <span className="text-[#00A8E1] font-semibold">
                      TMDB API
                    </span>
                    .
                  </p>

                  <button
                    onClick={nextStep}
                    className="mt-6 bg-gradient-to-r from-[#005C7E] to-[#00A8E1] 
                      hover:from-[#00739D] hover:to-[#00C2FF]
                      px-6 py-3 rounded-xl font-semibold text-white
                      flex items-center justify-center gap-2 mx-auto shadow-[0_0_15px_#00A8E1] transition"
                  >
                    Continue <FaArrowRight />
                  </button>
                </motion.div>
              )}

              {/* 🌐 STEP 2 - Language Selection */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <FaLanguage className="text-5xl text-[#00A8E1] mx-auto" />
                  <h2 className="text-2xl font-bold">Choose Your Language</h2>
                  <p className="text-gray-400">
                    TMDB supports{" "}
                    <span className="text-[#00A8E1]">60+ languages</span>.
                    Choose your preferred one.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang.code);
                          setLang(lang.code);
                        }}
                        className={`py-2 rounded-lg font-medium transition
                          ${
                            selectedLang === lang.code
                              ? "bg-gradient-to-r from-[#005C7E] to-[#00A8E1] text-white shadow-[0_0_10px_#00A8E1]"
                              : "bg-[#1b1b1b] text-gray-300 hover:bg-[#222]"
                          }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <button
                      onClick={prevStep}
                      className="px-5 py-2 rounded-lg bg-[#1c1c1c] text-gray-300 hover:bg-[#2b2b2b] transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#005C7E] to-[#00A8E1] hover:from-[#00739D] hover:to-[#00C2FF] shadow-[0_0_10px_#00A8E1] font-semibold"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {/* 🔐 STEP 3 - Login / Continue */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <FaUserLock className="text-5xl text-[#00A8E1] mx-auto" />
                  <h2 className="text-2xl font-bold">Get Started</h2>
                  <p className="text-gray-400">
                    Login to save your{" "}
                    <span className="text-[#00A8E1] font-medium">
                      watchlist & favourite movies
                    </span>
                    , or continue as guest.
                  </p>

                  <div className="flex flex-col gap-3 mt-5">
                    <button
                      onClick={() => {
                        finishIntro();
                        navigate("/login");
                      }}
                      className="py-3 rounded-lg bg-gradient-to-r from-[#005C7E] to-[#00A8E1] hover:from-[#00739D] hover:to-[#00C2FF] text-white font-semibold shadow-[0_0_10px_#00A8E1] transition"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        finishIntro();
                        navigate("/signup")
                      }}
                      className="py-3 rounded-lg bg-[#1b1b1b] text-gray-300 hover:bg-[#2b2b2b] transition"
                    >
                      Sign Up
                    </button>
                    <button
                      onClick={finishIntro}
                      className="py-3 rounded-lg border border-gray-600 hover:border-[#00A8E1] text-gray-400 hover:text-white transition"
                    >
                      Continue Without Login
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
