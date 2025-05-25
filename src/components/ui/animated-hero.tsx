import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MoveRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["DREAM JOB", "NEXT CHANCE", "PERFECT ROLE", "CAREER BOOST", "FUTURE"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const handleSearchClick = () => {
    document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAPIClick = () => {
    window.location.href = '/api-docs';
  };

  return (
    <div className="w-full neo-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-30 mix-blend-multiply"></div>
      <div className="container mx-auto relative z-10">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <div className="bg-white border-4 border-black px-6 py-3 shadow-[8px_8px_0px_black]">
              <span className="font-black uppercase tracking-wider text-black">
                🚀 POWERED BY LINKEDIN SCRAPING
              </span>
            </div>
          </div>
          
          {/* Logo Section */}
          <motion.div 
            className="flex items-center justify-center space-x-4 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_black]">
              <Image
                src="/openhire.png"
                alt="OpenHire Logo"
                width={80}
                height={80}
                className="border-2 border-black shadow-[2px_2px_0px_black]"
              />
            </div>
            <div className="bg-secondary border-4 border-black px-6 py-4 shadow-[8px_8px_0px_black]">
              <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-wider">
                OPENHIRE
              </h2>
            </div>
          </motion.div>

          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-8xl max-w-5xl tracking-tighter text-center font-black uppercase">
              <span className="text-black neo-text-shadow bg-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_black] inline-block mb-4">
                FIND YOUR
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-8">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-black text-black bg-primary px-4 py-2 border-4 border-black shadow-[8px_8px_0px_black]"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <div className="bg-white border-4 border-black p-6 shadow-[12px_12px_0px_black] max-w-4xl mx-auto">
              <p className="text-lg md:text-xl font-bold text-black text-center uppercase tracking-wide">
                OPENHIRE MAKES JOB SEARCHING EFFORTLESS! SEARCH THOUSANDS OF JOB OPENINGS FROM LINKEDIN WITH OUR POWERFUL SCRAPING TECHNOLOGY. GET RESULTS INSTANTLY!
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            <Button size="lg" className="gap-4" variant="outline" onClick={handleAPIClick}>
              <span className="font-black">EXPLORE API</span> <MoveRight className="w-6 h-6" />
            </Button>
            <Button size="lg" className="gap-4" onClick={handleSearchClick}>
              <span className="font-black">START SEARCHING</span> <Search className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero }; 