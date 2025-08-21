'use client';

import { useState, useRef, KeyboardEvent } from "react";
import Container from "@ui/components/atomic/atoms/Container";
import CodeBlock from "@ui/components/atomic/atoms/CodeBlock";

const jsonSample = `{
  "title": "Derivative basics",
  "duration_min": 5,
  "topic": "Math"
}`;

const tsSample = `type Lesson = {
  title: string;
  duration_min: number;
  topic: string;
};`;

type Tab = "json" | "ts";

export default function CodeShowcase() {
  const tabs: Tab[] = ["json", "ts"];
  const [activeTab, setActiveTab] = useState<Tab>("json");
  const tabRefs = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)];

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + dir + tabs.length) % tabs.length;
      setActiveTab(tabs[nextIndex]);
      tabRefs[nextIndex].current?.focus();
    }
  };

  return (
    <section id="code" className="py-12">
      <Container>
        <div role="tablist" aria-label="Code showcase" className="flex mb-4 gap-2">
          <button
            ref={tabRefs[0]}
            id="json-tab"
            role="tab"
            aria-selected={activeTab === "json"}
            tabIndex={activeTab === "json" ? 0 : -1}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              activeTab === "json" ? "glass" : "glass-subtle"
            }`}
            onClick={() => setActiveTab("json")}
            onKeyDown={(e) => handleKeyDown(e, 0)}
          >
            JSON Output
          </button>
          <button
            ref={tabRefs[1]}
            id="ts-tab"
            role="tab"
            aria-selected={activeTab === "ts"}
            tabIndex={activeTab === "ts" ? 0 : -1}
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
              activeTab === "ts" ? "glass" : "glass-subtle"
            }`}
            onClick={() => setActiveTab("ts")}
            onKeyDown={(e) => handleKeyDown(e, 1)}
          >
            TypeScript Schema
          </button>
        </div>
        {activeTab === "json" ? (
          <CodeBlock language="json">{jsonSample}</CodeBlock>
        ) : (
          <CodeBlock language="ts">{tsSample}</CodeBlock>
        )}
      </Container>
    </section>
  );
}

