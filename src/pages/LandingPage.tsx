"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Apple } from 'lucide-react';
import { useSession } from '@/integrations/supabase/SessionContextProvider';
import MeetingWindowMockup from '@/components/MeetingWindowMockup';
import FloatingMouseCursor from '@/components/FloatingMouseCursor';
import MeetingSettingsCard from '@/components/MeetingSettingsCard';
import RealtimeAnswersCard from '@/components/RealtimeAnswersCard';
import MeetingParticipantsCard from '@/components/MeetingParticipantsCard'; // New import
import InvisibleToScreenShareCard from '@/components/InvisibleToScreenShareCard'; // New import
import NeverInYourWayCard from '@/components/NeverInYourWayCard'; // New import
import MeetingPlatformLogos from '@/components/MeetingPlatformLogos'; // New import
import { useTypewriter } from '@/hooks/use-typewriter';
import { cn } from '@/lib/utils';

const initialAiResponse = "So just to recap—you need new cabinets and lighting. I'll send you a quote within the hour. Let's do a kickoff call next Wednesday if that works for you?";
const nextSuggestionResponse = "Based on their interest in new cabinets, you could suggest a premium wood finish or smart storage solutions to upsell.";
const followUpQuestionsResponse = "Here are some follow-up questions: 1. What's your budget for the new lighting? 2. Are there any specific cabinet styles you prefer? 3. What's your ideal timeline for project completion?";

const cyclingWords = ["Interviews.", "Sales calls.", "Homework.", "Meetings.", "Really everything."];

const LandingPage = () => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  const [currentAiResponse, setCurrentAiResponse] = useState(initialAiResponse);
  const [typewriterKey, setTypewriterKey] = useState(0); // Key to reset typewriter animation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [buttonPositions, setButtonPositions] = useState<{
    whatToSayNext: DOMRect | null;
    followUpQuestions: DOMRect | null;
  }>({ whatToSayNext: null, followUpQuestions: null });

  // State for cycling words color effect
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWordIndex((prevIndex) => (prevIndex + 1) % cyclingWords.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading && session) {
      navigate('/chat'); // Redirect to chat if authenticated
    }
  }, [session, isLoading, navigate]);

  const handleButtonPositionsReady = useCallback((positions: { whatToSayNext: DOMRect | null; followUpQuestions: DOMRect | null }) => {
    setButtonPositions(positions);
  }, []);

  useEffect(() => {
    if (!buttonPositions.whatToSayNext || !buttonPositions.followUpQuestions) {
      return; // Wait for button positions to be available
    }

    let animationTimeout: NodeJS.Timeout;

    const animateSequence = async () => {
      // Start with initial AI response
      setCurrentAiResponse(initialAiResponse);
      setTypewriterKey(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 7000)); // Wait for initial text to type and be visible

      // 1. Move to "What do I say next?" button
      const nextButton = buttonPositions.whatToSayNext!;
      setMousePosition({
        x: nextButton.left + nextButton.width / 2,
        y: nextButton.top + nextButton.height / 2,
      });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Move duration

      // 2. Click "What do I say next?"
      setIsClicking(true);
      setCurrentAiResponse(nextSuggestionResponse);
      setTypewriterKey(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 300)); // Click duration
      setIsClicking(false);
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for new text to type and be visible

      // 3. Move to "Follow-up questions" button
      const followUpButton = buttonPositions.followUpQuestions!;
      setMousePosition({
        x: followUpButton.left + followUpButton.width / 2,
        y: followUpButton.top + followUpButton.height / 2,
      });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Move duration

      // 4. Click "Follow-up questions"
      setIsClicking(true);
      setCurrentAiResponse(followUpQuestionsResponse);
      setTypewriterKey(prev => prev + 1);
      await new Promise(resolve => setTimeout(resolve, 300)); // Click duration
      setIsClicking(false);
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for new text to type and be visible

      // Loop the animation
      animationTimeout = setTimeout(animateSequence, 2000); // Short delay before restarting
    };

    animationTimeout = setTimeout(animateSequence, 1000); // Initial delay before starting sequence

    return () => clearTimeout(animationTimeout);
  }, [buttonPositions]); // Re-run effect if button positions change

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-landing-background-start to-landing-background-end">
        <p className="text-xl text-landing-text-primary">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-landing-background-start to-landing-background-end text-landing-text-primary overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000 z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000 z-0"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-green-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-6000 z-0"></div>

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-xl text-landing-logo-text">Teacheat</div>
        </div>
        <nav className="flex space-x-6 text-sm font-medium text-landing-text-primary/80">
          <Link to="#" className="hover:text-landing-text-primary">Pricing</Link>
          <Link to="#" className="hover:text-landing-text-primary">Enterprise</Link>
          <Link to="#" className="hover:text-landing-text-primary">Careers</Link>
          <Link to="#" className="hover:text-landing-text-primary">Blog</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-4 py-16 max-w-4xl z-10 mt-12">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-landing-text-primary">
          #1 AI assistant <br /> for meetings
        </h1>
        <p className="text-lg md:text-xl text-landing-text-primary/80 mb-10 max-w-2xl">
          Takes perfect notes, answers questions in real-time, and <br /> makes you the most prepared person on every call.
        </p>
        <div className="flex space-x-4">
          <Button className="bg-gradient-to-br from-landing-button-gradient-start to-landing-button-gradient-end text-white hover:from-landing-button-gradient-start/90 hover:to-landing-button-gradient-end/90 rounded-lg px-8 py-3 text-base font-semibold shadow-md">
            <Apple className="h-5 w-5 mr-2" /> Get for Mac
          </Button>
          <Button
            className="bg-gradient-to-br from-landing-button-gradient-start to-landing-button-gradient-end text-white hover:from-landing-button-gradient-start/90 hover:to-landing-button-gradient-end/90 rounded-lg px-8 py-3 text-base font-semibold shadow-md"
            onClick={handleGetStartedClick}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Meeting Window Mockup */}
      <div className="mt-16 mb-24 z-10">
        <MeetingWindowMockup
          currentAiResponse={currentAiResponse}
          typewriterKey={typewriterKey}
          onButtonPositionsReady={handleButtonPositionsReady}
        />
      </div>

      {/* Features Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div>
            <h2 className="text-3xl font-bold text-landing-text-primary mb-4">Records your meetings</h2>
            <p className="text-lg text-landing-text-primary/80 mb-8">
              Cluely listens to your meetings in the background and takes real-time notes without joining.
            </p>
            <MeetingSettingsCard />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-landing-text-primary mb-4">Answers in real-time</h2>
            <p className="text-lg text-landing-text-primary/80 mb-8">
              Cluely responds with context of what's happening in a conversation and what's on your screen.
            </p>
            <RealtimeAnswersCard />
          </div>
        </div>

        {/* Call to Action Text */}
        <div className="text-center py-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-landing-text-primary mb-8">
            It's time to cheat
          </h2>
          <p className="text-5xl md:text-7xl font-extrabold leading-tight">
            {cyclingWords.map((word, index) => (
              <React.Fragment key={index}>
                <span
                  className={cn(
                    "inline-block transition-colors duration-500",
                    index === activeWordIndex
                      ? "bg-gradient-to-r from-landing-button-gradient-start to-landing-button-gradient-end bg-clip-text text-transparent"
                      : "text-gray-300 dark:text-gray-700"
                  )}
                >
                  {word}
                </span>
                {' '} {/* Add a space between words */}
              </React.Fragment>
            ))}
          </p>
        </div>
      </section>

      {/* Undetectable Section */}
      <section className="w-full py-24 bg-gradient-to-br from-undetectable-background-start to-undetectable-background-end text-undetectable-text-primary">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-blue-600 dark:text-blue-400 text-lg font-semibold mb-2">Completely undetectable</h2>
          <p className="text-4xl md:text-5xl font-extrabold leading-tight mb-16">
            Poof. Completely undetectable to every software.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <div>
              <MeetingParticipantsCard />
              <h3 className="text-xl font-bold mt-8 mb-2 text-undetectable-text-primary">Doesn't join meetings.</h3>
              <p className="text-undetectable-text-secondary max-w-xs mx-auto">
                Cluely never joins your meetings, so there are no bots and no extra people on the guest list.
              </p>
            </div>
            <div>
              <InvisibleToScreenShareCard />
              <h3 className="text-xl font-bold mt-8 mb-2 text-undetectable-text-primary">Invisible to screen share.</h3>
              <p className="text-undetectable-text-secondary max-w-xs mx-auto">
                Cluely never shows up in shared screens, recordings, or external meeting tools.
              </p>
            </div>
            <div>
              <NeverInYourWayCard />
              <h3 className="text-xl font-bold mt-8 mb-2 text-undetectable-text-primary">Never in your way.</h3>
              <p className="text-undetectable-text-secondary max-w-xs mx-auto">
                Cluely appears as a translucent and hideable window over all your other applications.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <p className="text-sm font-semibold text-undetectable-text-muted uppercase tracking-wider mb-8">
              Works with every meeting platform
            </p>
            <MeetingPlatformLogos />
          </div>
        </div>
      </section>

      {/* Bottom Get for Mac Button */}
      <div className="flex justify-center mt-16 pb-24">
        <Button className="bg-gradient-to-br from-landing-button-gradient-start to-landing-button-gradient-end text-white hover:from-landing-button-gradient-start/90 hover:to-landing-button-gradient-end/90 rounded-lg px-8 py-3 text-base font-semibold shadow-md">
          <Apple className="h-5 w-5 mr-2" /> Get for Mac
        </Button>
      </div>

      {/* Floating Mouse Cursor */}
      {buttonPositions.whatToSayNext && buttonPositions.followUpQuestions && (
        <FloatingMouseCursor x={mousePosition.x} y={mousePosition.y} isClicking={isClicking} />
      )}
    </div>
  );
};

export default LandingPage;