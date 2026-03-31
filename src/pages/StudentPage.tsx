import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import StudentContent from '../components/StudentContent';
import { useStudents } from '../contexts/StudentContext';

export default function StudentPage() {
  const { studentId } = useParams();
  const { students, loading, error } = useStudents();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading data: {error}
      </div>
    );
  }

  const data = students.find(s => s.id === studentId);
  
  if (!data) {
    return <Navigate to="/" replace />;
  }
  
  return <StudentContent data={data} />;
}
