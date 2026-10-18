import { ArrowUpRight } from "lucide-react";
import SmartLink from "./SmartLink";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  /** Show the ↗ arrow. Defaults to on for outline buttons. */
  arrow?: boolean;
};

/** The site's button, as a link. External hrefs open in a new tab. */
export default function ButtonLink({ href, children, variant = "solid", arrow }: Props) {
  const showArrow = arrow ?? variant === "outline";
  return (
    <SmartLink href={href} className={`btn ${variant === "outline" ? "btn-outline" : ""}`}>
      {children}
      {showArrow && <ArrowUpRight aria-hidden strokeWidth={2} />}
    </SmartLink>
  );
}
