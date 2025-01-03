import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import "./i18n/config";
import "katex/dist/katex.min.css";

export const meta = () => {
  return [
    { title: "Crypto Visualization" },
    { name: "description", content: "Cryptography Algorithm Visualization" },
  ];
};

export const links: LinksFunction = () => [];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="min-h-screen bg-[#0D1117]">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
