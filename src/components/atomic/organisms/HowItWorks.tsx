import Container from "@/components/atomic/atoms/Container";
import Heading from "@/components/atomic/atoms/Heading";
import StepItem from "@/components/atomic/molecules/StepItem";

const steps = [
  {
    title: "Choose Topic",
    description: "Pick any concept you want to explore.",
  },
  {
    title: "Generate Lesson",
    description: "Get a micro-lesson with example.",
  },
  {
    title: "Practice & Track",
    description: "Complete exercises and follow progress.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-12">
      <Container>
        <Heading className="text-center">How it works</Heading>
        <ol className="mt-8 flex flex-col md:flex-row gap-6 md:gap-4 list-none">
          {steps.map((step, index) => (
            <StepItem
              key={step.title}
              step={index + 1}
              title={step.title}
              description={step.description}
            />
          ))}
        </ol>
      </Container>
    </section>
  );
}

