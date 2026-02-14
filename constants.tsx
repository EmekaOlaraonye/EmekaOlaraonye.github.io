
import React from 'react';
import { 
  Code, 
  Layout, 
  Database, 
  Cloud, 
  Globe, 
  Trophy, 
  Mic, 
  Users,
  Terminal,
  Server,
  Cpu
} from 'lucide-react';
import { Skill, Experience, Education, Achievement, Talk, Leadership, Project } from './types';

export const SKILLS: Skill[] = [
  { name: 'Python', category: 'Programming' },
  { name: 'Java', category: 'Programming' },
  { name: 'JavaScript', category: 'Programming' },
  { name: 'LaTeX', category: 'Programming' },
  { name: 'React', category: 'Frontend' },
  { name: 'HTML5', category: 'Frontend' },
  { name: 'Express', category: 'Backend' },
  { name: 'REST API', category: 'Backend' },
  { name: 'AWS', category: 'DevOps & Cloud' },
  { name: 'Docker', category: 'DevOps & Cloud' },
  { name: 'Kubernetes', category: 'DevOps & Cloud' },
  { name: 'English', category: 'Languages' },
  { name: 'Setswana', category: 'Languages' },
  { name: 'French', category: 'Languages' },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Teaching Assistant',
    company: 'Botswana International University of Science & Technology',
    period: 'Aug 2024 - Present',
    description: [
      'Led tutorial and discussion sessions to reinforce lecture material and support student learning.',
      'Graded assignments, exams, and projects in accordance with established rubrics to ensure consistent evaluation.',
      'Held weekly office hours to assist students with coursework and address questions.',
      'Supported lab sessions by guiding students through practical exercises and clarifying key concepts.',
      'Prepared instructional materials including handouts, quizzes, and presentation slides.'
    ]
  },
  {
    role: 'Intern',
    company: 'Spectrum Analytics Corp',
    period: 'May 2021 - Aug 2021',
    description: [
      'Created data driven reports and interactive dashboards to support decision-making, ensuring accuracy, clarity, and alignment with project goals.',
      'Support senior analysts in projects with data collection, cleaning, analysis, and documentation across various projects.',
      'Research industry trends, market developments, and emerging technologies to provide insights that inform strategic planning.'
    ]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: 'MSc Computer Science',
    institution: 'Botswana International University of Science & Technology',
    period: 'Aug 2024 - Present',
    details: 'Pursuing advanced research in Artificial Intelligence and computational systems.'
  },
  {
    degree: 'BSc Computer Science & Software Engineering',
    institution: 'Botswana International University of Science & Technology',
    period: 'Aug 2020 - May 2024',
    gpa: '4.42 / 5.00',
    details: 'Graduated with First Class Honors. Core focus on system architecture and high-quality software solutions.'
  },
  {
    degree: 'IGCSE (Result: 46 Points)',
    institution: 'Livingstone Kolobeng College',
    period: 'Jan 2015 - Nov 2019',
    details: 'Foundation in advanced science and mathematics.'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: '1st Place, Best Final Year Project',
    year: '2024',
    description: 'Recognized for the most outstanding project in the department of Computer Science and Information Systems.'
  },
  {
    title: 'Finalist, Orange Digital Champion’s Hackathon',
    year: '2023',
    description: 'Selected as a finalist for innovative solution development in the Gaborone circuit.'
  },
  {
    title: 'Finalist, BIUST Annual Hackathon',
    year: '2021',
    description: 'Rapidly prototyped and presented a functional solution under high-pressure competitive conditions.'
  }
];

export const PROJECTS: Project[] = [
  {
    title: 'The 13 Way',
    description: 'An architectural exploration of sophisticated design patterns and algorithmic optimization in modern software engineering.',
    tags: ['Python', 'Architecture', 'Research'],
    link: 'https://github.com/EmekaOlaraonye/The-13-Way'
  },
  {
    title: 'Lekhuku School Portal',
    description: 'A comprehensive digital management system built to streamline administrative workflows and student engagement.',
    tags: ['React', 'Fullstack', 'Education'],
    link: 'https://github.com/EmekaOlaraonye/Lekhuku-Secondary-School'
  },
  {
    title: 'Orange Africa ODC Hackathon',
    description: 'Collaborated with a team to develop solutions addressing real-world challenges in the African digital landscape.',
    tags: ['Hackathon', 'Problem Solving', 'Innovation'],
    link: 'https://github.com/EmekaOlaraonye'
  }
];

export const TALKS: Talk[] = [
  {
    title: 'Thriving in the Age of AI: Skills and Mindsets Every Graduate Needs',
    description: 'Delivered an engaging session at the Service Excellence Mentorship Programme on the impact of AI on the modern workplace.'
  }
];

export const LEADERSHIP: Leadership[] = [
  {
    role: 'Vice President',
    organization: 'BIUST Innovations Club (2023)',
    description: 'Drove club strategy and project initiatives for the student body in Botswana.'
  },
  {
    role: 'Events and Workshop Lead',
    organization: 'Google Student Developer Club (2023)',
    description: 'Organized technical workshops and community learning sessions.'
  },
  {
    role: 'Mentor & Guest Speaker',
    organization: 'Service Xcellence Mentorship / CT Graduate Conference',
    description: 'Providing guidance to future-focused mindsets and sharing technical expertise with graduates.'
  }
];

export const CATEGORY_ICONS = {
  'Programming': <Terminal size={20} className="text-brand group-hover:text-white transition-colors duration-300" />,
  'Frontend': <Layout size={20} className="text-brand group-hover:text-white transition-colors duration-300" />,
  'Backend': <Server size={20} className="text-brand group-hover:text-white transition-colors duration-300" />,
  'DevOps & Cloud': <Cloud size={20} className="text-brand group-hover:text-white transition-colors duration-300" />,
  'Languages': <Globe size={20} className="text-brand group-hover:text-white transition-colors duration-300" />,
};
