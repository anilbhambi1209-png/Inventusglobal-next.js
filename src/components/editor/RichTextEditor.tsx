'use client';

import React, { useCallback, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Code,
  Loader2,
} from 'lucide-react';
import styles from './editor.module.css';
import { compressImage } from '@/utils/imageCompressor';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Write your article here...',
}: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        'data-placeholder': placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter website URL:', previousUrl || 'https://');

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const handleImageButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile || !editor) return;

    try {
      setIsUploading(true);
      // Auto-compress large images down to web-optimized WebP (~150KB)
      const file = await compressImage(rawFile);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        editor.chain().focus().setImage({ src: data.url }).run();
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err: any) {
      console.error('Image upload error in editor:', err);
      alert('Error uploading image');
    } finally {
      setIsUploading(false);
      // Reset input value so same image can be re-uploaded if desired
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Sync external resets if needed
  React.useEffect(() => {
    if (editor && content !== editor.getHTML() && content === '') {
      editor.commands.setContent('');
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div
        className={styles.editorWrapper}
        style={{
          minHeight: '320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ color: '#94a3b8' }}>Loading Rich Text Editor...</span>
      </div>
    );
  }

  return (
    <div className={styles.editorWrapper}>
      {/* Hidden file input for native image uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <div className={styles.toolbar}>
        {/* Undo / Redo */}
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className={styles.toolButton}
            title="Undo"
          >
            <Undo size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className={styles.toolButton}
            title="Redo"
          >
            <Redo size={15} />
          </button>
        </div>

        <div className={styles.divider} />

        {/* Headings */}
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`${styles.toolButton} ${editor.isActive('heading', { level: 2 }) ? styles.isActive : ''}`}
            title="Heading 2 (H2)"
          >
            <Heading2 size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`${styles.toolButton} ${editor.isActive('heading', { level: 3 }) ? styles.isActive : ''}`}
            title="Heading 3 (H3)"
          >
            <Heading3 size={16} />
          </button>
        </div>

        <div className={styles.divider} />

        {/* Text Formats */}
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${styles.toolButton} ${editor.isActive('bold') ? styles.isActive : ''}`}
            title="Bold"
          >
            <Bold size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${styles.toolButton} ${editor.isActive('italic') ? styles.isActive : ''}`}
            title="Italic"
          >
            <Italic size={15} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`${styles.toolButton} ${editor.isActive('code') ? styles.isActive : ''}`}
            title="Inline Code"
          >
            <Code size={15} />
          </button>
        </div>

        <div className={styles.divider} />

        {/* Lists & Quote */}
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${styles.toolButton} ${editor.isActive('bulletList') ? styles.isActive : ''}`}
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${styles.toolButton} ${editor.isActive('orderedList') ? styles.isActive : ''}`}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${styles.toolButton} ${editor.isActive('blockquote') ? styles.isActive : ''}`}
            title="Quote"
          >
            <Quote size={15} />
          </button>
        </div>

        <div className={styles.divider} />

        {/* Insert Media & Links */}
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={setLink}
            className={`${styles.toolButton} ${editor.isActive('link') ? styles.isActive : ''}`}
            title="Add Link"
          >
            <LinkIcon size={15} />
          </button>
          <button
            type="button"
            onClick={handleImageButtonClick}
            disabled={isUploading}
            className={`${styles.toolButton} ${isUploading ? styles.isActive : ''}`}
            title="Upload Image from Computer"
          >
            {isUploading ? <Loader2 size={15} className="animate-spin" /> : <ImageIcon size={15} />}
          </button>
        </div>
      </div>

      <EditorContent editor={editor} className={styles.contentArea} />
    </div>
  );
}
