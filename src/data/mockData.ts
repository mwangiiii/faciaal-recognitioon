import { Student, Class, AttendanceRecord, AttendanceSession } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    studentId: 'STU001',
    email: 'alice.johnson@university.edu',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    enrolledClasses: ['1', '2'],
    totalAttendance: 15,
    lastAttended: '2025-01-20T10:30:00Z',
    faceData: 'encoded_face_data_1'
  },
  {
    id: '2',
    name: 'Bob Smith',
    studentId: 'STU002',
    email: 'bob.smith@university.edu',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    enrolledClasses: ['1'],
    totalAttendance: 12,
    lastAttended: '2025-01-19T14:15:00Z',
    faceData: 'encoded_face_data_2'
  },
  {
    id: '3',
    name: 'Carol Davis',
    studentId: 'STU003',
    email: 'carol.davis@university.edu',
    profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    enrolledClasses: ['2'],
    totalAttendance: 18,
    lastAttended: '2025-01-20T09:00:00Z',
    faceData: 'encoded_face_data_3'
  },
  {
    id: '4',
    name: 'David Wilson',
    studentId: 'STU004',
    email: 'david.wilson@university.edu',
    profileImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    enrolledClasses: ['1', '2'],
    totalAttendance: 14,
    lastAttended: '2025-01-18T11:45:00Z',
    faceData: 'encoded_face_data_4'
  }
];

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Computer Science Fundamentals',
    code: 'CS101',
    instructor: 'Dr. Sarah Mitchell',
    schedule: [
      { day: 'Monday', startTime: '10:00', endTime: '11:30', room: 'Room A101' },
      { day: 'Wednesday', startTime: '10:00', endTime: '11:30', room: 'Room A101' },
      { day: 'Friday', startTime: '10:00', endTime: '11:30', room: 'Room A101' }
    ],
    totalSessions: 45,
    studentsEnrolled: 32
  },
  {
    id: '2',
    name: 'Data Structures & Algorithms',
    code: 'CS201',
    instructor: 'Prof. Michael Chen',
    schedule: [
      { day: 'Tuesday', startTime: '14:00', endTime: '15:30', room: 'Room B205' },
      { day: 'Thursday', startTime: '14:00', endTime: '15:30', room: 'Room B205' }
    ],
    totalSessions: 30,
    studentsEnrolled: 28
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    studentId: '1',
    classId: '1',
    timestamp: '2025-01-20T10:05:00Z',
    status: 'present',
    confidence: 0.95,
    method: 'facial-recognition'
  },
  {
    id: '2',
    studentId: '2',
    classId: '1',
    timestamp: '2025-01-20T10:10:00Z',
    status: 'late',
    confidence: 0.89,
    method: 'facial-recognition'
  }
];