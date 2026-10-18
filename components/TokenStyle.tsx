import { rootCss } from "@/lib/design-tokens";
import { getTokens } from "@/lib/tokens";

/** Writes every design token onto :root. Values are validated, so nothing unsafe reaches CSS. */
export default async function TokenStyle() {
  const { values } = await getTokens();
  return <style id="design-tokens" dangerouslySetInnerHTML={{ __html: rootCss(values) }} />;
}
