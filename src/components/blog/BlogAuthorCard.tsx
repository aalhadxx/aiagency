import Image from 'next/image';
import { getAuthorObject, type Author } from '@/lib/blog';

type BlogAuthorCardProps = {
    author: string | Author;
};

export function BlogAuthorCard({ author }: BlogAuthorCardProps) {
    const a = getAuthorObject(author);

    return (
        <div className="flex gap-4 p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
            {a.avatar ? (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                        src={a.avatar}
                        alt={a.name}
                        fill
                        className="object-cover"
                    />
                </div>
            ) : (
                <div className="w-16 h-16 rounded-xl bg-oc-cyan/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-display font-bold text-oc-cyan">
                        {a.name.charAt(0)}
                    </span>
                </div>
            )}
            <div>
                <p className="font-display font-semibold text-oc-cream">{a.name}</p>
                {a.role && (
                    <p className="text-sm text-oc-cyan mb-1">{a.role}</p>
                )}
                {a.bio && (
                    <p className="text-sm text-oc-cream-muted">{a.bio}</p>
                )}
            </div>
        </div>
    );
}
