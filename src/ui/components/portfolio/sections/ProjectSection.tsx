import { Section } from "@ui/components/dna/layout";
import ProjectCard, { ProjectCardProps } from "../cards/ProjectCard";

const projects: ProjectCardProps[] = [
  {
    title: "AI-Powered Portfolio",
    problem: "Needed an interactive portfolio to showcase projects.",
    solution: "Built a full-stack site with AI chatbot and custom backend.",
    impact: "Enabled engaging demos and easier contact.",
    image: "/ProjectAI.png",
    href: "https://github.com/NolanEssertaize/portfolio-front",
  },
  {
    title: "CS50 Course",
    problem: "Wanted rigorous grounding in computer science.",
    solution: "Completed Harvard's CS50 and its projects.",
    impact: "Gained strong fundamentals for future work.",
    image: "/CS50.png",
    href: "https://www.edx.org/cs50",
  },
  {
    title: "TCP/IP Server BAC+2",
    problem: "Track pull-up strength from a remote sensor.",
    solution: "Raspberry Pi server relayed data to a mobile app.",
    impact: "Delivered real-time analytics for training.",
    image: "/TCPIP.png",
    href: "https://www.canva.com/design/DAFeGReujvA/843jfXbe723PRx4z1dQ4OQ/edit?utm_content=DAFeGReujvA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  },
  {
    title: "Kaizen",
    problem: "Explore practical applications of AI models.",
    solution: "Experimented with Next.js demos using AI APIs.",
    impact: "Accelerated prototyping and understanding.",
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

