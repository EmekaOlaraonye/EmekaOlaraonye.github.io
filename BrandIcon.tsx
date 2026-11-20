import React from 'react';
import { BRAND_MARKS } from './brandIcons';

/*
  The stack lists were text all the way down. A real mark beside a name is
  what makes a list of technologies read as a stack rather than as a
  sentence someone typed, and it is read faster - a reader recognises the
  Docker whale before they finish the word.

  Not every label has a mark and that is fine: concepts (Neural
  Collaborative Filtering, REST API Design) have no logo to use, and a few
  brands - AWS, Power BI - are not in Simple Icons because their owners
  restrict the mark. Those chips render as they always did, which is why
  this returns null rather than a placeholder.
*/
const ALIASES: Record<string, string> = {
  'node.js': 'nodedotjs',
  'fastify / express': 'fastify',
  'firestore': 'firebase',
  'firebase auth': 'firebase',
  'html5 / css': 'html5',
  'css modules': 'css',
  'google cloud run': 'googlecloud',
  'cloud run': 'googlecloud',
  'r / spss': 'r',
  'java': 'openjdk',
  'javascript / typescript': 'javascript'
};

export const markFor = (label: string): string | null => {
  const key = label.trim().toLowerCase();
  const slug = ALIASES[key] ?? key.replace(/[\s.+/-]/g, '');
  return BRAND_MARKS[slug] ? slug : null;
};

const BrandIcon = ({ name, size = 13 }: { name: string; size?: number }) => {
  const slug = markFor(name);
  if (!slug) return null;
  const mark = BRAND_MARKS[slug];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className="brand-mark shrink-0"
      style={{ ['--tint' as string]: mark.tint }}
    >
      <path d={mark.path} fill="currentColor" />
    </svg>
  );
};

export default BrandIcon;
