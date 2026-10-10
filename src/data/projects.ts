export type ProjectCategory =
  | 'Full Stack'
  | 'AI / Machine Learning'
  | 'Mobile Development'
  | 'Robotics / Embedded Systems'
  | 'UX / Frontend';

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  problem: string;
  approach: string;
  keyFeatures: string[];
  techStack: string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    slug: 'studymind',
    title: 'StudyMind',
    shortDescription: 'AI-powered study assistant that transforms notes and PDFs into flashcards, summaries, and practice questions.',
    description:
      'A full-stack study assistant that transforms notes and PDFs into flashcards, summaries, practice questions, and key concept breakdowns using the Anthropic Claude API. Built with a React frontend, FastAPI backend, and PostgreSQL database with JWT authentication.',
    problem:
      'Students spend a disproportionate amount of time reformatting notes rather than actually studying. There was no single tool that could ingest arbitrary document formats and produce structured study materials on demand.',
    approach:
      'Designed a layered architecture: a React frontend handles document uploads and study-set management, a FastAPI backend orchestrates Claude API calls and PDF parsing via PyMuPDF, and PostgreSQL stores user data and saved sets behind JWT authentication. Claude is prompted to produce structured JSON output for each study material type.',
    keyFeatures: [
      'PDF and plain-text ingestion via PyMuPDF',
      'AI-generated flashcards, summaries, practice questions, and concept breakdowns',
      'User authentication with JWT and persistent study sets',
      'React frontend with Tailwind CSS styling',
      'FastAPI backend with SQLAlchemy ORM',
    ],
    techStack: ['Python', 'FastAPI', 'React', 'Tailwind CSS', 'PostgreSQL', 'SQLAlchemy', 'Claude API', 'JWT', 'PyMuPDF'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/Hazmat-ai/StudyMind',
    featured: true,
    order: 1,
  },
  {
    slug: 'smart-write',
    title: 'Smart Write',
    shortDescription: 'Handwriting recognition app with a custom PyTorch CNN classifying 47 character classes.',
    description:
      'Co-developed a handwriting recognition project combining a React interface for drawing and image uploads with a custom PyTorch convolutional neural network. The model classifies handwritten characters across 47 output classes. Implemented image preprocessing for inference using grayscale conversion, normalization, and colour inversion, with saved model weights available for local predictions.',
    problem:
      'Handwriting recognition typically requires either expensive proprietary APIs or poorly documented open-source models. The goal was to build an end-to-end solution—from data preprocessing to a trained model to a usable web interface—as a learning exercise in the full ML pipeline.',
    approach:
      'Built a CNN with PyTorch and Torchvision trained on the EMNIST dataset covering 47 output classes. The React/Vite frontend provides a canvas for freehand drawing and file upload. Images are preprocessed (grayscale conversion, normalization, colour inversion) before being passed to the model for inference.',
    keyFeatures: [
      '47-class character classification (letters and digits)',
      'Custom CNN trained with PyTorch and Torchvision',
      'React + Vite frontend with canvas drawing interface',
      'Image preprocessing pipeline: grayscale, normalization, colour inversion',
      'Saved model weights for local inference',
    ],
    techStack: ['Python', 'PyTorch', 'Torchvision', 'Pillow', 'React', 'Vite', 'Tailwind CSS', 'Radix UI'],
    category: 'AI / Machine Learning',
    githubUrl: 'https://github.com/ManpreetSingh-345/Handwriting-Recognition',
    featured: true,
    order: 2,
  },
  {
    slug: 'campaign-os',
    title: 'campaignOS',
    shortDescription: 'AI-powered marketing campaign generator using the Claude API to produce structured campaign plans.',
    description:
      'Developed a marketing campaign generator that uses the Anthropic Claude API to transform campaign ideas and audience details into structured plans. Generated outputs include messaging, customer journeys, channel strategies, KPIs, and budget recommendations. Implemented tabbed results, campaign refinement, clipboard export, and browser-based storage for saved campaigns.',
    problem:
      'Marketing teams and independent creators often lack the resources to produce structured campaign strategies from scratch. The goal was a tool that could turn a brief description into a complete, actionable campaign plan instantly.',
    approach:
      'Used React with vanilla CSS for the frontend and the Claude API for generation. Campaign inputs are transformed into structured prompts that instruct Claude to produce a JSON-shaped response covering messaging, channels, KPIs, and budget. Results are displayed in a tabbed interface and persisted via browser localStorage.',
    keyFeatures: [
      'Claude API integration for structured campaign plan generation',
      'Outputs: messaging, customer journeys, channel strategies, KPIs, budget recommendations',
      'Tabbed result display with campaign refinement capability',
      'Clipboard export and browser-based localStorage persistence',
    ],
    techStack: ['React', 'JavaScript', 'HTML', 'CSS', 'Anthropic Claude API', 'localStorage'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/Hazmat-ai/Campaign-app',
    featured: true,
    order: 3,
  },
  {
    slug: 'asl-recognition',
    title: 'ASL Hand-Sign Recognition',
    shortDescription: 'Browser-based prototype recognizing static ASL hand shapes via MediaPipe and a geometric classifier.',
    description:
      'Built a browser-based prototype that recognizes selected static ASL hand shapes through a webcam using MediaPipe hand tracking and a custom geometric classifier. Implemented temporal smoothing, editable subtitles, and text-to-speech. Camera frames are processed locally in the browser—no data is sent to a server.',
    problem:
      'Accessibility tools for ASL recognition are often server-dependent and require significant latency. The goal was a fully client-side implementation that runs in the browser with no backend required.',
    approach:
      'MediaPipe Hands provides real-time hand landmark detection in the browser. A custom geometric classifier analyzes landmark positions and angles to identify specific static hand shapes. Temporal smoothing reduces jitter. The Web Speech API drives text-to-speech output.',
    keyFeatures: [
      'Real-time hand landmark detection via MediaPipe in the browser',
      'Custom geometric classifier for static ASL hand shapes',
      'Temporal smoothing to reduce recognition jitter',
      'Editable subtitles and Web Speech API text-to-speech',
      'Fully client-side: no server, no data sent externally',
    ],
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'MediaPipe', 'Web Speech API'],
    category: 'AI / Machine Learning',
    githubUrl: 'https://github.com/Hazmat-ai/ASL_Recognition',
    featured: true,
    order: 4,
  },
  {
    slug: 'fitforge',
    title: 'FitForge',
    shortDescription: 'iOS fitness app built with Swift and SwiftUI for workout planning, tracking, and nutrition.',
    description:
      'Developed an iOS fitness application using Swift and SwiftUI, combining workout planning, active workout tracking, and nutrition features. Implemented rule-based workout generation using fitness level, training goals, and selected muscle groups to produce exercise plans with sets, repetitions, and rest periods. Organized the application into reusable UI components, data models, and service layers.',
    problem:
      'Existing fitness apps are often overcomplicated or rely on subscription paywalls. The goal was a clean, opinionated iOS app that generates effective workout plans without requiring AI APIs or cloud dependencies.',
    approach:
      'Built entirely in Swift with SwiftUI for the UI layer. Workout generation uses rule-based logic keyed on fitness level, selected muscle groups, and training goals. The app is structured into UI components, data models, and service layers for maintainability.',
    keyFeatures: [
      'Rule-based workout generation by fitness level, goals, and muscle groups',
      'Active workout tracking with sets, reps, and rest timers',
      'Nutrition feature with food logging',
      'SwiftUI component architecture with data model and service layer separation',
    ],
    techStack: ['Swift', 'SwiftUI', 'Foundation', 'Swift Concurrency', 'iOS'],
    category: 'Mobile Development',
    githubUrl: 'https://github.com/Hazmat-ai/Workout-app',
    featured: true,
    order: 5,
  },
  {
    slug: 'arns-travel-system',
    title: 'ARNS Travel System',
    shortDescription: 'Java desktop application for travel planning and reservation management with a layered OOP architecture.',
    description:
      'Co-developed a Java desktop application for travel planning and reservation management as part of an Object-Oriented Programming course. Combined flight selection, reservations, accommodation, and destination activities within a Java Swing interface. Organized the application into GUI, model, service, and utility layers to separate interface logic from travel data and booking operations.',
    problem:
      'Needed to build a functional multi-feature desktop application as a team project demonstrating object-oriented design principles—layered architecture, encapsulation, and modular feature development.',
    approach:
      'Structured the application into four layers: GUI (Java Swing), model (data objects), service (business logic), and utility (helpers and file I/O). Team members worked on parallel feature branches—flights, reservations, accommodations, activities—then integrated through well-defined service interfaces.',
    keyFeatures: [
      'Flight selection, reservations, accommodation, and destination activities',
      'Java Swing GUI with light/dark mode and animations',
      'Layered architecture: GUI, model, service, utility',
      'Javadoc documentation and file-based data persistence',
    ],
    techStack: ['Java', 'Java Swing', 'OOP', 'File Handling', 'Javadoc', 'Eclipse IDE'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/Hazmat-ai/ARNS_Travel_System',
    featured: false,
    order: 6,
  },
  {
    slug: 'jetson-nano-robot',
    title: 'Jetson Nano Face Detection Robot',
    shortDescription: 'Robotics project combining a mobile chassis with Jetson Nano-powered face detection and age estimation.',
    description:
      'Contributed to a robotics project combining a mobile chassis with a camera-based computer vision system. Integrated a Jetson Nano and Raspberry Pi camera module to process live video for face detection and age estimation. Worked on mechanical assembly and embedded hardware integration to connect the robot\'s movement platform with its vision subsystem.',
    problem:
      'Building an autonomous robot that can detect and classify faces requires tightly coupling a real-time vision pipeline with embedded hardware constraints—low power, limited memory, and physical assembly challenges.',
    approach:
      'Used OpenCV on the Jetson Nano for real-time face detection and age estimation. The Raspberry Pi camera module feeds frames to the GPU-accelerated Jetson for inference. Hardware integration involved mounting the camera on the chassis and routing power and signal connections between the movement platform and the compute module.',
    keyFeatures: [
      'Real-time face detection and age estimation on the Jetson Nano GPU',
      'Raspberry Pi camera module integration',
      'Mobile chassis with motor control',
      'Hardware-software co-design: mechanical assembly and embedded integration',
    ],
    techStack: ['Python', 'OpenCV', 'NVIDIA Jetson Nano', 'Raspberry Pi Camera', 'Computer Vision', 'Embedded Systems'],
    category: 'Robotics / Embedded Systems',
    githubUrl: undefined,
    featured: true,
    order: 7,
  },
  {
    slug: 'tcp-converter',
    title: 'TCP Multi-Service Converter',
    shortDescription: 'Python TCP client–server application supporting concurrent currency, temperature, length, and weight conversions.',
    description:
      'Co-developed a TCP client–server application with Nicholas Sobolev for CP372, supporting currency, temperature, length, and weight conversions. Implemented a threaded server for concurrent clients and an interactive client supporting multiple requests per connection. Used a custom text protocol with request validation, formatted responses, and error handling. Currency conversions use fixed exchange rates.',
    problem:
      'Required a practical implementation of client–server networking concepts including socket programming, threading, custom protocols, and concurrent client handling.',
    approach:
      'Built a multithreaded TCP server in Python using the socket and threading modules. Each client connection is handled on a separate thread. A custom text protocol defines request formatting and response structure, with validation and error handling at both ends.',
    keyFeatures: [
      'Multithreaded TCP server handling concurrent client connections',
      'Currency, temperature, length, and weight conversion services',
      'Custom text protocol with request validation and error handling',
      'Interactive client with support for multiple requests per session',
      'Unit testing for conversion logic',
    ],
    techStack: ['Python', 'TCP/IP', 'Socket Programming', 'Multithreading', 'Client–Server Architecture', 'Unit Testing'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/Hazmat-ai/tcp-converter-2.0',
    featured: false,
    order: 8,
  },
  {
    slug: 'arm-cortex-simulator',
    title: 'ARM Cortex-M Sensor Simulator',
    shortDescription: 'Interactive browser simulator visualizing ARM Thumb polling loops and GPIO threshold alerts across Cortex-M variants.',
    description:
      'Co-developed an interactive browser simulator with Samuel Okegbile to demonstrate sensor acquisition and threshold alerts using an ARM Thumb polling loop. Visualized simulated ADC readings, instruction execution, and GPIO alerts, with interactive graphs comparing Cortex-M0, M0+, M3, and M4 configurations.',
    problem:
      'ARM Cortex-M architecture concepts—polling loops, ADC acquisition, GPIO alerts—are difficult to visualize without physical hardware. Needed an accessible, browser-based tool for learning and demonstration.',
    approach:
      'Built entirely in HTML and JavaScript with Chart.js for visualization. The simulator models the Cortex-M polling loop cycle by cycle, displaying simulated ADC readings against configurable thresholds and visualizing GPIO state transitions. Comparison graphs cover four Cortex-M variants.',
    keyFeatures: [
      'Interactive simulation of ARM Thumb polling loops',
      'Simulated ADC readings and GPIO threshold alerts',
      'Chart.js visualizations comparing Cortex-M0, M0+, M3, M4',
      'Entirely browser-based, no server required',
    ],
    techStack: ['HTML', 'JavaScript', 'Chart.js', 'ARM Assembly Concepts', 'Embedded Systems Simulation'],
    category: 'Robotics / Embedded Systems',
    githubUrl: 'https://github.com/Hazmat-ai/Vibecode_projects',
    featured: false,
    order: 9,
  },
  {
    slug: 'hubspot-integration',
    title: 'HubSpot CRM Integration',
    shortDescription: 'Node.js/Express app integrating the HubSpot API to create and display custom CRM object records.',
    description:
      'Developed a Node.js and Express application for the Integrating With HubSpot I: Foundations practicum. Integrated the HubSpot API to create, retrieve, and display custom CRM records representing video game characters. Built a record-entry form and a table interface using Pug templates.',
    problem:
      'Needed to learn HubSpot API fundamentals—authentication, custom object schemas, and CRUD operations—through a hands-on integration project.',
    approach:
      'Used Node.js and Express for the backend, Pug for server-side HTML templating, and Axios for HubSpot API requests. Implemented OAuth or API key authentication, custom object creation, record retrieval, and a simple CRUD interface.',
    keyFeatures: [
      'HubSpot API integration for custom CRM object management',
      'Create, retrieve, and display custom records (video game characters)',
      'Record-entry form and table interface via Pug templates',
      'Node.js/Express backend with Axios for API requests',
    ],
    techStack: ['JavaScript', 'Node.js', 'Express', 'HubSpot API', 'Pug', 'Axios'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/Hazmat-ai/Hubspot_integration-',
    featured: false,
    order: 10,
  },
  {
    slug: 'vex-robotics',
    title: 'VEX V5 Competition Robotics',
    shortDescription: 'Multi-season VEX V5 competition robotics: drivetrain design, motor control, and team World Championship qualification.',
    description:
      'Contributed to the design, assembly, and refinement of VEX V5 competition robots across multiple high school seasons. Worked on drivetrain configuration, gearing, and controller mapping to support game-specific tasks and match strategy. The team earned regional victories and qualified for the VEX World Championship.',
    problem:
      'Each VEX season introduces a new game with unique mechanical and strategic challenges. Required iterative robot design, real-world testing, and rapid iteration under competitive conditions.',
    approach:
      'Used VEXcode for programming motor control, drivetrain logic, and autonomous routines. Mechanical work included gearing analysis, assembly, and field testing. Strategy was developed collaboratively across team members per match requirements.',
    keyFeatures: [
      'Multi-season iterative robot design and assembly',
      'Drivetrain configuration, gearing, and controller mapping',
      'Autonomous and driver-controlled programming in VEXcode',
      'Regional victories and VEX World Championship qualification',
    ],
    techStack: ['VEX V5', 'VEXcode', 'Drivetrain Design', 'Motor Control', 'Mechanical Assembly'],
    category: 'Robotics / Embedded Systems',
    githubUrl: undefined,
    featured: false,
    order: 11,
  },
  {
    slug: 'fpv-racing-sim',
    title: 'FPV Racing Simulation',
    shortDescription: 'FPV simulation integrating camera modules with live video feeds for a first-person viewing experience.',
    description:
      'Contributed to an FPV simulation setup integrating camera modules with a live video feed to provide a first-person viewing experience. Assisted with hardware configuration, circuit rewiring, and troubleshooting component connections. Refined the setup to improve signal consistency and responsiveness between the camera system and viewing interface.',
    problem:
      'FPV simulation setups require careful hardware integration: camera signal acquisition, transmission, and display must all function together with minimal latency and signal degradation.',
    approach:
      'Focused on hardware-level integration: configuring camera modules, rewiring circuits for clean signal paths, and iteratively debugging component connections to improve signal consistency and system responsiveness.',
    keyFeatures: [
      'FPV camera module integration with live video feed',
      'Hardware configuration and circuit rewiring for signal integrity',
      'Iterative debugging to improve latency and responsiveness',
    ],
    techStack: ['FPV Camera Systems', 'VR Camera Modules', 'Video Transmission', 'Circuit Wiring', 'Hardware Troubleshooting'],
    category: 'Robotics / Embedded Systems',
    githubUrl: undefined,
    featured: false,
    order: 12,
  },
];

export const featuredProjects = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
export const allProjectsSorted = projects.sort((a, b) => a.order - b.order);
