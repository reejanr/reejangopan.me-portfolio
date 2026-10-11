import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { getHead, headToHtml, routes } from "./seo/seo";

export { routes };

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
