import { ref } from 'vue';
import { marked } from 'marked';
import type { MarkdownMeta } from '../types/markdown.ts';

export function useMarkdown() {
  const meta = ref<MarkdownMeta | null>(null);
  const html = ref<string>('');
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function loadMarkDown(slug: string) {
    try {
      loading.value = true;
      error.value = null;

      const res = await fetch(`/assets/logs/${slug}.md`);
      if (!res.ok) throw new Error('Markdown not found');

      const raw = await res.text();
      const { data, content } = parseFrontMatter(raw);

      meta.value = data as MarkdownMeta;
      html.value = await marked(content);
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  return { meta, html, loading, error, loadMarkDown }
}

function parseFrontMatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)/);

  if (!match) {
    return { data: {}, content: raw };
  }

  const [, yaml, content] = match;

  if (!yaml || !content) {
    return { data: {}, content: raw };
  }

  const data = Object.fromEntries(
    yaml.split('\n').map(line => {
      const [key, ...rest] = line.split(':')
      return [key?.trim(), rest.join(':').trim()]
    })
  );

  return { data, content };
}
