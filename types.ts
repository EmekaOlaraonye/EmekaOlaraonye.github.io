
export interface PipelineStage {
  /** Ordered label, e.g. "01". */
  num: string;
  name: string;
  /** One line on what actually happens at this stage. */
  what: string;
  tools: string[];
  /** Marks the stage the research sits in, highlighted in the UI. */
  highlight?: boolean;
}

export interface ToolGroup {
  label: string;
  items: string[];
}

export interface Affiliation {
  name: string;
  role: string;
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

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  /** Shown as a badge, e.g. "Completed". */
  status?: string;
  description: string;
  /** Optional longer breakdown, rendered as bullets when present. */
  details?: string[];
}

export interface Achievement {
  title: string;
  year: string;
  description: string;
}

export interface Talk {
  title: string;
  venue: string;
  date: string;
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
  stack: string[];
  problem: string;
  constraint: string;
  decision: string;
  impact: string;
  highlights: string[];
  repo?: string;
  demo?: string;
  image?: string;
}

export interface Research {
  title: string;
  status: string;
  field: string;
  question: string;
  approach: string;
  why: string;
  methods: string[];
}
