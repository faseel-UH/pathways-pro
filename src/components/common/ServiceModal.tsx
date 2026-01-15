import { useState } from 'react';

interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceTitle: string;
}

const ServiceModal = ({ isOpen, onClose, serviceTitle }: ServiceModalProps) => {
    if (!isOpen) return null;

    const [step, setStep] = useState(1);

    return (
        <div className="modal-overlay animate-fadeIn" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-4)'
        }}>
            <div className="modal-content animate-scaleIn" style={{
                background: 'var(--color-neutral-900)',
                border: '1px solid var(--color-neutral-700)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6)',
                width: '100%',
                maxWidth: '500px',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'var(--space-4)',
                        right: 'var(--space-4)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-neutral-400)',
                        cursor: 'pointer',
                        fontSize: 'var(--text-xl)'
                    }}
                >
                    ×
                </button>

                {step === 1 ? (
                    <>
                        <h2 style={{ marginBottom: 'var(--space-2)' }}>Book Session</h2>
                        <p className="text-secondary" style={{ marginBottom: 'var(--space-6)' }}>
                            {serviceTitle}
                        </p>

                        <div style={{ marginBottom: 'var(--space-4)' }}>
                            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>Select Date</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)' }}>
                                {['Jan 15', 'Jan 16', 'Jan 17'].map(date => (
                                    <button key={date} className="btn btn-secondary" style={{ fontSize: 'var(--text-sm)' }}>{date}</button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: 'var(--space-6)' }}>
                            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>Select Time</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)' }}>
                                {['10:00 AM', '2:00 PM', '4:30 PM', '6:00 PM'].map(time => (
                                    <button key={time} className="btn btn-secondary" style={{ fontSize: 'var(--text-sm)' }}>{time}</button>
                                ))}
                            </div>
                        </div>

                        <button
                            className="btn btn-primary btn-full"
                            onClick={() => setStep(2)}
                        >
                            Confirm Booking
                        </button>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
                        <div style={{ fontSize: 'var(--text-6xl)', marginBottom: 'var(--space-4)' }} className="animate-scaleIn">✅</div>
                        <h2 style={{ marginBottom: 'var(--space-2)' }}>Booking Confirmed!</h2>
                        <p className="text-secondary" style={{ marginBottom: 'var(--space-6)' }}>
                            We've sent the details to your email.
                        </p>
                        <button className="btn btn-primary btn-full" onClick={onClose}>
                            Back to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceModal;
