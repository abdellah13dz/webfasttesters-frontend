'use client';

import { useEffect, useState } from 'react';
import { Code2, Eye, PenLine } from 'lucide-react';
import TiptapEditor from '@/components/admin/tiptap-editor';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isHtmlArticleContent } from '@/lib/article-content';

type ContentMode = 'visual' | 'html' | 'preview';

interface ArticleContentEditorProps {
  content: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Changes when article data loads so the visual editor remounts with fetched content */
  contentKey?: string;
}

export function ArticleContentEditor({
  content,
  onChange,
  placeholder,
  contentKey = 'new',
}: ArticleContentEditorProps) {
  const [mode, setMode] = useState<ContentMode>('visual');
  const [htmlDraft, setHtmlDraft] = useState(content);
  const [hasUserPickedMode, setHasUserPickedMode] = useState(false);

  useEffect(() => {
    setHtmlDraft(content);
  }, [content]);

  useEffect(() => {
    if (hasUserPickedMode || !content.trim()) return;
    if (isHtmlArticleContent(content)) {
      setMode('html');
    }
  }, [content, hasUserPickedMode]);

  const handleModeChange = (next: string) => {
    const nextMode = next as ContentMode;
    setHasUserPickedMode(true);

    if (nextMode === 'html') {
      setHtmlDraft(content);
    }

    if (nextMode === 'visual' && mode === 'html') {
      onChange(htmlDraft);
    }

    setMode(nextMode);
  };

  const handleHtmlChange = (value: string) => {
    setHtmlDraft(value);
    onChange(value);
  };

  return (
    <Tabs value={mode} onValueChange={handleModeChange} className="w-full gap-0">
      <div className="flex flex-col gap-2 border-b border-border bg-muted/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <TabsList>
          <TabsTrigger value="visual" className="gap-1.5">
            <PenLine className="size-3.5" />
            Visual
          </TabsTrigger>
          <TabsTrigger value="html" className="gap-1.5">
            <Code2 className="size-3.5" />
            HTML
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-1.5">
            <Eye className="size-3.5" />
            Preview
          </TabsTrigger>
        </TabsList>
        <p className="text-xs text-muted-foreground">
          Use the HTML tab to paste or edit a full article body. It is saved and published as-is.
        </p>
      </div>

      <TabsContent value="visual" className="mt-0">
        <TiptapEditor
          key={`visual-${contentKey}`}
          content={content}
          onChange={onChange}
          placeholder={placeholder}
        />
      </TabsContent>

      <TabsContent value="html" className="mt-0 px-4 py-4 sm:px-6 sm:py-6">
        <Textarea
          value={htmlDraft}
          onChange={(event) => handleHtmlChange(event.target.value)}
          placeholder={'<h2>Section title</h2>\n<p>Your article HTML...</p>'}
          className="min-h-[480px] resize-y font-mono text-sm leading-relaxed"
          spellCheck={false}
        />
      </TabsContent>

      <TabsContent value="preview" className="mt-0 px-4 py-4 sm:px-6 sm:py-6">
        <div className="min-h-[480px] rounded-lg border border-border bg-background p-4 sm:p-6">
          {htmlDraft.trim() ? (
            <div
              className="tiptap-editor-content blog-article-content"
              dangerouslySetInnerHTML={{ __html: htmlDraft }}
            />
          ) : (
            <p className="text-sm text-muted-foreground">No content to preview yet.</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
