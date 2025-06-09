import React, { useState } from 'react';
import { Calendar, Download, Filter, Search, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { mockStudents, mockClasses } from '../data/mockData';

const AttendanceHistory: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock attendance data
  const attendanceData = [
    {
      id: '1',
      date: '2025-01-20',
      time: '10:05',
      className: 'Computer Science Fundamentals',
      classCode: 'CS101',
      studentName: 'Alice Johnson',
      studentId: 'STU001',
      status: 'present',
      confidence: 95,
      method: 'facial-recognition'
    },
    {
      id: '2',
      date: '2025-01-20',
      time: '10:10',
      className: 'Computer Science Fundamentals',
      classCode: 'CS101',
      studentName: 'Bob Smith',
      studentId: 'STU002',
      status: 'late',
      confidence: 89,
      method: 'facial-recognition'
    },
    {
      id: '3',
      date: '2025-01-19',
      time: '14:05',
      className: 'Data Structures & Algorithms',
      classCode: 'CS201',
      studentName: 'Carol Davis',
      studentId: 'STU003',
      status: 'present',
      confidence: 92,
      method: 'facial-recognition'
    },
    {
      id: '4',
      date: '2025-01-19',
      time: '14:35',
      className: 'Data Structures & Algorithms',
      classCode: 'CS201',
      studentName: 'David Wilson',
      studentId: 'STU004',
      status: 'late',
      confidence: 87,
      method: 'facial-recognition'
    },
  ];

  const filteredData = attendanceData.filter(record => {
    const matchesClass = selectedClass === 'all' || record.classCode === selectedClass;
    const matchesDate = !selectedDate || record.date === selectedDate;
    const matchesSearch = !searchTerm || 
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesClass && matchesDate && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'present':
        return `${baseClasses} bg-green-100 text-green-700`;
      case 'late':
        return `${baseClasses} bg-orange-100 text-orange-700`;
      case 'absent':
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Time', 'Class', 'Student Name', 'Student ID', 'Status', 'Confidence', 'Method'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(record => [
        record.date,
        record.time,
        `${record.className} (${record.classCode})`,
        record.studentName,
        record.studentId,
        record.status,
        `${record.confidence}%`,
        record.method.replace('-', ' ')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_history_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance History</h1>
          <p className="text-gray-600 mt-2">View and export attendance records</p>
        </div>
        <button
          onClick={exportToCSV}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Classes</option>
              {mockClasses.map((cls) => (
                <option key={cls.id} value={cls.code}>{cls.code} - {cls.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Student</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or student ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{filteredData.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Present</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredData.filter(r => r.status === 'present').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Late</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredData.filter(r => r.status === 'late').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <Filter className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(filteredData.reduce((sum, r) => sum + r.confidence, 0) / filteredData.length || 0)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>
                      <div className="font-medium text-gray-900">{record.date}</div>
                      <div className="text-gray-500">{record.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>
                      <div className="font-medium text-gray-900">{record.className}</div>
                      <div className="text-blue-600">{record.classCode}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div>
                      <div className="font-medium text-gray-900">{record.studentName}</div>
                      <div className="text-gray-500">{record.studentId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={getStatusBadge(record.status)}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <div className="w-12 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${record.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-900 font-medium">{record.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="capitalize">{record.method.replace('-', ' ')}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
            <p className="text-gray-600">Try adjusting your filters or date range.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceHistory;