export interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  profileImage?: string;
  enrolledClasses: string[];
  faceData?: string; // Simulated face encoding data
  totalAttendance: number;
  lastAttended?: string;
}

export interface Class {
  id: string;
  name: string;
  code: string;
  instructor: string;
  schedule: ClassSchedule[];
  totalSessions: number;
  studentsEnrolled: number;
}

export interface ClassSchedule {
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  timestamp: string;
  status: 'present' | 'late' | 'absent';
  confidence: number; // Face recognition confidence
  method: 'facial-recognition' | 'manual';
}

export interface AttendanceSession {
  id: string;
  classId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'completed' | 'scheduled';
  attendees: AttendanceRecord[];
}