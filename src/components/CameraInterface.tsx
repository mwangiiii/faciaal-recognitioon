import React, { useState, useEffect, useRef } from 'react';
import { Camera, CheckCircle, AlertCircle, Users, Clock } from 'lucide-react';
import { Student, Class } from '../types';
import { mockStudents, mockClasses } from '../data/mockData';

interface CameraInterfaceProps {
  selectedClass: Class | null;
  onClassSelect: (classId: string) => void;
}

const CameraInterface: React.FC<CameraInterfaceProps> = ({ selectedClass, onClassSelect }) => {
  const [isActive, setIsActive] = useState(false);
  const [detectedStudent, setDetectedStudent] = useState<Student | null>(null);
  const [recognitionStatus, setRecognitionStatus] = useState<'scanning' | 'recognized' | 'unknown'>('scanning');
  const [attendanceMarked, setAttendanceMarked] = useState<string[]>([]);
  const videoRef = useRef<HTMLDivElement>(null);

  // Simulate face detection every 3 seconds when camera is active
  useEffect(() => {
    if (!isActive || !selectedClass) return;

    const interval = setInterval(() => {
      // Simulate detecting different students
      const enrolledStudents = mockStudents.filter(s => 
        s.enrolledClasses.includes(selectedClass.id)
      );
      
      if (enrolledStudents.length > 0) {
        const randomStudent = enrolledStudents[Math.floor(Math.random() * enrolledStudents.length)];
        const confidence = Math.random() * 0.3 + 0.7; // 70-100% confidence
        
        if (confidence > 0.8) {
          setDetectedStudent(randomStudent);
          setRecognitionStatus('recognized');
          
          // Auto-mark attendance after 2 seconds
          setTimeout(() => {
            if (!attendanceMarked.includes(randomStudent.id)) {
              setAttendanceMarked(prev => [...prev, randomStudent.id]);
            }
            setDetectedStudent(null);
            setRecognitionStatus('scanning');
          }, 2000);
        } else {
          setRecognitionStatus('unknown');
          setTimeout(() => {
            setRecognitionStatus('scanning');
          }, 2000);
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, selectedClass, attendanceMarked]);

  const startCamera = () => {
    setIsActive(true);
    setAttendanceMarked([]);
  };

  const stopCamera = () => {
    setIsActive(false);
    setDetectedStudent(null);
    setRecognitionStatus('scanning');
  };

  const enrolledStudents = selectedClass 
    ? mockStudents.filter(s => s.enrolledClasses.includes(selectedClass.id))
    : [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Class Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Class</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockClasses.map((cls) => (
            <button
              key={cls.id}
              onClick={() => onClassSelect(cls.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedClass?.id === cls.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <h3 className="font-semibold text-gray-900">{cls.name}</h3>
              <p className="text-gray-600">{cls.code} • {cls.instructor}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{cls.studentsEnrolled} students</span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedClass && (
        <>
          {/* Camera Feed */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Live Camera Feed</h2>
                <div className="flex items-center space-x-3">
                  {!isActive ? (
                    <button
                      onClick={startCamera}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Start Camera</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopCamera}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      Stop Camera
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Camera Feed Simulation */}
              <div 
                ref={videoRef}
                className={`aspect-video bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center relative ${
                  isActive ? 'animate-pulse' : ''
                }`}
              >
                {!isActive ? (
                  <div className="text-center text-gray-400">
                    <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Camera feed will appear here</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-300">
                    <div className="absolute inset-4 border-2 border-green-400 rounded-lg opacity-60"></div>
                    <div className="absolute top-8 left-8 bg-green-500 text-white px-3 py-1 rounded text-sm">
                      Face Detection Active
                    </div>
                    {recognitionStatus === 'scanning' && (
                      <div className="animate-spin h-8 w-8 border-2 border-green-400 border-t-transparent rounded-full mx-auto"></div>
                    )}
                  </div>
                )}
              </div>

              {/* Recognition Overlay */}
              {isActive && detectedStudent && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                        <img 
                          src={detectedStudent.profileImage} 
                          alt={detectedStudent.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{detectedStudent.name}</h3>
                      <p className="text-gray-600">{detectedStudent.studentId}</p>
                      <div className="mt-4 flex items-center justify-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-green-600 font-medium">Attendance Marked</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Unknown Face Overlay */}
              {isActive && recognitionStatus === 'unknown' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                    <div className="text-center">
                      <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900">Unknown Face</h3>
                      <p className="text-gray-600">Student not recognized or not enrolled</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Attendance Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Attendance Status ({attendanceMarked.length}/{enrolledStudents.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledStudents.map((student) => {
                const isPresent = attendanceMarked.includes(student.id);
                return (
                  <div 
                    key={student.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      isPresent 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={student.profileImage} 
                          alt={student.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.studentId}</p>
                      </div>
                      {isPresent ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraInterface;