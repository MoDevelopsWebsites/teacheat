"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Apple, Mic, MessageSquareText, Sparkles, FileText, EyeOff } from 'lucide-react';
import { useSession } from '@/integrations/supabase/SessionContextProvider';
import MeetingWindowMockup from '@/components/MeetingWindowMockup';
import FloatingMouseCursor from '@/components/FloatingMouseCursor';
import MeetingSettingsCard from '@/components/MeetingSettingsCard'; // Re-import original component
import RealtimeAnswersCard from '@/components/RealtimeAnswersCard'; // Re-import original component
import MeetingParticipantsCard from '@/components/MeetingParticipantsCard';
import InvisibleToScreenShareCard from '@/components/InvisibleToScreenShareCard';
import NeverInYourWayCard from '@/components/NeverInYourWayCard';
import { InfiniteMovingLogos } from '@/components/InfiniteMovingLogos';
import MeetingRecapCard from '@/components/MeetingRecapCard';
import FAQSection from '@/components/FAQSection';
import CTABottomSection from '@/components/CTABottomSection';
import Header from '@/components/Header';
import FloatingGetStartedButton from '@/components/FloatingGetStartedButton';
import Footer from '@/components/Footer';
import { useTypewriter } from '@/hooks/use-typewriter';
import { cn } from '@/lib/utils';
import { DisplayCardsDemo } from '@/components/DisplayCardsDemo';
import GlitterEffect from '@/components/GlitterEffect'; // Import the new GlitterEffect component
import { TestimonialsSectionDemo } => '@/components/blocks/TestimonialsSectionDemo'; // Import the new testimonials demo

const initialAiResponse = "Okay, so you've implemented the `debounce` function. Can you walk me through your thought process for handling the `this` context and arguments?";
const nextSuggestionResponse = "My thought process for handling `this` context involves using `apply` or `call` to explicitly set it, ensuring the original context is preserved. For arguments, I use the spread operator to pass them transparently.";
const followUpQuestionsResponse = "I'd like to ask some follow-up questions: 1. How would you test this `debounce` function to ensure its correctness? 2. What are the time and space complexities of your implementation? 3. Could you also implement a `throttle` function and explain the differences?";

const cyclingWords = ["Interviews.", "Sales calls.", "Homework.", "Meetings.", "Really everything."];

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

  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const landingPageRef = useRef<HTMLDivElement>(null); // Ref for the main landing page container

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWordIndex((prevIndex) => (prevIndex + 1) % cyclingWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading && session) {
      navigate('/chat');
    }
  }, [session, isLoading, navigate]);

  const handleButtonPositionsReady = useCallback((positions: { whatToSayNext: DOMRect | null; followUpQuestions: DOMRect | null }) => {
    setButtonPositions(positions);
  }, []);

  useEffect(() => {
    if (!buttonPositions.whatToSayNext || !buttonPositions.followUpQuestions || !landingPageRef.current) {
      return;
    }

    let animationTimeout: NodeJS.Timeout;
    const landingPageRect = landingPageRef.current.getBoundingClientRect();

    const animateSequence = async () => {
      const typewriterSpeed = 30;
      const typewriterDelay = 5000;

      setCurrentAiResponse(initialAiResponse);
      setTypewriterKey(prev => prev + 1);
      setActiveSuggestionType('none');
      await new Promise(resolve => setTimeout(resolve, calculateTypingDuration(initialAiResponse, typewriterSpeed, typewriterDelay)));

      const nextButton = buttonPositions.whatToSayNext!;
      setMousePosition({
        x: (nextButton.left + nextButton.width / 2) - landingPageRect.left,
        y: (nextButton.top + nextButton.height / 2) - landingPageRect.top - 10, // Adjusted Y coordinate
      });
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsClicking(true);
      setCurrentAiResponse(nextSuggestionResponse);
      setTypewriterKey(prev => prev + 1);
      setActiveSuggestionType('whatToSayNext');
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsClicking(false);
      await new Promise(resolve => setTimeout(resolve, calculateTypingDuration(nextSuggestionResponse, typewriterSpeed, typewriterDelay)));

      const followUpButton = buttonPositions.followUpQuestions!;
      setMousePosition({
        x: (followUpButton.left + followUpButton.width / 2) - landingPageRect.left,
        y: (followUpButton.top + followUpButton.height / 2) - landingPageRect.top - 10, // Adjusted Y coordinate
      });
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsClicking(true);
      setCurrentAiResponse(followUpQuestionsResponse);
      setTypewriterKey(prev => prev + 1);
      setActiveSuggestionType('followUpQuestions');
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsClicking(false);
      await new Promise(resolve => setTimeout(resolve, calculateTypingDuration(followUpQuestionsResponse, typewriterSpeed, typewriterDelay)));

      animationTimeout = setTimeout(animateSequence, 2000);
    };

    animationTimeout = setTimeout(animateSequence, 1000);

    return () => clearTimeout(animationTimeout);
  }, [buttonPositions, landingPageRef]);

  const handleJoinWaitlistClick = () => {
    navigate('/waitlist'); // Redirect to waitlist
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-xl text-landing-text-primary">Loading session...</p>
      </div>
    );
  }

  return (
    <div ref={landingPageRef} className="relative flex flex-col min-h-screen bg-gradient-to-b from-landing-background-start via-blue-50/50 to-white dark:to-gray-900 text-landing-text-primary overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-screen bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL + "wallpaper8.jpg"})`,
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          opacity: 0.7,
          filter: 'blur(4px)',
        }}
      ></div>

      <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000 z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000 z-0"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-green-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-6000 z-0"></div>

      <Header isLandingPageHeader={true} />

      <FloatingGetStartedButton />

      <main className="flex-grow flex flex-col items-center">
        <section className="relative flex flex-col items-center text-center w-full px-4 py-16 z-10 mt-12">
          <GlitterEffect /> {/* Glitter effect behind the main text content */}
          <div className="max-w-4xl mx-auto"> {/* New wrapper for content */}
            <img src={import.meta.env.BASE_URL + "chat-bubble-icon.svg"} alt="Chat bubble" className="absolute -top-8 left-1/4 w-10 h-10 opacity-80 z-0 animate-float animation-delay-1000" style={{ transform: 'translate(-50%, -50%) rotate(10deg)' }} />
            <img src={import.meta.env.BASE_URL + "magnifying-glass-icon.svg"} alt="Magnifying glass" className="absolute top-1/3 -left-16 w-14 h-14 opacity-80 z-0 animate-float animation-delay-3000" style={{ transform: 'translate(-50%, -50%) rotate(-15deg)' }} />
            <img src={import.meta.env.BASE_URL + "notes-icon.svg"} alt="Notes" className="absolute bottom-1/4 -right-16 w-16 h-16 opacity-80 z-0 animate-float animation-delay-5000" style={{ transform: 'translate(50%, 50%) rotate(20deg)' }} />
            <img src={import.meta.env.BASE_URL + "calendar-icon.svg"} alt="Calendar" className="absolute -bottom-8 right-1/4 w-12 h-12 opacity-80 z-0 animate-float animation-delay-7000" style={{ transform: 'translate(50%, -50%) rotate(5deg)' }} />

            <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-normal leading-tight mb-6 text-white font-display z-10" data-lenis-speed="0.5">
              <span className="text-7xl md:text-8xl">#1</span> AI assistant <br /> for meetings
            </h1>
            <p className="relative text-lg md:text-xl lg:text-2xl text-white font-normal mb-10 max-w-2xl z-10" data-lenis-speed="0.2">
              Takes perfect notes, answers questions in real-time, and <br className="hidden md:block" /> makes you the most prepared person on every call.
            </p>
            <div className="relative flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 z-10 justify-center">
              <Button
                className="bg-gradient-to-br from-landing-button-gradient-start to-landing-button-gradient-end text-white hover:from-landing-button-gradient-hover-start hover:to-landing-button-gradient-hover-end rounded-lg px-8 py-3 text-base font-semibold shadow-button-glow-hover"
                onClick={handleJoinWaitlistClick}
              >
                <Apple className="h-5 w-5 mr-2" /> Join waitlist
              </Button>
            </div>
          </div>
        </section>

        <div className="mt-16 mb-24 z-10 w-full px-4 flex justify-center">
          <MeetingWindowMockup
            currentAiResponse={currentAiResponse}
            typewriterKey={typewriterKey}
            onButtonPositionsReady={handleButtonPositionsReady}
            activeSuggestionType={activeSuggestionType}
          />
        </div>

        <section className="w-full py-16 z-10"> {/* Removed bg-white dark:bg-gray-900 */}
          <div className="max-w-7xl mx-auto px-6"> {/* New wrapper for content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-24">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-landing-text-primary mb-4">Records your meetings</h2>
                <p className="text-lg md:text-xl text-landing-text-primary/80 mb-8 max-w-sm">
                  Teacheat listens to your meetings in the background and takes real-time notes without joining.
                </p>
                <MeetingSettingsCard /> {/* Reverted to original component */}
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-landing-text-primary mb-4">Answers in real-time</h2>
                <p className="text-lg md:text-xl text-landing-text-primary/80 mb-8 max-w-sm">
                  Teacheat responds with context of what's happening in a conversation and what's on your screen.
                </p>
                <RealtimeAnswersCard /> {/* Reverted to original component */}
              </div>
            </div>

            {/* DisplayCardsDemo remains here */}
            <div className="text-center py-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-landing-text-primary mb-8">
                It's time to cheat
              </h2>
              <p className="text-5xl md:text-7xl font-extrabold leading-tight mb-12">
                {cyclingWords.map((word, index) => (
                  <React.Fragment key={index}>
                    <span
                      className={cn(
                        "inline-block transition-colors duration-500",
                        index === activeWordIndex
                          ? "text-blue-600"
                          : "text-gray-300 dark:text-gray-700"
                      )}
                    >
                      {word}
                    </span>
                    {' '}
                  </React.Fragment>
                ))}
              </p>
              <DisplayCardsDemo />
            </div>
          </div>
        </section>

        <section className="w-full py-24 bg-gradient-to-br from-white dark:from-gray-900 to-undetectable-background-end text-undetectable-text-primary">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-blue-600 dark:text-blue-400 text-lg font-semibold mb-2">Completely undetectable</h2>
            <p className="text-4xl md:text-5xl font-extrabold leading-tight mb-16">
              Poof. Completely undetectable to every software.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              <div>
                <MeetingParticipantsCard />
                <h3 className="text-xl md:text-2xl font-bold mt-8 mb-2 text-undetectable-text-primary">Doesn't join meetings.</h3>
                <p className="text-lg text-undetectable-text-secondary max-w-xs mx-auto">
                  Teacheat never joins your meetings, so there are no bots and no extra people on the guest list.
                </p>
              </div>
              <div>
                <InvisibleToScreenShareCard />
                <h3 className="text-xl md:text-2xl font-bold mt-8 mb-2 text-undetectable-text-primary">Invisible to screen share.</h3>
                <p className="text-lg text-undetectable-text-secondary max-w-xs mx-auto">
                  Teacheat never shows up in shared screens, recordings, or external meeting tools.
                </p>
              </div>
              <div>
                <NeverInYourWayCard />
                <h3 className="text-xl md:text-2xl font-bold mt-8 mb-2 text-undetectable-text-primary">Never in your way.</h3>
                <p className="text-lg text-undetectable-text-secondary max-w-xs mx-auto">
                  Teacheat appears as a translucent and hideable window over all your other applications.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <p className="text-sm font-semibold text-undetectable-text-muted uppercase tracking-wider mb-8">
                Works with every meeting platform
              </p>
              <InfiniteMovingLogos />
            </div>
          </div>
        </section>

        <section className="relative w-full py-24 bg-white dark:bg-gray-900 text-landing-text-primary">
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

            <div className="flex justify-center w-full px-4">
              <MeetingRecapCard />
            </div>
          </div>
        </section>

        <TestimonialsSectionDemo /> {/* Testimonials section added here */}

        <FAQSection />

        <CTABottomSection />
      </main>

      {buttonPositions.whatToSayNext && buttonPositions.followUpQuestions && (
        <FloatingMouseCursor x={mousePosition.x} y={mousePosition.y} isClicking={isClicking} />
      )}
      <Footer />
    </div>
  );
};

export default LandingPage;