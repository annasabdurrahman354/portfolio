import { Project, Experience, Education, Certification, Award, Skill, Language } from './types';

export const PROJECTS: Project[] = [
  { 
    id: '1', 
    title: 'Generus ERP', 
    category: 'Fullstack Web Development', 
    date: '2024 - 2026', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    description: 'A multi-tenant ERP system supporting multiple Islamic boarding schools under a centralized foundation. Built with Laravel (Livewire, Filament) and React.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop', title: 'Dashboard Overview', description: 'The main administrative dashboard for managing multiple tenants.' }
    ]
  },
  { 
    id: '2', 
    title: 'SAYFINE', 
    category: 'Mobile Development', 
    date: '2021 - 2023', 
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000&auto=format&fit=crop',
    description: 'An Android application built with Java and Firebase that connects food sellers with customers through real-time chat, menu management, and ordering features.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000&auto=format&fit=crop', title: 'Order Management', description: 'Real-time order tracking and seller-customer communication.' }
    ]
  },
  { 
    id: '3', 
    title: 'CABBLE', 
    category: 'Mobile Development', 
    date: '2021 - 2023', 
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop',
    description: 'A Kotlin-based collaborative social platform designed to support open-source teamwork. Selected as Top 40 Finalist in a national startup competition.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop', title: 'Collaboration Hub', description: 'Interface for team members to collaborate on open-source projects.' }
    ]
  },
  { 
    id: '4', 
    title: 'LokaSee', 
    category: 'Mobile Development', 
    date: '2022', 
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
    description: 'A property listing application developed during the Bangkit Academy cohort. Implemented Clean Architecture, Kotlin, and Firebase.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop', title: 'Property Search', description: 'Real-time property search and filtering interface.' }
    ]
  },
  { 
    id: '5', 
    title: 'Wallet Codes', 
    category: 'Backend Development', 
    date: '2022', 
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
    description: 'Developed RESTful APIs for the Wallet Codes backend using C# and ASP.NET Core. Contributed to the admin panel using React.js.',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop', title: 'API Documentation', description: 'Structured API endpoints for secure transactions.' }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    company: 'Pondok Pesantren Walibarokah Kediri',
    role: 'Full Stack Engineer',
    period: 'Nov 2024 - Apr 2026',
    location: 'Kediri City',
    description: [
      'Led digital transformation by architecting web and mobile information systems for academic, financial, and administrative operations.',
      'Designed and implemented a multi-tenant ERP system ("Generus") using Laravel (Livewire, Filament) and React.',
      'Built scalable modules covering student management, finance, academic tracking, and IoT-based attendance systems (RFID smartcard integration).',
      'Developed RESTful APIs to support mobile apps, IoT devices, and external systems integration.'
    ],
    media: [
      {
        type: 'image',
        url: 'https://picsum.photos/seed/erp/800/600',
        title: 'Generus ERP Dashboard',
        description: 'The main dashboard of the multi-tenant ERP system built with Laravel and React.'
      }
    ]
  },
  {
    id: 'e2',
    company: 'Pondok Pesantren Walibarokah Kediri',
    role: 'ICT Teacher',
    period: 'Jan 2025 - Mar 2026',
    location: 'Kediri City',
    description: [
      'Taught ICT fundamentals to 10th-grade students, covering basic programming, computer systems, and digital literacy.',
      'Simplified complex technical concepts into structured, easy-to-understand learning materials.',
      'Mentored students in developing problem-solving and computational thinking skills.'
    ]
  },
  {
    id: 'e3',
    company: 'Freelance | Self-Employed',
    role: 'Freelance Mobile Developer',
    period: 'Nov 2021 - Dec 2023',
    location: 'Remote',
    description: [
      'Developed SAYFINE, an Android application built with Java and Firebase for food seller-customer connection.',
      'Implemented features including authentication, chat system, order management, and BMI calculator.',
      'Contributed to CABBLE, a Kotlin-based collaborative social platform.',
      'Selected as Top 40 Finalist in a national startup competition for CABBLE.'
    ],
    media: [
      {
        type: 'image',
        url: 'https://picsum.photos/seed/sayfine/800/600',
        title: 'SAYFINE App Interface',
        description: 'Real-time chat and menu management features in the SAYFINE Android app.'
      }
    ]
  },
  {
    id: 'e4',
    company: 'Bangkit Academy',
    role: 'Mobile Development Cohort',
    period: 'Jan 2022 - Aug 2022',
    location: 'Indonesia',
    description: [
      'Completed intensive Android development program covering Kotlin, Jetpack, and modern development best practices.',
      'Collaborated in an Agile team to develop "LokaSee", a property listing application.',
      'Implemented Clean Architecture principles and integrated Firebase and Google Cloud services.',
      'Earned the globally recognized Associate Android Developer (AAD) certification.'
    ],
    media: [
      {
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        title: 'Bangkit Completion Certificate',
        description: 'Official certificate for completing the Bangkit Academy Mobile Development program.'
      }
    ]
  },
  {
    id: 'e5',
    company: 'Forest Interactive',
    role: 'Software Engineer',
    period: 'Feb 2022 - June 2022',
    location: 'Malaysia',
    description: [
      'Developed RESTful APIs for the Wallet Codes backend using C# and ASP.NET Core.',
      'Contributed to the development of the Wallet Codes admin panel using React.js.',
      'Collaborated within a multinational development team gaining hands-on experience in enterprise workflows.'
    ]
  },
  {
    id: 'e6',
    company: 'Tradeasia International',
    role: 'IT Student Trainee',
    period: 'Feb 2022 - May 2022',
    location: 'Singapore',
    description: [
      'Analyzed and identified technical issues on the company website, delivering actionable SEO improvements.',
      'Applied On-Page and Off-Page SEO strategies to increase organic traffic and search engine ranking.',
      'Recognized with the "Best Individual Performance" award for outstanding analytical insights.'
    ]
  },
  {
    id: 'e7',
    company: 'Universitas Sebelas Maret',
    role: 'Assistant Lecturer of Digital System',
    period: 'Sep 2020 - Jan 2021',
    location: 'Surakarta',
    description: [
      'Prepared practical course materials and conducted engaging teaching activities for undergraduate students.',
      'Evaluated student performance and provided comprehensive grade reports to head lecturers.'
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    id: 'edu1',
    institution: 'Universitas Sebelas Maret',
    degree: "Bachelor's Degree, Computer Science",
    period: 'Aug 2019 - Dec 2023',
    description: ['Informatics graduate with a strong passion for software engineering.']
  }
];

export const SKILLS: Skill[] = [
  {
    category: 'Top Skills',
    items: ['Database Administration', 'Relational Databases', 'SQL']
  },
  {
    category: 'Web Development',
    items: ['Laravel', 'Filament PHP', 'Livewire', 'Inertia.js', 'React', 'Vue', 'TailwindCSS', 'ASP.NET Core (C#)', 'RESTful APIs']
  },
  {
    category: 'Mobile Development',
    items: ['Android Native', 'React Native', 'Kotlin', 'Java', 'Jetpack', 'Firebase']
  },
  {
    category: 'Others',
    items: ['SEO', 'Digital Product Optimization', 'Domain-Driven Design (DDD)', 'Object-Oriented Programming (OOP)']
  }
];

export const LANGUAGES: Language[] = [
  { name: 'English', proficiency: 'Limited Working' },
  { name: 'Indonesian', proficiency: 'Native or Bilingual' }
];

export const CERTIFICATIONS: Certification[] = [
  { 
    id: 'c1', 
    title: 'Associate Android Developer', 
    issuer: 'Google',
    media: [
      {
        type: 'image',
        url: 'https://picsum.photos/seed/android/800/600',
        title: 'AAD Certificate',
        description: 'Official certification from Google for Android Development.'
      }
    ]
  },
  { 
    id: 'c2', 
    title: 'Microsoft Technology Associate: Database Administration Fundamentals (MTA)', 
    issuer: 'Microsoft',
    media: [
      {
        type: 'image',
        url: 'https://picsum.photos/seed/database/800/600',
        title: 'MTA Certificate',
        description: 'Microsoft Technology Associate certification for Database Administration.'
      },
      {
        type: 'pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        title: 'MTA Transcript',
        description: 'Detailed transcript of the MTA certification exam.'
      }
    ]
  }
];

export const AWARDS: Award[] = [
  { 
    id: 'a1', 
    title: 'Finalist - Lomba Inovasi Digital Mahasiswa (LIDM) 2020: Division I', 
    date: '2020',
    media: [
      {
        type: 'image',
        url: 'https://picsum.photos/seed/award1/800/600',
        title: 'LIDM 2020 Finalist Certificate',
        description: 'Recognition as a finalist in the national digital innovation competition.'
      }
    ]
  },
  { 
    id: 'a2', 
    title: 'Best Individual Performance - Tradeasia International', 
    date: '2022',
    media: [
      {
        type: 'image',
        url: 'https://picsum.photos/seed/award2/800/600',
        title: 'Best Performance Award',
        description: 'Awarded for outstanding contribution and analytical insights during the internship.'
      }
    ]
  }
];
