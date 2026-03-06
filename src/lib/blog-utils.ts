import GithubSlugger from 'github-slugger';

export type TocItem = {
    id: string;
    text: string;
    level: number; // 2 for ##, 3 for ###
};

export function extractHeadings(content: string): TocItem[] {
    const headings: TocItem[] = [];
    const lines = content.split('\n');
    const slugger = new GithubSlugger();

    for (const line of lines) {
        const match = line.match(/^(#{2,3})\s+(.+)$/);
        if (match) {
            const level = match[1].length;
            const text = match[2].trim();
            const id = slugger.slug(text);
            headings.push({ id, text, level });
        }
    }

    return headings;
}
