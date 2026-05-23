import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';

const firebaseConfig = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const data = {
  hero: {
    title: "John Doe",
    subtitle: " ",
    about: "A passionate software engineer with experience in full-stack web development and mobile applications. Skilled in modern frameworks and dedicated to building scalable, user-centered solutions."
  },
  projects: [
    {
      id: '1',
      title: 'Task Manager Pro',
      category: 'Fullstack Web Development',
      date: 'Jan 2024 - Present',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
      description: 'A collaborative task management platform with real-time updates, role-based access control, and team workspaces. Built with Laravel, React, and PostgreSQL.',
      liveUrl: '',
      codeUrl: '',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop', title: 'Dashboard Overview', description: 'Main dashboard showing task boards and team activity.' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop', title: 'Kanban Board', description: 'Drag-and-drop Kanban board for task organization.' }
      ]
    },
    {
      id: '2',
      title: 'FoodieConnect',
      category: 'Mobile Development',
      date: 'Mar 2023 - Dec 2023',
      image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000&auto=format&fit=crop',
      description: 'A social food discovery app connecting local restaurants with food enthusiasts. Features real-time chat, reviews, and personalized recommendations.',
      liveUrl: '',
      codeUrl: '',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000&auto=format&fit=crop', title: 'Restaurant Feed', description: 'Browse nearby restaurants with ratings and reviews.' }
      ]
    },
    {
      id: '3',
      title: 'E-Commerce Storefront',
      category: 'Fullstack Web Development',
      date: 'Jun 2023 - Oct 2023',
      image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=1000&auto=format&fit=crop',
      description: 'A modern e-commerce platform with product catalog, shopping cart, payment integration, and admin inventory management. Built with Next.js and Stripe.',
      liveUrl: '',
      codeUrl: '',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=1000&auto=format&fit=crop', title: 'Product Listing', description: 'Product catalog with filtering and search.' }
      ]
    },
    {
      id: '4',
      title: 'WeatherNow',
      category: 'Mobile Development',
      date: 'Aug 2022',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1000&auto=format&fit=crop',
      description: 'A weather forecast app with location-based alerts, interactive maps, and 7-day forecasts. Built with Kotlin and OpenWeather API.',
      liveUrl: '',
      codeUrl: '',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1000&auto=format&fit=crop', title: 'Forecast View', description: 'Daily and weekly weather forecast display.' }
      ]
    },
    {
      id: '5',
      title: 'BlogPlatform API',
      category: 'Backend Development',
      date: 'Feb 2023 - Apr 2023',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
      description: 'A RESTful API service for a blogging platform with authentication, pagination, and content moderation. Built with Node.js, Express, and MongoDB.',
      liveUrl: '',
      codeUrl: '',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop', title: 'API Documentation', description: 'Swagger API docs for all endpoints.' }
      ]
    }
  ],
  experiences: [
    {
      id: 'e1',
      company: 'TechCorp Solutions',
      role: 'Full Stack Developer',
      period: 'Jan 2024 - Present',
      location: 'Jakarta',
      description: [
        'Developed and maintained web applications using Laravel and React for enterprise clients.',
        'Built RESTful APIs serving 10,000+ daily active users with optimized database queries.',
        'Implemented CI/CD pipelines reducing deployment time by 40%.'
      ],
      media: [
        { type: 'image', url: 'https://picsum.photos/seed/corp/800/600', title: 'Office', description: 'TechCorp Solutions headquarters.' }
      ]
    },
    {
      id: 'e2',
      company: 'StartupHub',
      role: 'Frontend Developer',
      period: 'Jun 2023 - Dec 2023',
      location: 'Bandung',
      description: [
        'Built responsive user interfaces using React and Tailwind CSS for a SaaS product.',
        'Collaborated with designers to implement pixel-perfect UI components.',
        'Improved page load performance by 35% through code splitting and lazy loading.'
      ]
    },
    {
      id: 'e3',
      company: 'Freelance',
      role: 'Freelance Developer',
      period: 'Jan 2022 - May 2023',
      location: 'Remote',
      description: [
        'Delivered 15+ projects for clients including e-commerce sites, landing pages, and mobile apps.',
        'Specialized in rapid prototyping and MVP development for startups.'
      ]
    }
  ],
  education: [
    {
      id: 'edu1',
      institution: 'University of Technology',
      degree: "Bachelor's Degree, Computer Science",
      period: 'Aug 2019 - Jan 2024',
      description: ['Graduated with honors. Focused on software engineering and distributed systems.']
    }
  ],
  skills: [
    { category: 'Web Development', items: ['Laravel', 'React', 'Next.js', 'Vue', 'Tailwind CSS', 'Node.js', 'Express', 'ASP.NET Core', 'RESTful APIs'] },
    { category: 'Mobile Development', items: ['Android Native', 'React Native', 'Kotlin', 'Java', 'Flutter'] },
    { category: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Redis'] },
    { category: 'Tools & Practices', items: ['Git & GitHub', 'Docker', 'CI/CD', 'Agile / Scrum', 'OOP', 'Clean Architecture'] }
  ],
  languages: [
    { name: 'English', proficiency: 'Intermediate' },
    { name: 'Indonesian', proficiency: 'Native' }
  ],
  certifications: [
    {
      id: 'c1',
      title: 'Certified Web Developer',
      issuer: 'Google',
      media: [
        { type: 'image', url: 'https://picsum.photos/seed/cert1/800/600', title: 'Certificate', description: 'Google Certified Web Developer.' }
      ]
    },
    {
      id: 'c2',
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon',
      media: [
        { type: 'image', url: 'https://picsum.photos/seed/cert2/800/600', title: 'Certificate', description: 'AWS Cloud Practitioner certification.' }
      ]
    }
  ],
  awards: [
    {
      id: 'a1',
      title: '1st Place - University Hackathon 2023',
      date: '2023',
      media: [
        { type: 'image', url: 'https://picsum.photos/seed/award1/800/600', title: 'Hackathon Trophy', description: 'Won first place in a 48-hour university hackathon.' }
      ]
    },
    {
      id: 'a2',
      title: 'Dean\'s List - Fall 2022',
      date: '2022',
      media: [
        { type: 'image', url: 'https://picsum.photos/seed/award2/800/600', title: 'Dean\'s List Certificate', description: 'Recognized for academic excellence.' }
      ]
    }
  ],
  config: {
    chatSecretWord: "open admin"
  }
};

const docRef = doc(db, 'content', 'main');
const existing = await getDoc(docRef);

if (existing.exists()) {
  console.log('Document already exists at content/main. Skipping to avoid overwriting data.');
  process.exit(0);
}

console.log('No existing document found. Writing dummy seed data to content/main...');
await setDoc(docRef, data);
console.log('Dummy data populated successfully!');

const verify = await getDoc(docRef);
if (verify.exists()) {
  const d = verify.data();
  console.log('Verification:');
  console.log(`  Hero: ${d.hero?.title}`);
  console.log(`  Projects: ${d.projects?.length}`);
  console.log(`  Experiences: ${d.experiences?.length}`);
  console.log(`  Education: ${d.education?.length}`);
  console.log(`  Skills: ${d.skills?.length}`);
  console.log(`  Languages: ${d.languages?.length}`);
  console.log(`  Awards: ${d.awards?.length}`);
  console.log(`  Certifications: ${d.certifications?.length}`);
}

process.exit(0);
