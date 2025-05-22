
"use client";

import Link, { LinkProps } from "next/link";

interface TextLinksProps extends LinkProps {
  texto: string;
  alt?: string;
}

export default function TextoLink({ texto, href, ...rest }: TextLinksProps) {
  return (
    <>
      <Link href={href} {...rest}>
        <div className="text-2xl text-white no-underline text-left hover:text-primaria">
          {texto}
        </div>
        
      </Link>
    </>
  );
}
