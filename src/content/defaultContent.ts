export const defaultContent = {
  hero: {
    title: 'Kaizen Learning',
    subtitle: 'Learn faster and better with AI-guided lessons.',
    bullets: [
      'Generate tailored lessons in seconds.',
      'Adaptive difficulty from your progress.',
      'Actionable practice, not fluff.',
    ],
    primaryCta: 'Start',
    secondaryCta: 'See how it works',
  },
  howItWorks: [
    {
      title: 'Tell us your goal',
      text: 'Pick a topic, level, and deadline.',
    },
    {
      title: 'AI composes your path',
      text: 'We plan lessons + practice with spaced repetition.',
    },
    {
      title: 'You learn with feedback',
      text: 'Hints, checkpoints, and micro-quizzes adapt to you.',
    },
  ],
  benefits: {
    paragraph:
      'Traditional study wastes cycles on planning and searching. Kaizen focuses attention on high-yield tasks—sequenced, time-boxed, and explained when it matters.',
    items: [
      'Personalized difficulty curve',
      'Immediate, targeted feedback',
      'Built-in retention (spaced repetition)',
      'Fast lesson generation (seconds, not hours)',
      'Progress you can feel (metrics that matter)',
    ],
  },
  features: [
    {
      title: 'Lesson Generator',
      text: 'From a topic or syllabus, get a structured lesson with explanations, examples, and practice.',
    },
    {
      title: 'Adaptive Practice',
      text: 'Quizzes and tasks adapt in real time based on your mastery.',
    },
    {
      title: 'Project Mode',
      text: 'Turn goals into step-by-step plans with milestones.',
    },
    {
      title: 'Knowledge Map',
      text: 'See concept dependencies; fill gaps with targeted drills.',
    },
    {
      title: 'Export & Share',
      text: 'Export lessons to PDF/Markdown; share with teammates.',
    },
    {
      title: 'Integrations',
      text: '(Placeholder) Google Drive, Notion, LMS (coming soon).',
    },
  ],
  pricing: {
    tiers: [
      {
        name: 'Guest',
        priceText: 'Free',
        features: [
          'Limited lesson generation (1/day)',
          'No exports',
          'Basic analytics',
        ],
        cta: 'Start as Guest',
      },
      {
        name: 'Pro',
        priceText: '$9/mo',
        features: [
          'Higher generation quota',
          'Exports',
          'Spaced repetition scheduling',
          'Priority compute',
        ],
        cta: 'Go Pro',
      },
      {
        name: 'Team',
        priceText: '$29/user/mo',
        features: [
          'Seat-based pricing',
          'Shared libraries',
          'Admin analytics',
          'SSO (coming soon)',
        ],
        cta: 'Contact Sales',
      },
    ],
    note: 'Fair Use applies. Cancel anytime.',
  },
  security: {
    bullets: [
      'We store your lessons and progress to personalize your experience.',
      'You control your data: export and delete in one click.',
      'Transport encrypted (TLS). Data at rest encrypted on server.',
      'Minimal PII; email required for account. No sale of data.',
      'EU-friendly: supports GDPR rights (access, rectification, deletion).',
    ],
    miniFaq: [
      {
        q: 'Do you train on my private data?',
        a: 'No, content is isolated for your account; aggregate telemetry is anonymized for system quality.',
      },
    ],
  },
  demo: {
    title: 'Live Demo',
    subtitle: 'Safe placeholder',
    leftMockJson: '{\n  "goal": "Learn algebra",\n  "outline": ["Variables", "Equations"],\n  "lesson": "..."\n}',
    guestNote: 'Guest mode is rate-limited. Sign in for full features.',
  },
  testimonials: [
    {
      quote: 'Felt like having a coach in the page.',
      name: 'Alex P.',
      role: 'Student',
    },
    {
      quote: 'Cut my prep time in half.',
      name: 'Jamie L.',
      role: 'Teacher',
    },
    {
      quote: 'The adaptive drills are gold.',
      name: 'Casey R.',
      role: 'Engineer',
    },
  ],
  faq: [
    {
      q: 'What makes Kaizen different from generic chatbots?',
      a: 'It plans structured lessons and adapts to your performance.',
    },
    {
      q: 'Can I import my syllabus?',
      a: 'Yes, syllabus import is supported.',
    },
    {
      q: 'Does it work offline?',
      a: 'Core features require connectivity.',
    },
    {
      q: 'Do you support STEM and humanities?',
      a: 'Both, with subject-aware guidance.',
    },
    {
      q: 'What’s the refund policy?',
      a: 'Pro plans can be cancelled anytime with a prorated refund.',
    },
    {
      q: 'How are lessons evaluated?',
      a: 'We use checkpoints and mastery metrics.',
    },
  ],
  roadmap: [
    {
      title: 'Lesson v1',
      eta: 'Q1',
      text: 'Initial lesson generator release.',
    },
    {
      title: 'Adaptive Practice v2',
      eta: 'Q2',
      text: 'Richer quizzes and difficulty shaping.',
    },
    {
      title: 'Integrations',
      eta: 'Q3',
      text: 'Google Drive, Notion, LMS.',
    },
    {
      title: 'Team Admin & SSO',
      eta: 'Q4',
      text: 'Enterprise controls and single sign-on.',
    },
  ],
  finalCta: {
    primary: 'Start free as Guest',
    secondary: 'Book a demo',
    note: 'Building for schools and teams? Let’s talk.',
  },
};
