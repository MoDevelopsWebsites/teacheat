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
import MeetingParticipantsCard from '@/components/MeetingParticipantsCard';
import InvisibleToScreenShareCard from '@/components/InvisibleToScreenShareCard';
import NeverInYourWayCard from '@/components/NeverInYourWayCard';
import MeetingPlatformLogos from '@/components/MeetingPlatformLogos';
import MeetingRecapCard from '@/components/MeetingRecapCard';
import FAQSection from '@/components/FAQSection';
import CTABottomSection from '@/components/CTABottomSection';
import Header from '@/components/Header'; // Import the new Header component
import FloatingGetStartedButton from '@/components/FloatingGetStartedButton'; // Import the new floating button
import Footer from '@/components/Footer'; // Import the Footer component
import { useTypewriter } from '@/hooks/use-typewriter';
import { cn } from '@/lib/utils';

const initialAiResponse = "Okay, so you've implemented the `debounce` function. Can you walk me through your thought process for handling the `this` context and arguments?";
const nextSuggestionResponse = "My thought process for handling `this` context involves using `apply` or `call` to explicitly set it, ensuring the original context is preserved. For arguments, I use the spread operator to pass them transparently.";
const followUpQuestionsResponse = "I'd like to ask some follow-up questions: 1. How would you test this `debounce` function to ensure its correctness? 2. What are the time and space complexities of your implementation? 3. Could you also implement a `throttle` function and explain the differences?";

const cyclingWords = ["Interviews.", "Sales calls.", "Homework.", "Meetings.", "Really everything."];

// Helper function to calculate the total duration for typing and holding a response
const calculateTypingDuration = (text: string, speed: number, delay: number) => {
  return (text.length * speed) + delay;
};

const LandingPage = () => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  const [currentAiResponse, setCurrentAiResponse] = useState(initialAiResponse);
  const [typewriterKey, setTypewriterKey] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [buttonPositions, setButtonPositions] = useState<{
    whatToSayNext: DOMRect | null;
    followUpQuestions: DOMRect | null;
  }>({ whatToSayNext: null, followUpQuestions: null });
  const [activeSuggestionType, setActiveSuggestionType] = useState<'whatToSayNext' | 'followUpQuestions' | 'none'>('none');

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
      const typewriterSpeed = 30; // Matches speed in MeetingWindowMockup
      const typewriterDelay = 5000; // Matches delay in MeetingWindowMockup

      // Start with initial AI response
      setCurrentAiResponse(initialAiResponse);
      setTypewriterKey(prev => prev + 1);
      setActiveSuggestionType('none'); // No specific suggestion active initially
      await new Promise(resolve => setTimeout(resolve, calculateTypingDuration(initialAiResponse, typewriterSpeed, typewriterDelay)));

      // 1. Move to "What should I say next?" button
      const nextButton = buttonPositions.whatToSayNext!;
      setMousePosition({
        x: nextButton.left + nextButton.width / 2,
        y: nextButton.top + nextButton.height / 2,
      });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mouse move duration

      // 2. Click "What should I say next?"
      setIsClicking(true);
      setCurrentAiResponse(nextSuggestionResponse);
      setTypewriterKey(prev => prev + 1);
      setActiveSuggestionType('whatToSayNext'); // Set active suggestion type
      await new Promise(resolve => setTimeout(resolve, 300)); // Click duration
      setIsClicking(false);
      await new Promise(resolve => setTimeout(resolve, calculateTypingDuration(nextSuggestionResponse, typewriterSpeed, typewriterDelay)));

      // 3. Move to "Follow-up questions" button
      const followUpButton = buttonPositions.followUpQuestions!;
      setMousePosition({
        x: followUpButton.left + followUpButton.width / 2,
        y: followUpButton.top + followUpButton.height / 2,
      });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mouse move duration

      // 4. Click "Follow-up questions"
      setIsClicking(true);
      setCurrentAiResponse(followUpQuestionsResponse);
      setTypewriterKey(prev => prev + 1);
      setActiveSuggestionType('followUpQuestions'); // Set active suggestion type
      await new Promise(resolve => setTimeout(resolve, 300)); // Click duration
      setIsClicking(false);
      await new Promise(resolve => setTimeout(resolve, calculateTypingDuration(followUpQuestionsResponse, typewriterSpeed, typewriterDelay)));

      // Loop the animation
      animationTimeout = setTimeout(animateSequence, 2000); // Short delay before restarting the entire sequence
    };

    animationTimeout = setTimeout(animateSequence, 1000); // Initial delay before starting sequence

    return () => clearTimeout(animationTimeout);
  }, [buttonPositions]); // Re-run effect if button positions change

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-xl text-landing-text-primary">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-landing-background-start to-landing-background-end text-landing-text-primary overflow-hidden">
      {/* Mountain Background Image with Fade */}
      <div
        className="absolute top-0 left-0 w-full h-[600px] bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL + "wallpaper6.jpg"})`, // Changed to wallpaper6.jpg
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', // Fade to bottom
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', // For Webkit browsers
          opacity: 0.7, // Reduced opacity
          filter: 'blur(4px)', // Increased blur effect
        }}
      ></div>

      {/* Floating Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000 z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000 z-0"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-green-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-6000 z-0"></div>

      {/* Header */}
      <Header isLandingPageHeader={true} />

      {/* Floating Get Started Button */}
      <FloatingGetStartedButton />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center px-4 py-16 max-w-4xl z-10 mt-12">
        {/* Floating Icons for Hero Section */}
        <img src={import.meta.env.BASE_URL + "chat-bubble-icon.svg"} alt="Chat bubble" className="absolute -top-8 left-1/4 w-10 h-10 opacity-80 z-0 animate-float animation-delay-1000" style={{ transform: 'translate(-50%, -50%) rotate(10deg)' }} />
        <img src={import.meta.env.BASE_URL + "magnifying-glass-icon.svg"} alt="Magnifying glass" className="absolute top-1/3 -left-16 w-14 h-14 opacity-80 z-0 animate-float animation-delay-3000" style={{ transform: 'translate(-50%, -50%) rotate(-15deg)' }} />
        <img src={import.meta.env.BASE_URL + "notes-icon.svg"} alt="Notes" className="absolute bottom-1/4 -right-16 w-16 h-16 opacity-80 z-0 animate-float animation-delay-5000" style={{ transform: 'translate(50%, 50%) rotate(20deg)' }} />
        <img src={import.meta.env.BASE_URL + "calendar-icon.svg"} alt="Calendar" className="absolute -bottom-8 right-1/4 w-12 h-12 opacity-80 z-0 animate-float animation-delay-7000" style={{ transform: 'translate(50%, -50%) rotate(5deg)' }} />

        <h1 className="text-5xl md:text-6xl font-normal leading-tight mb-6 text-white font-display">
          <span className="text-7xl md:text-8xl">#1</span> AI assistant <br /> for meetings
        </h1>
        <p className="text-lg md:text-xl text-white font-normal mb-10 max-w-2xl">
          Takes perfect notes, answers questions in real-time, and <br /> makes you the most prepared person on every call.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"> {/* Adjusted for mobile */}
          <Button
            className="bg-gradient-to-br from-landing-button-gradient-start to-landing-button-gradient-end text-white hover:from-landing-button-gradient-hover-start hover:to-landing-button-gradient-hover-end rounded-lg px-8 py-3 text-base font-semibold shadow-button-glow-hover"
            onClick={handleGetStartedClick}
          >
            <Apple className="h-5 w-5 mr-2" /> Get Started
          </Button>
        </div>
      </section>

      {/* Meeting Window Mockup */}
      <div className="mt-16 mb-24 z-10">
        <MeetingWindowMockup
          currentAiResponse={currentAiResponse}
          typewriterKey={typewriterKey}
          onButtonPositionsReady={handleButtonPositionsReady}
          activeSuggestionType={activeSuggestionType}
        />
      </div>

      {/* Features Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div>
            <h2 className="text-3xl font-bold text-landing-text-primary mb-4">Records your meetings</h2>
            <p className="text-lg text-landing-text-primary/80 mb-8 max-w-sm"> {/* Added max-w-sm */}
              Teacheat listens to your meetings in the background and takes real-time notes without joining.
            </p>
            <MeetingSettingsCard />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-landing-text-primary mb-4">Answers in real-time</h2>
            <p className="text-lg text-landing-text-primary/80 mb-8 max-w-sm"> {/* Added max-w-sm */}
              Teacheat responds with context of what's happening in a conversation and what's on your screen.
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
                {' '}
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
                Teacheat never joins your meetings, so there are no bots and no extra people on the guest list.
              </p>
            </div>
            <div>
              <InvisibleToScreenShareCard />
              <h3 className="text-xl font-bold mt-8 mb-2 text-undetectable-text-primary">Invisible to screen share.</h3>
              <p className="text-undetectable-text-secondary max-w-xs mx-auto">
                Teacheat never shows up in shared screens, recordings, or external meeting tools.
              </p>
            </div>
            <div>
              <NeverInYourWayCard />
              <h3 className="text-xl font-bold mt-8 mb-2 text-undetectable-text-primary">Never in your way.</h3>
              <p className="text-undetectable-text-secondary max-w-xs mx-auto">
                Teacheat appears as a translucent and hideable window over all your other applications.
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

      {/* New Section: Teacheat tells you where you went wrong */}
      <section className="relative w-full py-24 bg-white dark:bg-gray-900 text-landing-text-primary">
        {/* Floating Icons */}
        <img src={import.meta.env.BASE_URL + "chat-bubble-icon.svg"} alt="Chat bubble" className="absolute top-16 left-1/4 w-12 h-12 opacity-80 z-0 animate-float animation-delay-1000" style={{ transform: 'translate(-50%, -50%) rotate(10deg)' }} />
        <img src={import.meta.env.BASE_URL + "magnifying-glass-icon.svg"} alt="Magnifying glass" className="absolute top-1/2 left-1/4 w-16 h-16 opacity-80 z-0 animate-float animation-delay-3000" style={{ transform: 'translate(-50%, -50%) rotate(-15deg)' }} />
        <img src={import.meta.env.BASE_URL + "calendar-icon.svg"} alt="Calendar" className="absolute top-24 right-1/4 w-24 h-24 opacity-80 z-0 animate-float animation-delay-5000" style={{ transform: 'translate(50%, -50%) rotate(5deg)' }} />
        <img src={import.meta.env.BASE_URL + "video-camera-icon.svg"} alt="Video camera" className="absolute bottom-1/4 right-1/3 w-14 h-14 opacity-80 z-0 animate-float animation-delay-7000" style={{ transform: 'translate(50%, 50%) rotate(-10deg)' }} />
        <img src={import.meta.env.BASE_URL + "notes-icon.svg"} alt="Notes" className="absolute bottom-1/3 left-1/4 w-16 h-16 opacity-80 z-0 animate-float animation-delay-9000" style={{ transform: 'translate(-50%, -50%) rotate(20deg)' }} />
        <img src={import.meta.env.BASE_URL + "incognito-icon.svg"} alt="Incognito" className="absolute top-1/3 right-1/4 w-16 h-16 opacity-80 z-0 animate-float animation-delay-11000" style={{ transform: 'translate(50%, -50%) rotate(-5deg)' }} />


        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-blue-600 dark:text-blue-400 text-lg font-semibold mb-2">You mess up way more than you think</p>
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-16">
            Teacheat tells you where <br /> you went wrong
          </h2>
          <p className="text-lg md:text-xl text-landing-text-primary/80 mb-16 max-w-3xl mx-auto">
            After every call, Teacheat tells you how to improve, whether you're interviewing for a job, selling a product, working on an assignment, or just chatting.
          </p>

          <div className="flex justify-center">
            <MeetingRecapCard />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Bottom CTA Section */}
      <CTABottomSection />

      {/* Floating Mouse Cursor */}
      {buttonPositions.whatToSayNext && buttonPositions.followUpQuestions && (
        <FloatingMouseCursor x={mousePosition.x} y={mousePosition.y} isClicking={isClicking} />
      )}
      <Footer /> {/* Add Footer here */}
    </div>
  );
};

export default LandingPage;