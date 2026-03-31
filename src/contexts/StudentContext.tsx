import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentData } from '../data';

interface StudentContextType {
  students: StudentData[];
  loading: boolean;
  error: string | null;
}

const StudentContext = createContext<StudentContextType>({
  students: [],
  loading: true,
  error: null,
});

export const useStudents = () => useContext(StudentContext);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/data/ringkasan.json');
        if (!response.ok) {
          throw new Error('Failed to fetch students data');
        }
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <StudentContext.Provider value={{ students, loading, error }}>
      {children}
    </StudentContext.Provider>
  );
};
