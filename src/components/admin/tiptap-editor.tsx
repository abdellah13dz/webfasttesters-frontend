'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { uploadArticleImage } from '@/lib/upload-article-image';
// Note: useState and useEffect are used by TiptapEditorInner
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Undo2,
  Redo2,
} from 'lucide-react';

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const ToolbarButton = ({
  onClick,
  isActive,
  children,
  title,
  disabled,
}: {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
  disabled?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    disabled={disabled}
    className={`p-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
      isActive
        ? 'bg-blue-500/15 text-blue-500'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
    }`}
  >
    {children}
  </button>
);

const ToolbarDivider = () => (
  <div className="w-px h-6 bg-border mx-1" />
);

// Inner component that uses Tiptap - only rendered on client
function TiptapEditorInner({ content, onChange, placeholder }: TiptapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  // Dynamic imports for tiptap to avoid SSR issues
  const [editor, setEditor] = useState<any>(null);
  const [EditorContent, setEditorContent] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    const initEditor = async () => {
      const { useEditor, EditorContent: EC } = await import('@tiptap/react');
      const StarterKit = (await import('@tiptap/starter-kit')).default;
      const Image = (await import('@tiptap/extension-image')).default;
      const Link = (await import('@tiptap/extension-link')).default;
      const Placeholder = (await import('@tiptap/extension-placeholder')).default;
      const Underline = (await import('@tiptap/extension-underline')).default;

      if (!mounted) return;

      setEditorContent(() => EC);

      // We need to create editor via useEditor pattern, but since we're
      // in useEffect, we'll use the imperative approach
      const { Editor } = await import('@tiptap/core');

      const instance = new Editor({
        extensions: [
          StarterKit.configure({
            heading: {
              levels: [1, 2, 3],
            },
          }),
          Image.configure({
            inline: false,
            allowBase64: true,
          }),
          Link.configure({
            openOnClick: false,
            HTMLAttributes: {
              class: 'text-blue-500 underline cursor-pointer',
            },
          }),
          Placeholder.configure({
            placeholder: placeholder || 'Start writing your article...',
          }),
          Underline,
        ],
        content: content || '<p></p>',
        onUpdate: ({ editor: ed }) => {
          onChange(ed.getHTML());
        },
        editorProps: {
          attributes: {
            class: 'tiptap-editor-content focus:outline-none min-h-[400px] px-6 py-4',
          },
        },
      });

      setEditor(instance);
    };

    initEditor();

    return () => {
      mounted = false;
      if (editor) {
        editor.destroy();
      }
    };
  }, []);

  const addImage = useCallback(() => {
    setImageUploadError(null);
    fileInputRef.current?.click();
  }, []);

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !editor) return;

      setUploadingImage(true);
      setImageUploadError(null);

      try {
        const url = await uploadArticleImage(file);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (error) {
        setImageUploadError(error instanceof Error ? error.message : 'Failed to upload image');
      } finally {
        setUploadingImage(false);
        event.target.value = '';
      }
    },
    [editor]
  );

  const addLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter the link URL:', previousUrl || '');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor || !EditorContent) {
    return (
      <div className="border border-border rounded-lg overflow-hidden bg-background">
        <div className="h-12 border-b border-border bg-muted/30" />
        <div className="min-h-[400px] px-6 py-4 flex items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex items-center flex-wrap gap-0.5 p-2 border-b border-border bg-muted/30">
        {/* Undo / Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        >
          <Undo2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
        >
          <Redo2 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Inline formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Underline"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Block elements */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Link & Image */}
        <ToolbarButton
          onClick={addLink}
          isActive={editor.isActive('link')}
          title="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={addImage}
          title="Upload image"
          disabled={uploadingImage}
        >
          {uploadingImage ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          ) : (
            <ImageIcon className="h-4 w-4" />
          )}
        </ToolbarButton>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(event) => void handleImageUpload(event)}
      />

      {imageUploadError && (
        <div className="border-b border-border bg-destructive/5 px-3 py-2 text-xs text-destructive">
          {imageUploadError}
        </div>
      )}

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}

export default function TiptapEditor(props: TiptapEditorProps) {
  // Check if we're on the client by using typeof window
  const isClient = typeof window !== 'undefined';

  if (!isClient) {
    return (
      <div className="border border-border rounded-lg overflow-hidden bg-background">
        <div className="h-12 border-b border-border bg-muted/30" />
        <div className="min-h-[400px] px-6 py-4 flex items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        </div>
      </div>
    );
  }

  return <TiptapEditorInner {...props} />;
}
