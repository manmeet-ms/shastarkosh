
import Markdown from 'react-markdown'
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IconSparkles, IconSend, IconLoader2, IconUser, IconAi } from '@tabler/icons-react';
import { Loader2 } from 'lucide-react';
import { sendAIMessage } from '@/services/ai.service';

export const AIChatPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant with knowledge about all posts, shastars, resources, and categories in Shastarkosh. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    const currentInput = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare conversation history (last 4 messages)
      const conversationHistory = messages.slice(-4).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Call Gemini API via backend
      const response = await sendAIMessage(currentInput, conversationHistory);
      
      // Handle Gemini response format (OpenAI-compatible)
      let aiContent = '';
      if (response.response?.content) {
        // Gemini returns message object with content
        aiContent = response.response.content;
      } else if (typeof response.response === 'string') {
        // Fallback if response is a string
        aiContent = response.response;
      } else {
        aiContent = 'I received your message but had trouble formatting the response.';
      }

      const aiResponse = {
        role: 'assistant',
        content: aiContent,
        timestamp: new Date(),
        context: response.context
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI Chat error:', error);
      let errorContent = 'Sorry, I encountered an error. Please try again.';
      
      if (error.response?.status === 401) {
        errorContent = 'Please log in to use the AI assistant.';
      } else if (error.response?.data?.message) {
        errorContent = `Error: ${error.response.data.message}`;
      } else if (error.message) {
        errorContent = `Error: ${error.message}`;
      }

      const errorMessage = {
        role: 'assistant',
        content: errorContent,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 w-28  py-6  rounded-full shadow-lg hover:shadow-xl transition-all z-50"
        >
          <IconSparkles className="h-12 w-12" /> Ask AI
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full sm:w-[500px] p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <IconAi className="h-5 w-5 text-primary" />
            AI Assistant
          </SheetTitle>
          <SheetDescription>
            Ask me anything about Shastarkosh content
          </SheetDescription>
        </SheetHeader>

        {/* Messages Area */}
        <ScrollArea ref={scrollRef} className="flex-1 h-[400px] p-6">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconAi className="h-5 w-5 text-primary" />
                  </div>
                )}
                {/* tell abuot galtka is difrent from kalaripayattu */}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap wrap-break-word">
                   <Markdown>{message.content}</Markdown>
                  </p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <IconUser className="h-5 w-5 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <IconAi className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about posts, shastars, resources..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              {isLoading ? (
                <IconLoader2 className="h-4 w-4 animate-spin" />
              ) : (
                <IconSend className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
