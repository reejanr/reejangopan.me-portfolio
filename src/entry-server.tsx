import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { getHead, headToHtml, routes, sitemapRoutes } from "./seo/seo";

export { routes, sitemapRoutes };
export { llmsTxt, llmsFullTxt } from "./seo/llms";

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}

export function head(url: string) {
  return headToHtml(getHead(url));
}
