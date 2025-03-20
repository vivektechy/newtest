import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Target, Zap } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Innovative Solutions",
    description: "Cutting-edge tools and features to bring your ideas to life",
    image: "https://images.unsplash.com/photo-1559752562-1513aa167782"
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Precision Control",
    description: "Fine-tune every aspect of your project with precise controls",
    image: "https://images.unsplash.com/photo-1653389526309-f8e2e75f8aaf"
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Fast",
    description: "Optimized performance for a seamless creative experience"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're building the next generation of creative tools to help you achieve more.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="mb-4 text-primary">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  {feature.image && (
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="mt-4 rounded-lg w-full h-48 object-cover"
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
