import React from 'react';
import { BarChart3, Users, Calendar, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { mockStudents, mockClasses } from '../data/mockData';

const Dashboard: React.FC = () => {
  const totalStudents = mockStudents.length;
  const totalClasses = mockClasses.length;
  const averageAttendance = Math.round(
    mockStudents.reduce((sum, student) => sum + student.totalAttendance, 0) / totalStudents
  );

  const todayAttendance = [
    { class: 'CS101', present: 28, total: 32, percentage: 87.5 },
    { class: 'CS201', present: 24, total: 28, percentage: 85.7 },
  ];

  const weeklyStats = [
    { day: 'Mon', attendance: 89 },
    { day: 'Tue', attendance: 92 },
    { day: 'Wed', attendance: 85 },
    { day: 'Thu', attendance: 88 },
    { day: 'Fri', attendance: 90 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your attendance overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Classes</p>
              <p className="text-3xl font-bold text-gray-900">{totalClasses}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">All classes active</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
              <p className="text-3xl font-bold text-gray-900">{averageAttendance}%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+5% from last week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sessions Today</p>
              <p className="text-3xl font-bold text-gray-900">6</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Clock className="h-4 w-4 text-blue-500 mr-1" />
            <span className="text-sm text-blue-600">2 in progress</span>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Attendance Trend</h3>
          <div className="space-y-4">
            {weeklyStats.map((stat, index) => (
              <div key={stat.day} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{stat.day}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${stat.attendance}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm font-medium text-gray-900">{stat.attendance}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Classes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Attendance</h3>
          <div className="space-y-4">
            {todayAttendance.map((item, index) => (
              <div key={item.class} className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{item.class}</h4>
                  <span className="text-sm font-medium text-gray-600">
                    {item.present}/{item.total}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Students */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recently Active Students</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockStudents.slice(0, 4).map((student) => (
            <div key={student.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
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
                <div className="flex items-center mt-1">
                  <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">
                    {student.totalAttendance} sessions
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;