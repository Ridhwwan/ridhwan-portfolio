import { waterEngine } from "./water-engine";

/**
 * The water ripple over the whole site (see ./water-engine.js for how it works).
 *
 * The engine is self-contained JavaScript written straight into the page, so it
 * starts the moment the HTML arrives instead of waiting for the app's scripts
 * to download and React to start. About 4.5 KB gzipped.
 */
const INLINE = `(${waterEngine.toString()})();`;

export default function WaterRipple() {
  return <script dangerouslySetInnerHTML={{ __html: INLINE }} />;
}
