import React, { useState } from 'react';
import Navigation from './components/Navigation';
import CameraInterface from './components/CameraInterface';
import Dashboard from './components/Dashboard';
import StudentManagement from './components/StudentManagement';
import ClassManagement from './components/ClassManagement';
import AttendanceHistory from './components/AttendanceHistory';
import Settings from './components/Settings';
import { mockClasses } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClass, setSelectedClass] = useState(mockClasses[0]);

  const handleClassSelect = (classId: string) => {
    const cls = mockClasses.find(c => c.id === classId);
    if (cls) {
      setSelectedClass(cls);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return (
          <CameraInterface 
            selectedClass={selectedClass} 
            onClassSelect={handleClassSelect}
          />
        );
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentManagement />;
      case 'classes':
        return <ClassManagement />;
      case 'history':
        return <AttendanceHistory />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;