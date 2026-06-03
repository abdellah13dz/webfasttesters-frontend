'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface CmsMarkdownPageProps {
  title: string;
  content: string;
  badge?: string;
}

export function CmsMarkdownPage({ title, content, badge = 'Legal' }: CmsMarkdownPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/5" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 text-center">
          <Badge
            variant="outline"
            className="mb-6 border-blue-400/30 text-blue-400 bg-blue-400/10 px-4 py-1.5 text-sm"
          >
            <Shield className="h-4 w-4 mr-1" />
            {badge}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
        <Card className="border border-border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 sm:p-10 prose prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
