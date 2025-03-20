import { Button } from "@/components/ui/button";
import WaitlistForm from "./waitlist-form";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex items-center">
      <div 
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1547444196-2ea3ce201cc6)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)'
        }}
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Your Ideas Into Reality
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Join the waitlist for early access to our revolutionary platform that helps
              bring your creative vision to life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <WaitlistForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
