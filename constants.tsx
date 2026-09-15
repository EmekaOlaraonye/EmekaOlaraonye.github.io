import {
  PipelineStage,
  ToolGroup,
  Affiliation,
  Experience,
  Education,
  Achievement,
  Certification,
  Talk,
  Leadership,
  Project,
  Research
} from './types';

/*
  The stack presented as the path a model actually takes to reach a user,
  rather than an alphabetised list of technologies. The stage a piece of work
  belongs to says more to an employer than the tool's name on its own.
*/
export const STACK_PIPELINE: PipelineStage[] = [
  {
    num: '01',
    name: 'Data',
    what: 'Collect it, clean it, and find out what is actually in it.',
    tools: ['Pandas', 'NumPy', 'SQL', 'Matplotlib / Seaborn', 'R / SPSS', 'Power BI']
  },
  {
    num: '02',
    name: 'Model',
    what: 'Learn the interaction, then prove it beats the baseline.',
    tools: ['Neural Collaborative Filtering', 'Recommender Systems', 'Embedding Models', 'HR@K / NDCG@K'],
    highlight: true
  },
  {
    num: '03',
    name: 'Serve',
    what: 'Put it behind an API that holds its trust boundary.',
    tools: ['Node.js', 'Fastify / Express', 'REST API Design', 'Firestore', 'Firebase Auth']
  },
  {
    num: '04',
    name: 'Interface',
    what: 'Make the output something a person can act on.',
    tools: ['React', 'TypeScript', 'Vite', 'HTML5 / CSS']
  },
  {
    num: '05',
    name: 'Ship',
    what: 'Get it running somewhere real, repeatably.',
    tools: ['Docker', 'Google Cloud Run', 'AWS', 'Kubernetes']
  }
];

export const TOOL_GROUPS: ToolGroup[] = [
  { label: 'languages', items: ['Python', 'Java', 'JavaScript / TypeScript', 'LaTeX'] },
  { label: 'spoken', items: ['English', 'Setswana', 'French'] }
];

/* Sits in the band under the hero. Deliberately not the GPA and award figures
   - those already appear as tiles in the About section - but the places the
   work actually happened, which nothing else on the page states. */
export const AFFILIATIONS: Affiliation[] = [
  { name: 'BIUST', role: 'msc researcher · teaching assistant' },
  { name: 'Spectrum Analytics', role: 'data analytics intern' },
  { name: 'Google Developer Club', role: 'events & workshop lead' },
  { name: 'Orange Digital Champions', role: 'hackathon finalist' }
];

export const RESEARCH: Research = {
  title: 'Advancing E-Commerce Recommendation Systems with Neural Collaborative Filtering',
  status: 'MSc research in progress',
  field: 'Recommender Systems / Deep Learning',
  question:
    'Classical matrix factorization scores a user against an item with a fixed inner product. How much recommendation quality is left on the table by that assumption, and what does a learned interaction function recover in a real e-commerce setting?',
  approach:
    'Replace the fixed inner product with a neural interaction function over learned user and item embeddings, then benchmark it against matrix factorization baselines on implicit feedback using top-N ranking metrics.',
  why:
    'E-commerce catalogues are long-tailed and feedback is overwhelmingly implicit — clicks and purchases, not ratings. Gains in ranking quality at the top of the list translate directly into discovery for items that classical methods bury.',
  methods: [
    'Neural Collaborative Filtering',
    'Matrix Factorization baselines',
    'Implicit feedback modelling',
    'User / item embedding learning',
    'Top-N ranking evaluation (HR@K, NDCG@K)',
    'Python data stack'
  ]
};

export const EXPERIENCES: Experience[] = [
  {
    role: 'Teaching Assistant',
    company: 'Botswana International University of Science & Technology',
    period: 'Aug 2024 - Present',
    description: [
      'Lead tutorial and discussion sessions that translate lecture theory into worked problems students can actually apply.',
      'Grade assignments, exams, and projects against established rubrics to keep evaluation consistent across a large cohort.',
      'Hold weekly office hours and support lab sessions, guiding students through practical exercises one-on-one.',
      'Prepare instructional material — handouts, quizzes, and slide decks — used across the course.',
      'Give constructive feedback aimed at closing the specific gap in a student\'s understanding, not just marking the answer.'
    ]
  },
  {
    role: 'Data Analytics Intern',
    company: 'Spectrum Analytics Corp',
    period: 'May 2023 - Aug 2023',
    description: [
      'Built data-driven reports and interactive dashboards that senior staff used to support live decision-making.',
      'Handled collection, cleaning, analysis, and documentation across multiple concurrent client projects.',
      'Researched industry trends and emerging technology to inform strategic planning and analytical recommendations.'
    ]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    degree: 'MSc Computer Science',
    institution: 'Botswana International University of Science & Technology',
    period: 'Aug 2024 - Present',
    details: 'Research focus on deep learning for recommender systems, specifically neural collaborative filtering for e-commerce.'
  },
  {
    degree: 'BSc Computer Science & Software Engineering',
    institution: 'Botswana International University of Science & Technology',
    period: 'Aug 2020 - May 2024',
    gpa: '4.42 / 5.00',
    details: 'First Class Honours. Awarded 1st place for the best final year project in the department.'
  },
  {
    degree: 'IGCSE (Result: 46 Points)',
    institution: 'Livingstone Kolobeng College',
    period: 'Jan 2015 - Nov 2019',
    details: 'Foundation in advanced science and mathematics.'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Data Analytics and Visualization',
    issuer: 'Infnova Technologies',
    date: 'Jul 2026',
    status: 'Completed',
    description: 'Python-based data wrangling, exploratory analysis, and visual storytelling with Pandas, NumPy, and Matplotlib.'
  },
  {
    title: 'Online Leadership Course',
    issuer: 'MCW Global',
    date: 'Nov 2024',
    status: 'Completed',
    description: 'Modern leadership, mental health, gender inclusion, vision planning, self-awareness, and workshop design.',
    details: [
      'Completed a comprehensive leadership program covering modern leadership, mental health, gender inclusion, vision planning, and self-awareness.',
      'Designed and facilitated workshop frameworks focused on practical communication and team impact.'
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: '1st Place, Best Final Year Project',
    year: '2024',
    description: 'Recognised for the most outstanding project in the Department of Computer Science and Information Systems.'
  },
  {
    title: 'Finalist, Orange Digital Champion’s Hackathon',
    year: '2023',
    description: 'Selected as a finalist in the Gaborone circuit for solutions addressing real challenges in the African digital landscape.'
  },
  {
    title: 'Finalist, BIUST Annual Hackathon',
    year: '2021',
    description: 'Prototyped and pitched a working solution under time-constrained, high-pressure competitive conditions.'
  }
];

export const PROJECTS: Project[] = [
  {
    title: 'Tickety API',
    year: '2026',
    description:
      'The backend for a ticketing platform — everything too sensitive to trust to a browser or a phone: account creation, role authorization, event catalogue administration, and sales reporting.',
    tags: ['Backend', 'Auth', 'Cloud'],
    stack: ['Fastify', 'Node.js', 'Firestore', 'Firebase Auth', 'Cloud Run', 'Docker'],
    problem:
      'Flutter and React clients needed direct Firebase access for speed, but administrative operations and ticket secrets cannot be exposed to code running on a user’s device.',
    constraint:
      'The mobile apps still talk to Firebase directly for limited reads, so the security model had to work alongside client access rather than replace it.',
    decision:
      'Built a tiered model: this service is the only thing permitted to set custom claims, authentication runs pre-parsing, and every route declares a response schema so sensitive fields are stripped before they can leak.',
    impact:
      'Role-based access is enforced server-side across three tiers — admin, organizer, and scanner — with clients unable to escalate their own privileges.',
    highlights: [
      'Three role tiers with server-issued custom claims',
      'RFC 9457 problem+json error responses',
      'Cursor-based pagination and per-route response schemas',
      'Containerised and deployed on Google Cloud Run'
    ],
    repo: 'https://github.com/EmekaOlaraonye/tickety-api'
  },
  {
    title: 'Motora',
    year: '2026',
    description:
      'A customer-facing marketplace for used cars in Gaborone — browse listings from local garages and dealers, compare options side by side, and contact the seller directly.',
    tags: ['React', 'TypeScript', 'Product'],
    image: 'motora',
    stack: ['React', 'Vite', 'TypeScript', 'Firebase', 'CSS Modules', 'Edge middleware'],
    problem:
      'Buying a used car locally meant chasing scattered listings with no way to compare vehicles or judge what a car actually costs per month.',
    constraint:
      'Most discovery happens through WhatsApp shares, so a pasted link had to render a proper preview — and the data layer had to stay swappable while the real API was still being built.',
    decision:
      'Enforced a rule that no UI component knows where its data comes from: a repository abstraction lets mock data and the live API swap without touching a single component, and link metadata is generated server-side.',
    impact:
      'Shareable, filter-persisted search URLs and a finance estimator put comparison and affordability in front of the buyer before they ever contact a seller.',
    highlights: [
      'Repository abstraction — components are unaware of the data source',
      'URL-persisted filters, so any search is shareable',
      'Side-by-side comparison of up to 4 vehicles with difference highlighting',
      'Monthly repayment estimator with deposit, term, and balloon payment',
      'Server-side link previews with image optimisation and JSON-LD'
    ],
    repo: 'https://github.com/EmekaOlaraonye/motora-customer'
  },
  {
    title: 'Tsoo…13',
    year: '2026',
    description:
      'The public marketing site for The 13 Way, an agricultural venture — built to give the operation a credible front door and explain what it does to people who have never heard of it.',
    tags: ['Web', 'Agriculture', 'Marketing'],
    image: 'tsoo13',
    stack: ['JavaScript', 'Vercel'],
    problem:
      'The venture had no public presence, which made it harder to reach partners, buyers, and anyone evaluating it from the outside.',
    constraint:
      'It had to load fast on mobile data and stay editable by people who are not developers.',
    decision:
      'Kept the stack deliberately small and shipped to Vercel so the site is cheap to host, quick to update, and fast on a phone.',
    impact:
      'Gives the operation a live, shareable presence that communicates what it does without a meeting.',
    highlights: [
      'Deployed and live on Vercel',
      'Mobile-first, built for low-bandwidth conditions'
    ],
    repo: 'https://github.com/EmekaOlaraonye/tsoo13app',
    demo: 'https://13way-app.vercel.app'
  }
];

export const TALKS: Talk[] = [
  {
    title: 'Thriving in the Age of AI: Skills and Mindsets Every Graduate Needs',
    venue: 'Service Excellence Mentorship Programme, Gaborone',
    date: 'October 2025',
    description:
      'A session on how AI is reshaping the modern workplace and graduate career paths — which technical, professional, and adaptive skills actually matter in an AI-driven environment, and how to build the habit of continuous learning around them.'
  }
];

export const LEADERSHIP: Leadership[] = [
  {
    role: 'Guest Speaker',
    organization: 'CT Graduate Conference, Smart Xcellence (2025)',
    description: 'Spoke to graduating students on navigating technology careers in an AI-driven job market.'
  },
  {
    role: 'Mentor',
    organization: 'Service Xcellence Mentorship Programme (2024)',
    description: 'Mentoring graduates on future-focused mindsets, technical skill-building, and career direction.'
  },
  {
    role: 'Vice President',
    organization: 'BIUST Innovations Club (2023)',
    description: 'Drove club strategy and project initiatives for the student innovation body.'
  },
  {
    role: 'Events and Workshop Lead',
    organization: 'Google Student Developer Club (2023)',
    description: 'Organised technical workshops and community learning sessions for student developers.'
  }
];

