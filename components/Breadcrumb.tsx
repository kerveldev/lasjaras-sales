import { ChevronRightIcon } from '@heroicons/react/24/solid';

type BreadcrumbProps = {
    items: { label: string; href?: string }[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center mb-2" aria-label="Breadcrumb">
            {items.map((item, idx) => (
                <span key={idx} className="flex items-center">
          {idx > 0 && (
              <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2" />
          )}
                    {item.href ? (
                        <a
                            href={item.href}
                            className="text-sm text-gray-500 hover:text-[#bb8856] transition underline-offset-4"
                        >
                            {item.label}
                        </a>
                    ) : (
                        <span className="text-sm font-semibold text-gray-900">{item.label}</span>
                    )}
        </span>
            ))}
        </nav>
    );
}
