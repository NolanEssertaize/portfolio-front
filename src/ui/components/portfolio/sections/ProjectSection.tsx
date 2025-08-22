import { Section } from "@ui/components/dna/layout";
import ProjectCard, { ProjectCardProps } from "../cards/ProjectCard";

const projects: ProjectCardProps[] = [
  {
    title: "AI-Powered Portfolio",
    problem: "Static portfolios felt limited in showing interactive work.",
    solution: "Developed a full-stack site with Next.js, custom FastAPI backend, and an integrated AI chatbot.",
    impact: "Visitors can explore projects through live demos and interact directly with the AI for faster engagement.",
    image: "/ProjectAI.png",
    href: "https://github.com/NolanEssertaize/portfolio-front",
  },
  {
    title: "CS50 Course",
    problem: "Wanted rigorous grounding in computer science theory and practice.",
    solution: "Completed Harvard’s CS50 with projects in C, Python, SQL, and web development.",
    impact: "Built strong foundations in algorithms, systems, and full-stack principles, enabling faster adoption of new technologies.",
    image: "/CS50.png",
    href: "https://www.edx.org/cs50",
  },
  {
    title: "TCP/IP Server (BAC+2)",
    problem: "Needed to track pull-up strength from a remote IoT sensor.",
    solution: "Implemented a Raspberry Pi TCP/IP server that relayed sensor data to a companion mobile app.",
    impact: "Delivered real-time training analytics, improving performance tracking and data reliability.",
    image: "/TCPIP.png",
    href: "https://www.canva.com/design/DAFeGReujvA/843jfXbe723PRx4z1dQ4OQ/edit?utm_content=DAFeGReujvA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  },
  {
    title: "Kaizen",
    problem: "Learners struggle to find tailored, structured resources for specific topics.",
    solution: "Built an AI-driven tool that dynamically generates custom learning paths and courses for any chosen subject.",
    impact: "Helps learners tackle real-world problems with focused, adaptive curricula.",
    image: "/kaizen.png",
    href: "/kaizen",
  },
];

export default function ProjectsSection() {
  return (
    <Section id="projects" title="Case Studies">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </Section>
  );
}

