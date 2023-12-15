import { currentLocale, translateJS } from "../i18n/i18n";

const additionalMetaTags = [
  {
    name: "apple-mobile-web-app-title",
    content: translateJS("title"),
  },
  {
    name: "subject",
    content: translateJS("subject"),
  },
  {
    name: "author",
    content: translateJS("name"),
  },
  {
    name: "owner",
    content: translateJS("name"),
  },
  {
    name: "copyright",
    content: translateJS("name"),
  },
  {
    name: "language",
    content: currentLocale,
  },
];
const additionalLinkTags = [
  {
    rel: "manifest",
    href: `/manifest/manifest-${currentLocale}.json`,
  },
];

export { additionalLinkTags, additionalMetaTags };
