import { RichText } from "@payloadcms/richtext-lexical/react";

export function ArticleBody({ data }: { data: unknown }) {
  if (!data) return null;
  return (
    <div className="article-prose">
      <RichText data={data as never} />
    </div>
  );
}
