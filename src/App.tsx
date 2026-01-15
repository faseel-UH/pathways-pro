import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './i18n';

// Landing Pages
import WelcomePage from './pages/landing/WelcomePage';
import LoginPage from './pages/landing/LoginPage';
import SignUpPage from './pages/landing/SignUpPage';
import EntrySelectionPage from './pages/landing/EntrySelectionPage';

// Onboarding Pages
import SchoolCodePage from './pages/onboarding/SchoolCodePage';
import SchoolConfirmPage from './pages/onboarding/SchoolConfirmPage';
import MagicLinkLandingPage from './pages/onboarding/MagicLinkLandingPage';

// Gate Zero
import GateZeroPage from './pages/gate-zero/GateZeroPage';

// Persona Flows
import SniperDisciplinePage from './pages/personas/sniper/SniperDisciplinePage';
import SniperUniversityPage from './pages/personas/sniper/SniperUniversityPage';
import FlightCheckPage from './pages/personas/sniper/FlightCheckPage';

import ExplorerAssessmentGatePage from './pages/personas/explorer/ExplorerAssessmentGatePage';
import SwipeDiscoveryPage from './pages/personas/explorer/SwipeDiscoveryPage';
import ArchetypeRevealPage from './pages/personas/explorer/ArchetypeRevealPage';
import DomainChoicePage from './pages/personas/explorer/DomainChoicePage';

import StrategistComparisonSetupPage from './pages/personas/strategist/StrategistComparisonSetupPage';
import HeadToHeadPage from './pages/personas/strategist/HeadToHeadPage';
import TieBreakerPage from './pages/personas/strategist/TieBreakerPage';
import DecisionGatePage from './pages/personas/strategist/DecisionGatePage';

// Dashboard
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ParentDashboardPage from './pages/dashboard/ParentDashboardPage';
import ExplorePage from './pages/dashboard/ExplorePage';
import PathwayDetailPage from './pages/dashboard/PathwayDetailPage';
import UniversitiesPage from './pages/dashboard/UniversitiesPage';

// Dashboard Views
import ChecklistView from './pages/dashboard/views/ChecklistView';
import TimelineView from './pages/dashboard/views/TimelineView';
import WeeklyPlanView from './pages/dashboard/views/WeeklyPlanView';
import MilestonesView from './pages/dashboard/views/MilestonesView';
import ProfilePage from './pages/dashboard/ProfilePage';

import { useApp } from './context/AppContext';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { state } = useApp();

    // Simple check for authentication
    if (!state.isAuthenticated) {
        // Redirect to login if not authenticated
        // Using window.location to force full redirect if needed, 
        // but typically Navigate component is better. 
        // We'll use a component redirect here.
        return <AuthRedirect />;
    }

    return children;
};

const AuthRedirect = () => {
    // We can't use useNavigate in a component rendered immediately by Routes sometimes
    // depending on structure, but inside <Routes> it's fine if wrapped.
    // However, simplest is to use Navigate from RRD.
    return <Navigate to="/login" replace />;
};

function App() {
    return (
        <ThemeProvider>
            <I18nProvider>
                <AppProvider>
                    <BrowserRouter>
                        <Routes>
                            {/* Landing */}
                            <Route path="/" element={<WelcomePage />} />
                            <Route path="/entry" element={<EntrySelectionPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/login" element={<LoginPage />} />

                            {/* Onboarding */}
                            <Route path="/onboarding/school-code" element={<SchoolCodePage />} />
                            <Route path="/onboarding/school-confirm" element={<SchoolConfirmPage />} />
                            <Route path="/onboarding/magic-link" element={<MagicLinkLandingPage />} />

                            {/* Gate Zero */}
                            <Route path="/gate-zero" element={<GateZeroPage />} />

                            {/* Sniper Flow */}
                            <Route path="/sniper/discipline" element={<SniperDisciplinePage />} />
                            <Route path="/sniper/university" element={<SniperUniversityPage />} />
                            <Route path="/sniper/flight-check" element={<FlightCheckPage />} />

                            {/* Explorer Flow */}
                            <Route path="/explorer/assessment-gate" element={<ExplorerAssessmentGatePage />} />
                            <Route path="/explorer/discovery" element={<SwipeDiscoveryPage />} />
                            <Route path="/explorer/archetype" element={<ArchetypeRevealPage />} />
                            <Route path="/explorer/domain-choice" element={<DomainChoicePage />} />

                            {/* Strategist Flow */}
                            <Route path="/strategist/comparison-setup" element={<StrategistComparisonSetupPage />} />
                            <Route path="/strategist/head-to-head" element={<HeadToHeadPage />} />
                            <Route path="/strategist/tie-breaker" element={<TieBreakerPage />} />
                            <Route path="/strategist/decision" element={<DecisionGatePage />} />

                            {/* Dashboard */}
                            <Route path="/parent-dashboard" element={
                                <ProtectedRoute>
                                    <ParentDashboardPage />
                                </ProtectedRoute>
                            } />
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <DashboardLayout />
                                </ProtectedRoute>
                            }>
                                {/* Main Dashboard Home with nested tab views */}
                                <Route index element={<DashboardPage><ChecklistView /></DashboardPage>} />
                                <Route path="checklist" element={<DashboardPage><ChecklistView /></DashboardPage>} />
                                <Route path="timeline" element={<DashboardPage><TimelineView /></DashboardPage>} />
                                <Route path="weekly" element={<DashboardPage><WeeklyPlanView /></DashboardPage>} />
                                <Route path="milestones" element={<DashboardPage><MilestonesView /></DashboardPage>} />

                                {/* Other dashboard pages */}
                                <Route path="explore" element={<ExplorePage />} />
                                <Route path="pathway/:pathwayId" element={<PathwayDetailPage />} />
                                <Route path="universities" element={<UniversitiesPage />} />
                                <Route path="profile" element={<ProfilePage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </AppProvider>
            </I18nProvider>
        </ThemeProvider>
    );
}

export default App;
