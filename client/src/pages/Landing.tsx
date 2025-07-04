import { Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      {/* Navigation */}
      <nav className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-full px-8 py-4 flex items-center justify-between border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span className="text-xl font-semibold text-white">BrainBoard</span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
              onClick={(() => { navigate("/login")})}
                variant="ghost" 
                className="text-white hover:bg-white/10 hover:text-white rounded-full border-0"
              >
                Login
              </Button>
              <Button 
                onClick={() => { navigate("/signup")}}
                className="bg-white text-purple-600 hover:bg-white/90 px-6 rounded-full font-semibold"
              >
                Sign Up Free
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            {/* // <-- More emotional and benefit-driven headline. */}
            From Scattered Thoughts, 
            <br />
            To a Clearer Mind.
          </h1>
          
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-16">
            {/* // <-- More evocative sub-headline that introduces the "canvas" metaphor. */}
            BrainBoard is your personal knowledge canvas, designed to turn digital clutter
            into an interconnected library of your best thinking.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button 
            onClick={() => { navigate("/signup")}}
              size="lg" 
              className="bg-black text-white hover:bg-gray-900 text-lg px-8 py-4 rounded-full font-semibold shadow-xl"
            >
              {/* // <-- Stronger, more aspirational CTA. */}
              Start Building Your Second Brain
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full ml-2"></div>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            {[
              // <-- Rewritten to be more active and unique.
              "Capture Everything",
              "Visualize Connections", 
              "Find in a Flash",
              "Always in Sync",
              "Build Lasting Knowledge"
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
                <Circle className="w-2 h-2 fill-white text-white" />
                <span className="text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {/* // <-- A stronger, more confident headline. */}
              More Than a Notebook. It's a Knowledge Engine.
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto mt-4 leading-relaxed">
              {/* // <-- A clearer, more specific value proposition. */}
              BrainBoard is for anyone overwhelmed by information. We help you connect the
              dots between your ideas, links, and notes to fuel real progress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              // <-- Rewritten cards to focus on unique benefits, not just features.
              {
                title: "Frictionless Capture",
                description: "Save anything in seconds—from a fleeting thought to a 20-page article. If you can think it, you can board it."
              },
              {
                title: "Visual Organization", 
                description: "Don't just list your ideas, map them out. Create boards for projects, topics, or anything you can imagine."
              },
              {
                title: "Powerful Linking",
                description: "Connect related notes to uncover insights you'd otherwise miss. Build a personal web of your knowledge."
              },
              {
                title: "Instant Recall",
                description: "With deep search that scans titles, content, and metadata, you can find exactly what you need, when you need it."
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              {/* // <-- A more memorable metaphor for versatility. */}
              Your Swiss Army Knife for Thinking
            </h2>
            <p className="text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
              {/* // <-- More active and benefit-focused description. */}
              From planning your next viral video to acing your final exams, BrainBoard
              adapts to the way you work and think.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              // <-- Slightly punchier descriptions for the use cases.
              {
                icon: "🚀",
                title: "Founders & Devs",
                description: "Track bugs, map out features, and save code snippets. Ship faster by keeping your project's brain in one place."
              },
              {
                icon: "📚", 
                title: "Students & Researchers",
                description: "Compile sources, outline papers, and connect theories. Turn research into understanding, not just a folder of PDFs."
              },
              {
                icon: "🎨",
                title: "Creators & Designers", 
                description: "Curate mood boards, save inspiration, and script content. Your secret weapon for generating endless ideas."
              }
            ].map((useCase, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-6 bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                    {useCase.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {/* // <-- A direct question to the user, focused on their transformation. */}
            Ready to Build a Smarter You?
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
            Stop letting great ideas slip away. Sign up for free and start building
            your organized, intelligent, and permanent second brain today.
          </p>
          <Button 
          onClick={() => { navigate("/signup")}}
            size="lg" 
            className="bg-black text-white hover:bg-gray-900 text-lg px-10 py-4 rounded-full font-semibold shadow-xl"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Copyright Info */}
      <div className="text-white/70 text-sm">
        © {new Date().getFullYear()} BrainBoard. All rights reserved.
      </div>

      {/* Footer Links */}
      <div className="flex items-center gap-6">
        <a
          href="/about" // <-- Change to your about page link
          className="text-sm text-white/70 hover:text-white transition-colors"
        >
          About
        </a>
        <a
          href="https://github.com/your-username/brainboard" // <-- IMPORTANT: Change this link
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/70 hover:text-white transition-colors"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Landing;