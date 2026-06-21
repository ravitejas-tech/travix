import type { FooterColumn as FooterColumnType } from "~/types/content.types";

interface FooterColumnProps {
  column: FooterColumnType;
}

export function FooterColumn({ column }: FooterColumnProps) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white">{column.title}</h4>
      <ul className="mt-4 flex flex-col gap-3">
        {column.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
