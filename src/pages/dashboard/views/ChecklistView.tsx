import { useState } from 'react';
import { useI18n } from '../../../i18n';

interface Task {
    id: string;
    titleKey?: string;
    title: string;
    categoryKey: string;
    category: string;
    dueDate?: string;
    dueDateRelative?: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
}

const MOCK_TASKS: Task[] = [
    // Academic
    { id: '1', title: 'Review Chemistry HL notes', categoryKey: 'categories.academic', category: 'Academic', dueDate: 'Today', dueDateRelative: 'today', completed: false, priority: 'high' },
    { id: '2', title: 'Complete Math Extended Essay draft', categoryKey: 'categories.academic', category: 'Academic', dueDate: 'Tomorrow', dueDateRelative: 'tomorrow', completed: false, priority: 'high' },
    { id: '3', title: 'Submit Biology lab report', categoryKey: 'categories.academic', category: 'Academic', dueDate: 'Jan 18', completed: true, priority: 'medium' },

    // Test Prep
    { id: '4', title: 'UCAT Practice Test - Verbal Reasoning', categoryKey: 'categories.testPrep', category: 'Test Prep', dueDate: 'Jan 16', completed: false, priority: 'medium' },
    { id: '5', title: 'Review UCAT Decision Making strategies', categoryKey: 'categories.testPrep', category: 'Test Prep', completed: true, priority: 'low' },

    // Profile Building
    { id: '6', title: 'Write super-curricular essay outline', categoryKey: 'categories.profileBuilding', category: 'Profile Building', dueDate: 'Jan 20', completed: false, priority: 'medium' },
    { id: '7', title: 'Log hospital volunteering hours', categoryKey: 'categories.profileBuilding', category: 'Profile Building', completed: false, priority: 'low' },
    { id: '8', title: 'Research Medical Research internship', categoryKey: 'categories.profileBuilding', category: 'Profile Building', completed: true, priority: 'low' },
];

const ChecklistView = () => {
    const { t, direction } = useI18n();
    const [tasks, setTasks] = useState(MOCK_TASKS);
    const [animatingId, setAnimatingId] = useState<string | null>(null);

    const toggleTask = (taskId: string) => {
        setAnimatingId(taskId);

        // Add slight delay for animation
        setTimeout(() => {
            setTasks(prev =>
                prev.map(task =>
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                )
            );
            setAnimatingId(null);
        }, 300);
    };

    const categories = Array.from(new Set(tasks.map(t => t.category)));

    const getPriorityClass = (priority: string) => {
        switch (priority) {
            case 'high': return 'priority-high';
            case 'medium': return 'priority-medium';
            case 'low': return 'priority-low';
            default: return '';
        }
    };

    const getDueDateDisplay = (task: Task) => {
        if (task.dueDateRelative === 'today') return t('common.today');
        if (task.dueDateRelative === 'tomorrow') return t('common.tomorrow');
        return task.dueDate;
    };

    return (
        <div className="checklist-view" dir={direction}>
            {categories.map((category, categoryIndex) => {
                const categoryTasks = tasks.filter(t => t.category === category);
                const completedCount = categoryTasks.filter(t => t.completed).length;
                const categoryTask = categoryTasks[0];

                return (
                    <div
                        key={category}
                        className="checklist-section animate-fadeInUp"
                        style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                    >
                        <div className="checklist-section-header">
                            <h3 className="checklist-section-title">
                                {t(categoryTask.categoryKey)}
                            </h3>
                            <div className="checklist-section-progress">
                                <span className="checklist-section-count">
                                    {completedCount}/{categoryTasks.length}
                                </span>
                                <div className="checklist-section-bar">
                                    <div
                                        className="checklist-section-bar-fill"
                                        style={{ width: `${(completedCount / categoryTasks.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="checklist-items">
                            {categoryTasks.map((task, taskIndex) => (
                                <div
                                    key={task.id}
                                    className={`
                                        checklist-item 
                                        ${task.completed ? 'completed' : ''} 
                                        ${getPriorityClass(task.priority)}
                                        ${animatingId === task.id ? 'animating' : ''}
                                    `}
                                    onClick={() => toggleTask(task.id)}
                                    style={{ animationDelay: `${(categoryIndex * 0.1) + (taskIndex * 0.05)}s` }}
                                    role="checkbox"
                                    aria-checked={task.completed}
                                    tabIndex={0}
                                    onKeyPress={(e) => e.key === 'Enter' && toggleTask(task.id)}
                                >
                                    <div className="checklist-checkbox">
                                        <div className="checklist-checkbox-inner">
                                            {task.completed && (
                                                <svg className="checklist-check-icon" viewBox="0 0 24 24" fill="none">
                                                    <path
                                                        d="M5 13l4 4L19 7"
                                                        stroke="currentColor"
                                                        strokeWidth="3"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="checklist-checkbox-ripple" />
                                    </div>

                                    <div className="checklist-content">
                                        <div className="checklist-title">{task.title}</div>
                                        {task.dueDate && !task.completed && (
                                            <div className="checklist-meta">
                                                <span className="checklist-meta-icon">📅</span>
                                                {t('common.due')}: {getDueDateDisplay(task)}
                                            </div>
                                        )}
                                    </div>

                                    {task.dueDate && !task.completed && (
                                        <span className={`
                                            checklist-due-badge 
                                            ${task.dueDateRelative === 'today' || task.dueDateRelative === 'tomorrow' ? 'urgent' : ''}
                                        `}>
                                            {getDueDateDisplay(task)}
                                        </span>
                                    )}

                                    {!task.priority || task.priority === 'high' && (
                                        <span className="checklist-priority-indicator" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* Service Recommendation Card - Premium Design */}
            <div className="recommendation-section animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <h4 className="recommendation-title">
                    {t('dashboard.checklist.recommendedTitle')}
                </h4>
                <div className="nudge-card">
                    <div className="nudge-icon-wrapper">
                        <span className="nudge-icon">📚</span>
                        <span className="nudge-icon-glow" />
                    </div>
                    <div className="nudge-content">
                        <div className="nudge-title">UCAT Intensive Course</div>
                        <div className="nudge-description">
                            Boost your score with UniHawk's proven strategy
                        </div>
                        <div className="nudge-meta">
                            <span className="nudge-tag">Popular</span>
                            <span className="nudge-rating">⭐ 4.9</span>
                        </div>
                    </div>
                    <button className="nudge-action">
                        <span>{t('common.learnMore')}</span>
                        <span className="nudge-arrow">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChecklistView;
