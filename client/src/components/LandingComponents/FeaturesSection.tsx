"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-[#3b73ed] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div
        
          className="text-center mb-16"
        >
          <h2 
        
            className="text-4xl md:text-5xl pt-6 font-bold leading-snug font-satoshi text-white"
          >
            More Than a Notebook. It's a Knowledge Engine.
            <br />
            
          </h2>
          <p 
            
            className="text-white/90 font-medium mt-4 font-inter max-w-xl mx-auto py-6"
          >
            BrainBoard is for anyone overwhelmed by information. We help you connect the dots between your ideas, links, and notes to fuel real progress.
          </p>
        </div>

        <div
          
          className="grid md:grid-cols-4 gap-6 py-6"
        >
          {/** Feature Cards */}
          {[
            {
              title: "Frictionless Capture",
              desc: "Save anything in seconds—from a fleeting thought to a 20-page article. If you can think it, you can board it.",
            },
            {
              title: "Visual Organization",
              desc: "Don't just list your ideas, map them out. Create boards for projects, topics, or anything you can imagine.",
            },
            {
              title: "Powerful Linking",
              desc: "Connect related notes to uncover insights you'd otherwise miss. Build a personal web of your knowledge.",
            },
            {
              title: "Instant Recall",
              desc: "With deep search that scans titles, content, and metadata, you can find exactly what you need, when you need it.",
            },
          ].map((feature, index) => (
            <div
              key={index}
             
         
              className="h-full"
            >
              <Card className="bg-white text-black p-6 rounded-3xl shadow-xl border border-black h-full transition-all">
                <CardContent className="p-0 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-bold mb-3 font-satoshi text-black">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-sm font-inter">
                      {feature.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;