import { readFileSync } from "fs";
import { join } from "path";
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import { i18n } from "../i18n";
import style from "./styles/footer.scss";

function getQuartzVersion(): string {
  try {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf-8"));
    return pkg.version ?? "";
  } catch {
    return "";
  }
}

export interface FooterOptions {
  links?: Record<string, string>;
  footerLink?: {
    title: string;
    url: string;
  };
}

export default ((opts?: FooterOptions) => {
  const version = getQuartzVersion();

  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear();
    const links = opts?.links ?? {};
    const footerLink = opts?.footerLink;
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          {footerLink ? (
            <>
              &copy; <a href={footerLink.url}>{footerLink.title}</a> {year}
              <br />
            </>
          ) : null}
          {i18n(cfg?.locale ?? "en-US").components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz{version ? ` v${version}` : ""}</a>
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    );
  };

  Footer.css = style;
  return Footer;
}) satisfies QuartzComponentConstructor;
