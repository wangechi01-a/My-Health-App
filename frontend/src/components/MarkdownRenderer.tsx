import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  components?: any;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
  components
}) => {
  const defaultComponents = {
    // Headings
    h1: ({ children, ...props }: any) => (
      <h1 className="text-3xl font-bold mb-4 mt-6" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="text-2xl font-semibold mb-3 mt-5" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="text-xl font-semibold mb-2 mt-4" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: any) => (
      <h4 className="text-lg font-medium mb-2 mt-3" {...props}>
        {children}
      </h4>
    ),
    
    // Paragraphs
    p: ({ children, ...props }: any) => (
      <p className="mb-4 leading-relaxed text-gray-700" {...props}>
        {children}
      </p>
    ),
    
    // Lists
    ul: ({ children, ...props }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-1" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="text-gray-700" {...props}>
        {children}
      </li>
    ),
    
    // Links
    a: ({ children, href, ...props }: any) => (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    
    // Code blocks
    code: ({ children, className, ...props }: any) => {
      const isInline = !className;
      return isInline ? (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      ) : (
        <code className="block bg-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto" {...props}>
          {children}
        </code>
      );
    },
    
    // Blockquotes
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4" {...props}>
        {children}
      </blockquote>
    ),
    
    // Strong and emphasis
    strong: ({ children, ...props }: any) => (
      <strong className="font-semibold" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }: any) => (
      <em className="italic" {...props}>
        {children}
      </em>
    ),
    
    // Horizontal rule
    hr: ({ ...props }: any) => (
      <hr className="my-6 border-gray-300" {...props} />
    ),
    
    // Tables
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-gray-300" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: any) => (
      <thead className="bg-gray-50" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }: any) => (
      <tbody {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }: any) => (
      <tr className="border-b border-gray-300" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }: any) => (
      <th className="px-4 py-2 text-left font-semibold" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="px-4 py-2" {...props}>
        {children}
      </td>
    ),
  };

  return (
    <div className={cn("prose prose-gray max-w-none", className)}>
      <ReactMarkdown
        components={{ ...defaultComponents, ...components }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}; 