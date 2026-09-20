import { programMedia } from '@/data/site-images'
import type { TestimonialsBlockData } from '@/types/content'

export const homeTestimonials: TestimonialsBlockData = {
  blockType: 'testimonials',
  eyebrow: 'Student and family voices',
  heading: 'What students say about Coop Tech',
  intro:
    'Real Google reviews from graduates, current students, and families — chosen for specific shops, certifications, internships, and careers.',
  buttonLabel: 'Explore programs',
  buttonHref: '/programs',
  items: [
    {
      authorName: 'Emma Shilongo',
      authorRole: 'Natural Hairstyling graduate',
      rating: '5',
      quote:
        'I went to this school like 14 years ago. I did hairdressing specializing in natural hairstyling, one of the best decisions I’ve ever made in my life. Today I run my own hair salon in Namibia successfully. I would definitely recommend this school.',
      imageUrl: programMedia['unisex-styling'].cover,
      imageAlt: 'Unisex styling classroom at Coop Tech',
    },
    {
      authorName: 'Bianca Goldbetter',
      authorRole: 'Parent',
      rating: '5',
      quote:
        'My son found out, applied, and attended this school after high school graduation. He absolutely loved it because it’s hands-on learning. I’m so proud, as a mother, that he has completed his pre-apprenticeship.',
      imageUrl: programMedia['work-based-learning'].cover,
      imageAlt: 'Work-based learning at Coop Tech',
    },
    {
      authorName: 'Mohammed Awal Abdul Nasir',
      authorRole: 'Computer Networking graduate',
      rating: '5',
      quote:
        'I went to Coop Tech for Computer Networking. My teachers were Mr. Bisono and Mr. Johnson. I didn’t only get hands-on training and certifications on computer networking, but I also had different internship opportunities like cybersecurity.',
      imageUrl: programMedia['information-technology'].cover,
      imageAlt: 'Information technology lab at Coop Tech',
    },
    {
      authorName: 'Nick',
      authorRole: 'Electrical graduate',
      rating: '5',
      quote:
        'Best school ever. I took classes for 2 years, including job placement in 2014 to Local 3.',
    },
    {
      authorName: 'Feroze Yacoob',
      authorRole: 'Plumbing and Electrical graduate',
      rating: '5',
      quote:
        'I attended the evening trade courses, plumbing and later electrical. Thanks to this institution and its instructors, I have a wonderful city job, with great pay and benefits. Thank you, Coop Tech.',
    },
    {
      authorName: 'Jewell Knight',
      authorRole: 'Student',
      rating: '5',
      quote:
        'Highly recommend this school if you’re looking for a new trade. There’s a wide variety to choose from. Teachers are incredibly friendly and teach the materials in an easy-to-understand way. Classmates are also welcoming, which is incredibly rare for NYC schools. First time ever I actually enjoy going to school.',
    },
    {
      authorName: 'Lisa Pressley',
      authorRole: 'Culinary Arts graduate',
      rating: '5',
      quote:
        'Chef Edwin Serna polished my culinary skills and I am forever grateful. He is an excellent teacher, chef, and a credit to this school.',
      imageUrl: programMedia.culinary.cover,
      imageAlt: 'Culinary arts kitchen at Coop Tech',
    },
    {
      authorName: 'Kathy',
      authorRole: 'Parent',
      rating: '5',
      quote:
        'My son has been going to Coop Tech in the afternoons. He’s a senior in high school. He’s learned so much. He serviced our car already.',
      imageUrl: programMedia['automotive-services'].cover,
      imageAlt: 'Automotive services shop at Coop Tech',
    },
    {
      authorName: 'Chenelle Bermudez',
      authorRole: 'Welding and Cisco Networking student',
      rating: '5',
      quote:
        'The people at Coop Tech are amazingly nice and fun to be around. You get to meet so many interesting people too. Definitely the place to learn something new. I’m currently in here for welding and Cisco networking, and after I’m finished I will be doing a repeat for other courses later on in the year.',
    },
    {
      authorName: 'Amasa Willis',
      authorRole: 'Welding graduate',
      rating: '5',
      quote:
        'I was in this school in 2009. Mr. G was the welding instructor at the time — a great teacher, very experienced and well skilled. He showed me everything about welding and more.',
      imageUrl: programMedia.construction.cover,
      imageAlt: 'Construction and welding shop at Coop Tech',
    },
  ],
}
