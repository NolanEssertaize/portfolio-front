import { ReactNode, HTMLAttributes } from "react";

interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  children: ReactNode;
  language?: string;
}

export default function CodeBlock({ children, language, className, ...props }: CodeBlockProps) {
  return (
    <pre className={`glass-subtle rounded-lg p-4 overflow-x-auto ${className ?? ""}`} {...props}>
      <code className={`font-mono text-sm ${language ? `language-${language}` : ""}`}>{children}</code>
    </pre>
  );
}
