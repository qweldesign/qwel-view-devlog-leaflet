export interface MarkdownMeta {
  date: string
  title: string
}

export interface Markdown {
  meta: MarkdownMeta
  html: string
}
