import { useState } from 'react';
import ServiceModal from './ServiceModal';

interface ServiceNudgeCardProps {
    title?: string;
    description?: string;
    icon?: string;
}

const ServiceNudgeCard = ({
    title = "Unlock Premium Insights",
    description = "Get deeper analysis with a 1-on-1 counselor session",
    icon = "🔓"
}: ServiceNudgeCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="nudge-card interactive">
                <div className="nudge-icon">{icon}</div>
                <div className="nudge-content">
                    <div className="nudge-title">{title}</div>
                    <div className="nudge-description">{description}</div>
                </div>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setIsModalOpen(true)}
                    style={{ whiteSpace: 'nowrap' }}
                >
                    Book Now
                </button>
            </div>

            <ServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                serviceTitle={title}
            />
        </>
    );
};

export default ServiceNudgeCard;
