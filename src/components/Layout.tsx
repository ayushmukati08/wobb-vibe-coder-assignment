import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ShortlistPanel } from "./ShortlistPanel";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 border-b pb-4">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
            Influencer Search
          </Link>
          {title && <h1 className="text-2xl mt-2">{title}</h1>}
        </header>
        <main>
          <ShortlistPanel />
          {children}
        </main>
      </div>
    </div>
  );
}
