import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';
import './AIChatModal.css';

interface AIChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Message {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const AIChatModal = ({ isOpen, onClose }: AIChatModalProps) => {
    const { t, direction } = useI18n();
    const location = useLocation();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Get contextual prompts based on current route
    const getContextualPrompts = (): string[] => {
        const path = location.pathname;
        if (path.includes('/timeline')) {
            return [
                'Explain my 4-year plan',
                'What should I focus on this year?',
                'How do I stay on track?',
            ];
        }
        if (path.includes('/weekly')) {
            return [
                'Help me prioritize this week',
                'What tasks are most important?',
                'Tips for staying productive',
            ];
        }
        if (path.includes('/milestones')) {
            return [
                'What\'s my next major milestone?',
                'How do I achieve this goal?',
                'Show me similar success stories',
            ];
        }
        if (path.includes('/profile')) {
            return [
                'How can I improve my profile?',
                'What achievements am I close to?',
                'Tips for standing out',
            ];
        }
        // Default/Checklist
        return [
            'Help me prioritize my tasks',
            'What should I focus on today?',
            'How am I progressing?',
        ];
    };

    const contextualPrompts = getContextualPrompts();

    // Add welcome message on first open
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                id: 1,
                role: 'assistant',
                content: 'Hi! I\'m your AI mentor. How can I help you today?',
                timestamp: new Date(),
            }]);
        }
    }, [isOpen]);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Mock AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: messages.length + 2,
                role: 'assistant',
                content: `I understand you're asking about "${input}". Let me help you with that! (This is a mock response - real AI integration coming soon)`,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1000);
    };

    const handlePromptClick = (prompt: string) => {
        setInput(prompt);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="ai-chat-backdrop" onClick={onClose} />

            {/* Modal */}
            <div className={`ai-chat-modal ${isOpen ? 'open' : ''}`} dir={direction}>
                {/* Header */}
                <div className="ai-chat-header">
                    <div className="ai-chat-header-content">
                        <div className="ai-chat-avatar">🤖</div>
                        <div>
                            <h2 className="ai-chat-title">{t('aiChat.title')}</h2>
                            <p className="ai-chat-subtitle">{t('aiChat.subtitle')}</p>
                        </div>
                    </div>
                    <button className="ai-chat-close" onClick={onClose} aria-label="Close">
                        ✕
                    </button>
                </div>

                {/* Contextual Prompts */}
                {messages.length === 1 && (
                    <div className="ai-chat-prompts">
                        <p className="ai-chat-prompts-label">Suggested questions:</p>
                        <div className="ai-chat-prompts-grid">
                            {contextualPrompts.map((prompt, index) => (
                                <button
                                    key={index}
                                    className="ai-prompt-chip"
                                    onClick={() => handlePromptClick(prompt)}
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Messages */}
                <div className="ai-chat-messages">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`ai-message ${message.role}`}
                        >
                            <div className="ai-message-content">
                                {message.content}
                            </div>
                            <div className="ai-message-time">
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="ai-chat-input-container">
                    <input
                        type="text"
                        className="ai-chat-input"
                        placeholder={t('aiChat.placeholder')}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        className="ai-chat-send"
                        onClick={handleSend}
                        disabled={!input.trim()}
                    >
                        <span>➤</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default AIChatModal;
