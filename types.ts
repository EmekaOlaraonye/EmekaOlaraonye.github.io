
export interface Skill {
  name: string;
  category: 'Programming' | 'Frontend' | 'Backend' | 'DevOps & Cloud' | 'Languages';
  icon?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  details?: string;
}

export interface Achievement {
  title: string;
  year: string;
  description: string;
}

export interface Talk {
  title: string;
  description: string;
}

export interface Leadership {
  role: string;
  organization: string;
  description: string;
}

export interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
  problem: string;
  constraint: string;
  decision: string;
  impact: string;
  link?: string;
  image?: string;
}
