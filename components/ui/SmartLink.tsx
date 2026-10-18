import Link from "next/link";

/** True for links that leave the site (http/https/mailto). */
export const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);

type Props = React.ComponentPropsWithoutRef<"a"> & { href: string };

/**
 * One link for the whole site: on-site paths use client navigation,
 * anything else opens in a new tab.
 */
export default function SmartLink({ href, children, ...rest }: Props) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
