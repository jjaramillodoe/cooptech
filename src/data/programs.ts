import { programSeo } from '@/data/seo'
import type { Program } from '@/types/content'

export const fallbackPrograms: Program[] = [
  {
    id: 'automotive-services',
    title: 'Automotive Services',
    slug: 'automotive-services',
    category: 'automotive',
    summary:
      'Learn automotive repair, maintenance, and diagnostic techniques using modern technology.',
    intro:
      "The Automotive program is a 2 year sequence that prepares students in the area of Automotive Technology using a rigorous curriculum that combines classroom instruction with practical experiences. The curriculum provides students' knowledge in each of the following areas: Electric and Electronic applications, Steering and Suspension, Brakes, and Engine Performance. Each program culminates with students taking an industry recognized certification through the National Institute for Automotive Service Excellence Student ASE certifications.",
    meta: programSeo['automotive-services'],
    duration: '2-year sequence',
    schedule: 'Morning 8:30–11:00 or Afternoon 12:20–2:50',
    imageUrl:
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1600&q=80',
    ],
    requirements: [
      'Ages 17–21 and enrolled in a NYC DOE high school, Pathways to Graduation, or post-graduate',
      'Interest in mechanical systems, diagnostics, and shop safety',
      'Ability to attend a half-day CTE session at an assigned campus',
    ],
    certifications: [
      'ASE Student Certification — A6 Electrical/Electronic Systems',
      'ASE Student Certification — A8 Engine Performance',
      'ASE Student Certification — A4 Suspension & Steering',
      'ASE Student Certification — A5 Brakes',
      'Snap-on Multimeter, Solus Edge, Alignment, and ProCut certifications',
    ],
    campuses: ['Coop Tech Main Campus', 'Coop Tech @ Longwood Campus'],
    courses: [
      {
        title: 'Electrical and Electronic',
        description:
          "The Automotive Electrical and Electronic course provides a study of automotive electrical and electronic fundamentals with an emphasis on Ohm's Law. This course provides an in-depth study on how to properly use wiring diagrams in electrical diagnosis and repair. Automotive starting, supplemental restraint (air bag) and charging electrical systems and components are also covered. An emphasis is placed on electrical system diagnosis and electrical repair which includes using various industry standard diagnostic electrical equipment and testing techniques. This course culminates with students taking the Snap-On Multimeter certification and the National Institute for Automotive Service Excellence: A6- Electrical/Electronic Systems Student ASE certification.",
      },
      {
        title: 'Engine Performance',
        description:
          'The Automotive Engine Performance course provides instruction in diagnostic procedures for drivability concerns and emission failures on automotive vehicles. This includes an in-depth study in the modern ignition, fuel and power train computer controlled systems. Includes how fuel, ignition, and power train computer controlled systems relate to exhaust emission strategies. The course gives the student the opportunity to use industry standard testing equipment such as hand-held scanners and exhaust analyzers. This course culminates with students taking the Snap-On Solus Edge certification and the National Institute for Automotive Service Excellence A8 – Engine Performance Student ASE certification.',
      },
      {
        title: 'Steering and Suspension',
        description:
          'The Automotive Steering and Suspension course introduces students to the automobile chassis and its various systems. This course offers an in-depth study of tires and wheels, wheel balancing, two and four wheel alignment, and diagnostic and service techniques. There is an emphasis on wheel alignment, steering and suspension component repairs. This course culminates with students taking the National Institute for Automotive Service Excellence: A4 – Suspension & Steering Student ASE certification, the Snap-on Alignment Fundamentals, Wheel Balancer, Pro42 Wheel Alignment and Wheel Balancing certifications.',
      },
      {
        title: 'Brakes',
        description:
          'The Automotive Brake course concentrates on the theory, diagnosis, and repair of automotive brake systems and a study of disc and drum brake systems. The course covers anti-lock brakes, hydraulic operation, and brake system service, diagnosis, and repair. The introduction of precision measurement tools such as micrometers and dial indicators are infused to reinforce math skills. Basic machining skills are utilized with brake drum and rotor resurfacing lathes. A Snap-on Torque course which culminates in students receiving an industry recognized certification is achieved through the use of various torque tools and instruments. This course culminates with students taking the National Institute for Automotive Service Excellence A5 – Brakes Student ASE certification and the Snap-On ProCut Rotor Matching Master Technician Certification.',
      },
    ],
  },
  {
    id: 'construction',
    title: 'Construction and Building Skills',
    slug: 'construction',
    category: 'construction',
    summary:
      'Master essential construction skills and building techniques for modern infrastructure.',
    meta: programSeo.construction,
    duration: '1–2 years depending on pathway',
    schedule: 'Morning 8:30–11:00 or Afternoon 12:20–2:50',
    imageUrl:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80',
    ],
    requirements: [
      'Ages 17–21 with shared-instruction or post-graduate status',
      'Comfort working in shop and job-site environments',
      'Interest in carpentry, plumbing, welding, or architectural design',
    ],
    certifications: [
      'OSHA 10 / OSHA 30 Construction',
      'NYS DOT 3G and 4G Welder Certifications',
      'FDNY F60 and G60 Certificates of Fitness',
      'AutoCAD, SolidWorks, and Revit software certifications',
    ],
    campuses: ['Coop Tech Main Campus', 'Coop Tech @ Longwood Campus', 'Coop Tech @ Canarsie H.S.'],
    courses: [
      {
        title: 'Introduction to Construction Trades',
        description:
          'This course provides students with the theoretical and hands-on experience necessary to perform entry level skills to assist any expert trades person. The curriculum consists of three units of study: Basic Carpentry, Basic Electrical, and Basic Plumbing. Students will learn entry level skills in all three trades, and the appropriate use of hand and power tools. Students will learn functional skills including: basic residential floor and wall framing, metal framing, drywall installation, finishing and repair, floors and wall tile installation, painting, door and door lock installation, window installation, installing plumbing fixtures such as toilets and faucets, and installing electrical fixtures such as lights and outlets. This course is the perfect course to select if you are unsure of which hard trade you wish to specialize in, or if you are looking to enter the work force after obtaining the certification.',
      },
      {
        title: 'Carpentry',
        description:
          'This course provides the opportunity for students to gain knowledge and experience with hand and power tools, construction methods, building materials, construction safety, job cost estimating, blueprint reading and career readiness skills. Students will develop and practice these skills while building a house from the ground up. During the house construction, students will learn about: framing with metal or wood, installing and taping drywall, tiling in the bathroom and kitchen, flooring, cabinet installation, and painting. These skills are relevant for both residential and commercial construction, which can apply to both new construction and interior renovations. Some students will have the opportunity to participate in work-based learning and internship placement opportunities, as well as, pre-apprentice programs that lead to careers in the construction unions.',
      },
      {
        title: 'Architectural Drafting & 3D Printing',
        description:
          'The Architectural Design and 3D Printing course provides students with a beginner understanding of the design process, drafting procedures, and drafting software. This Project-Based Learning class focuses on applying architectural design and creation in real-world situations. Students will have the opportunity to gain certification in drafting and rendering software including AutoCAD, SolidWorks, & Revit. In addition, students will familiarize themselves with procedures to operate and produce high-resolution quality 3D structures, models, and prototype designs utilizing modeling software, CO2 Lasers, Filament 3D Printers, and Resin 3D Printers.',
      },
      {
        title: 'Welding Technology',
        description:
          'This course will provide students an opportunity to learn entry level gas and electric welding skills. The curriculum will cover blueprint reading, Shielded Metal Arc Welding, Gas Metal Arc Welding, Gas Tungsten Arc Welding, Flux Cored Arc Welding, Oxy Fuel Cutting, Plasma Arc Cutting and Fabrication.\n\nStudents can earn the following NYS Licenses and Certifications:\n\n- NYS Department of Transportation 3G Field Welder Certification (Vertical-Up) for unlimited thickness carbon steel.\n- Department of Transportation 4G Welder Certification (Overhead) for unlimited thickness carbon steel.\n- FDNY F60 Certification of Fitness (Fire Guard for Torch Operations).\n- FDNY G60 Certification (Torch Use of Flammable Gases).\n\nUpon careful assessment of acquired skills, selected students can be recommended by their instructor for internship opportunities and union recruitment programs.',
      },
      {
        title: 'Plumbing',
        description:
          'This course introduces students to entry-level plumbing. This high demand trade is at the forefront of the construction work force. Students will learn basic skills in preparing, installing and repairing pipes that distribute fresh water and dispose of waste water. Students will gain hands-on knowledge of how to repair and install all things plumbing related that includes but not limited to sinks, toilets, water heaters and hydronic heating systems including heated floors. Students will engage in today’s cutting edge technology that’s applicable in the plumbing field. This course is geared towards numerous FDNY certificates of fitness. Students will be prepared for entry into apprenticeship programs and as a plumber’s helper.',
      },
    ],
  },
  {
    id: 'culinary',
    title: 'Culinary Arts',
    slug: 'culinary',
    category: 'culinary',
    summary: 'Develop professional culinary skills and learn food service management.',
    meta: programSeo.culinary,
    duration: '1–2 years',
    schedule: 'Morning 8:30–11:00 or Afternoon 12:20–2:50',
    imageUrl:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1600&q=80',
    ],
    requirements: [
      'Ages 17–21 and eligible for NYC DOE CTE enrollment',
      'Interest in restaurant, catering, or institutional food service',
      'Willingness to work in a professional kitchen environment',
    ],
    certifications: ['NYC Health Department Food Handler Certificate'],
    campuses: ['Coop Tech Main Campus', 'Coop Tech @ Longwood Campus'],
    courses: [
      {
        title: 'Culinary Arts',
        description:
          'Students will be exposed to different aspects of restaurant, catering, and commercial/institutional food service. They will learn different core culinary arts techniques, including the preparation of stocks, sauces, and soups and dry-heat, moist-heat, and hybrid cooking methods. Students will also learn baking/pastry arts, including yeasted and quick breads and a variety of desserts. They will explore a range of global cuisines and learn the basics of food production. This course is geared toward obtaining the New York City Health Department’s Food Handlers Certificate and preparing students for employment as an entry-level baker, cook /prep cook.',
      },
    ],
  },
  {
    id: 'electrical',
    title: 'Electrical',
    slug: 'electrical',
    category: 'electrical',
    summary: 'Train in electrical systems installation, maintenance, and troubleshooting.',
    intro:
      'One of the best parts of the electrical industry is that it encompasses a wide range of skills and career paths. Here at Coop Tech, you can learn from industry leaders in four electrical fields: Solar, Residential, Commercial, and Industrial. These classes offer different skills and learning experiences; however, each teaches the associated trade math, electrical theory, and safety required to succeed as an electrical apprentice. Students with excellent attendance and grades will be nominated for the Construction Skills program and for the MTA test application.',
    meta: programSeo.electrical,
    duration: '1–2 years',
    schedule: 'Morning 8:30–11:00 or Afternoon 12:20–2:50',
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1473341304170-971dccb5af1e?auto=format&fit=crop&w=1600&q=80',
    ],
    requirements: [
      'Ages 17–21 with shared-instruction or post-graduate status',
      'Comfort with applied math and shop safety procedures',
      'Interest in residential and commercial electrical work',
    ],
    certifications: [
      'OSHA 10 Construction',
      'Preparation for electrical helper and apprenticeship entry',
    ],
    campuses: ['Coop Tech Main Campus', 'Coop Tech @ Longwood Campus'],
    courses: [
      {
        title: 'Residential',
        description:
          'This course will allow students to learn the basic fundamentals of signal wiring, residential wiring, low voltage systems, and intercom systems. The course will also include use of mathematical formulas in order to complete circuit calculations for proper box sizes, raceways sizes, cable sizes, fuse protection and conductor sizing for any given residential circuit. Students will have an opportunity to complete all the wiring required for a single family home, starting at the power distribution equipment and culminating at the individual outlets and light switches. Additionally, the installation of digital timers, photocells, digital dimmer switches and smart switches, are all skills that will be covered in class to stay up to date with the latest technology. Throughout the semester, articles from the National Electrical Code Book will be discussed to ensure that the work performed is acceptable in accordance to local and national standard codes.',
      },
      {
        title: 'Industrial',
        description:
          'This course is designed to offer students the necessary skills to obtain a job as an electrical helper in industrial wiring. The course focuses on the theory of electrical installations, which includes standards from the National Electrical Code. The class provides the theory and hands on work, which covers the principles for low voltage electromagnetic switches, industrial raceways installations, industrial lighting, transformers and motor control circuits.',
      },
      {
        title: 'Solar',
        description:
          'This course prepares students for an entry-level position as a Solar Photovoltaic (PV) trainee. An entry-level PV trainee has basic knowledge and understanding of all components of a solar PV power generation system and can assist with installation. Within the scope of this course, students will use algebraic concepts as a primary tool to install, analyze, and test electrical circuits using an Electrical Tester. Students will also be instructed on proper safety procedures used during installation and an in-depth understanding of electrical schematic diagrams and basic NEC codes during installation. Finally, as an essential part of being an electrical apprentice is to be able to bend Electrical Metallic Conduit (EMT), you will experience the core fundamentals of bending ½", ¾", and 1" EMT using a hand bender. Hands-on projects are "all" done on an individual basis and student advancement.',
      },
      {
        title: 'Commercial',
        description:
          'This course is designed for students to learn the fundamentals of commercial electrical work. These skills will help them succeed in both new construction and renovations. There is a strong focus on safety, electrical theory, trade math, circuitry, conduit bending and on the industry’s shift towards low voltage and data work. Students will utilize daily math and writing assignments to hone their skills to prepare for union entrance exams.',
      },
    ],
  },
  {
    id: 'health-services',
    title: 'Health Services',
    slug: 'health-services',
    category: 'health',
    summary: 'Prepare for a career in healthcare with hands-on medical training.',
    meta: programSeo['health-services'],
    duration: '1–2 years depending on pathway',
    schedule: 'Morning 8:30–11:00 or Afternoon 12:20–2:50',
    imageUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80',
    ],
    requirements: [
      'Ages 17–21 and eligible for NYC DOE CTE enrollment',
      'Interest in patient care, medical records, or vision care',
      'Ability to meet clinical site professionalism and attendance standards',
    ],
    certifications: [
      'NYS Certified Nursing Assistant examination eligibility',
      'Preparation for medical billing, coding, and EHR specialist roles',
    ],
    campuses: ['Coop Tech Main Campus', 'Coop Tech @ Longwood Campus'],
    courses: [
      {
        title: 'Introduction to Medical Careers',
        description:
          'Medical Billers and Coders are responsible for processing patient data including medical records and related insurance. In this position, you will code a patient’s diagnosis and then request payment from the patient’s insurance company. Medical Billers and Coders play an important role in ensuring that healthcare providers are quickly and accurately paid for the treatment they give patients. Medical coders translate patient care into current procedural terminology (CPT) codes. Their primary responsibility is to ensure that the medical services provided are accurately coded. Medical billers are responsible for creating a claim based on the codes a medical coder provides. Electronic Health Records Specialists: EHR specialists focus on the electronic documentation of the patient’s care and condition. Common EHR job activities may include Auditing patient records for compliance with government or insurance requirements. Abstracting clinical information for reporting purposes and performing basic coding for reimbursement claims. Processing Release of Information (ROI) requests for medical records. Reviewing patient records for completion and accuracy. Collecting patient information for demographic and insurance reports. Discussing patient information with physicians and insurance professionals.\n\nMedical Administrative Assistants are responsible for answering phones, managing appointment bookings, and updating the facility\'s system with patients\' information. To be successful as a medical administrative assistant you must be able to keep patients\' information confidential and exercise a high level of customer service skills. Strong administrative assistants have great attention to detail and are able to prioritize tasks efficiently. Some other responsibilities include: Scheduling patient appointments and hospital visits; Collecting patients\' personal information and financial information; Validating payment methods and medical insurance coverage; Recording patients\' information in the EHR System; and issuing invoices to clients.',
      },
      {
        title: 'Certified Nursing Assistant (CNA)',
        description:
          'The course is designed to provide students with the knowledge and skills necessary to perform basic care to patients as a Certified Nursing Assistant. It prepares the student to function in the role of a nursing assistant under the supervision of a RN or LPN. This course is NYS approved and upon successful completion of this course, students are eligible to take both the written and manual skills components of the NYS Certified Nursing Assistant examination. Students can obtain positions upon passing the state examination. Upon completion, students will be eligible to work in a variety of geriatric care facilities with elderly patients.',
      },
      {
        title: 'Vision Care Technology',
        description:
          'This course delivers a curriculum which provides students with knowledge and skills related to the field of vision care. Program components include producing prescription eyewear, measuring and adapting eyeglasses to fit the face, spotting, dotting, blocking, decentering, digital edging and inspecting the finished product. The ophthalmic technician/dispenser/optician combines knowledge of scientific and clinical procedures with skills and the ability to work well with patients in the fitting and adapting of lenses and devices that aid in providing efficient ocular correction. The curriculum represents a carefully planned balance of theory and clinical practice in all aspects of the profession, including reception and clerical tasks, infection control, patient communication, principles of eye anatomy, and common eye disorders and treatment. Students who successfully complete the Vision Care Technology program will possess the academic, technical and clinical skills needed to fulfill the duties and responsibilities of an eye care professional/ophthalmic technician.',
      },
    ],
  },
  {
    id: 'information-technology',
    title: 'Information Technology',
    slug: 'information-technology',
    category: 'it',
    summary: 'Learn cutting-edge IT skills and prepare for industry certifications.',
    meta: programSeo['information-technology'],
    duration: '1–2 years depending on pathway',
    schedule: 'Morning 8:30–11:00 or Afternoon 12:20–2:50',
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80',
    ],
    requirements: [
      'Ages 17–21 with shared-instruction or post-graduate status',
      'Interest in design, networking, or digital media production',
      'Willingness to build a professional portfolio or lab log',
    ],
    certifications: [
      'Adobe Premiere Pro and Logic Pro X',
      'IT Specialist HTML/CSS and HTML5 Application Development',
      'NOCTI Web Design',
      'Cisco Networking Academy / CCNA pathway',
      'Adobe Photoshop, InDesign, and Illustrator',
    ],
    campuses: ['Coop Tech Main Campus', 'Coop Tech @ Long Island City H.S.'],
    courses: [
      {
        title: 'Audio/Video Production',
        description:
          'This course teaches foundational skills for a career in audio & video production. Students will learn and apply concepts in every facet of production, including recording, beat making, podcasting, sound design, filming, lighting, editing, mixing, and mastering. Students will get hands-on experience with hardware and software used by professionals and will train for certification exams in Adobe Premiere Pro and Logic Pro X. Students will also have the opportunity to compete in competitions wherein they will create their own Audio/ Radio Production and/or Digital Cinema Production. Upon completion of the course, students will be prepared for entry level positions in audio, tv/film, and broadcasting.',
      },
      {
        title: 'Web Design',
        description:
          'Students will learn the basics of web design principles, digital media options, web design languages, Internet uses and processes, design considerations, the impact of target market demographics, and deliverables. The class will focus on web page planning, basic design, layout, and construction (effective and ineffective), setup and maintenance of a website, HTML, CSS, JavaScript, jQuery and various web page creation techniques and resources used for front-end web development. Courses such as this can provide the skills and motivation for you to successfully complete college programs in one of several business and technology areas. At the conclusion of this course, students will be eligible to take IT Specialist HTML/CSS, IT Specialist HTML5 Application Development, and NOCTI Web Design Certifications. This course prepares students to obtain entry-level positions in the field of Web Design/Front-End Development.',
      },
      {
        title: 'Computer Networking (CISCO)',
        description:
          'Students will learn how a computer network works and how important it is for an organization’s success. They will learn how to build, configure and troubleshoot wired and wireless networks using Cisco equipment. They will also learn how to integrate different technologies used in enterprise networks such as virtualization, Windows Active Directory, DHCP servers, DNS servers, File and Replication servers. Upon completion of the course, students will be able to install, configure, secure, and troubleshoot small and mid-sized networks. Our curriculum is coordinated through the Cisco Networking Academy which provide students the necessary tools to prepare for the Information Technology Specialist certification and the Cisco Certified Networking Associate certification. Throughout this course students learn essential computer networking skills needed to obtain entry-level positions in the IT industry.',
      },
      {
        title: 'Advertising and Design',
        description:
          'Advertising and Design Students will enter the world of design, learning the concepts, principles and processes of how to create amazing works of art using the various Adobe programs. While learning to be great designers, students will prepare to pass the Adobe Photoshop, InDesign and Illustrator certifications. Students will also build a professional portfolio composed of many works of art such as brochures, banners, posters, flyers and logos that are sure to impress employers. This course will prepare students for entry level positions and other jobs related to Graphic Design.',
      },
    ],
  },
  {
    id: 'unisex-styling',
    title: 'Unisex Styling',
    slug: 'unisex-styling',
    category: 'styling',
    summary: 'Master professional hair styling techniques and salon management skills.',
    meta: programSeo['unisex-styling'],
    duration: '1–2 years',
    schedule: 'Morning 8:30–11:00 or Afternoon 12:20–2:50',
    imageUrl:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1600&q=80',
    ],
    requirements: [
      'Ages 17–21 and eligible for NYC DOE CTE enrollment',
      'Interest in barbering, natural hairstyling, or salon operations',
      'Commitment to client-service professionalism and sanitation standards',
    ],
    certifications: [
      'Preparation for NYS Barber Operator License (Master Barber License)',
      'Preparation for NYS Natural Hair Styling license exam',
    ],
    campuses: ['Coop Tech Main Campus', 'Coop Tech @ Longwood Campus'],
    courses: [
      {
        title: 'Barbering',
        description:
          "The Barber Course is to train students in all aspects of the barbering profession. The student will acquire skills in haircutting, hair styling, tapering, trimming of the beard and mustaches, men's hairpieces, scalp treatments, facials, shampooing, sanitizing, shop management and state licensing laws. Upon completion of required hours, a certificate of completion will be issued to the student and he/she will be eligible to take the New York State Board Exam. After successfully passing the New York State Board Exam, the student will be issued a Barber Operator License (Master Barber License). Students who complete their program and pass the New York State Board Exam will be qualified to pursue a variety of opportunities in the professional field of barbering.",
      },
      {
        title: 'Natural Hairstyling',
        description:
          'Students will be introduced to numerous aspects of the appearance enhancement field. They will learn hair care, hair design, styling, braiding, weaving, locking, and up-do styles for special occasions. Students are exposed to financial management and various business aspects of natural hair styling. This course is geared towards passing the NYS Natural Hair Styling license exam. This course prepares students for an entry level position in a Natural Hair Styling salon.',
      },
    ],
  },
  {
    id: 'work-based-learning',
    title: 'Work-Based Learning',
    slug: 'work-based-learning',
    category: 'wbl',
    summary:
      'Connect classroom training to real jobs through job shadowing, internships, and pre-apprenticeship opportunities.',
    meta: programSeo['work-based-learning'],
    duration: 'Available to enrolled students',
    schedule: 'Arranged with the Office of Work-Based Learning',
    imageUrl:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
    ],
    requirements: [
      'Enrolled Coop Tech student',
      'Internships are offered on an individual basis and are not guaranteed',
    ],
    certifications: [],
    campuses: ['All campuses'],
    courses: [
      {
        title: '',
        description:
          'Work-based learning at The School of Cooperative Technical Education gives students exposure to the world of work through a set of sequenced and coordinated activities. It addresses the shared goal of educators and employers in preparing students with the knowledge and skills necessary for productive careers. Our program enables students to achieve educational outcomes that align with employer requirements bridging the gap between school and work. Students have the opportunity for applied career exploration that brings job relevance to the educational process. Through exposure and financial support, they gain access to new, attainable career opportunities. We offer Job Shadow, Volunteering, Paid Internship, Clinical Experience, and Pre- Apprenticeship Opportunities. This model is made possible through partnerships between education, industry, unions, non-profit and public organizations. This model delivers a comprehensive set of experiences designed to promote awareness, build capacity and align resources for students giving them the necessary tools to grow, develop, plan, execute and transition to meaningful productive careers in order to support themselves and their families.',
      },
    ],
  },
  {
    id: 'osha',
    title: 'Occupational Safety and Health Administration (OSHA)',
    slug: 'osha',
    category: 'osha',
    summary:
      'Earn OSHA 10, OSHA 30, and NYC Department of Buildings SST credentials for construction and general industry safety.',
    meta: programSeo.osha,
    duration: '10-hour and 30-hour outreach courses',
    schedule: 'Offered as part of CTE shop sequences',
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80',
    ],
    requirements: ['Ages 17–21 and enrolled in a Coop Tech CTE program'],
    certifications: [
      'OSHA 10',
      'OSHA 30',
      'NYC Department of Buildings SST training',
    ],
    campuses: ['Coop Tech Main Campus'],
    courses: [
      {
        title: '',
        description:
          'This course is intended to provide instruction to entry level participants on a variety of construction and general industry safety and health standards. This outreach effort is aimed at promoting workplace safety and health. Students have the opportunity to receive the 10 hour and 30 hour OSHA Certifications and the NYC Department of Buildings SST training.',
      },
    ],
  },
]
