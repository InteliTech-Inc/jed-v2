export const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${process.env.NEXT_PUBLIC_LIVE_URL}/`,
  name: "Home",
  description:
    "Manage your online events seamlessly with our platform. We offer nominations, voting, ticketing, and more—all in one place.",
  url: `${process.env.NEXT_PUBLIC_LIVE_URL}/`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${process.env.NEXT_PUBLIC_LIVE_URL}/`,
    name: "Home",
    description:
      "A platform that simplifies the management of online events for global audiences. Manage nominations, voting, ticketing, and more—all in one place.",
  },
  publisher: {
    "@type": "Organization",
    name: "JED EVENTS",
    logo: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_LIVE_URL}/images/logo.png`,
    },
  },
  datePublished: new Date(),
  dateModified: new Date(),
  offers: {
    "@type": "Service",
    serviceType: "Event Management Platform",
    provider: {
      "@type": "Organization",
      name: "JED EVENTS",
    },
    description:
      "Our platform provides a seamless experience for managing online events, including nominations, voting, ticketing, and more.",
    url: `${process.env.NEXT_PUBLIC_LIVE_URL}/about`,
    priceCurrency: "GHS",
    price: "Varies",
    eligibleRegion: {
      "@type": "Place",
      name: "Global",
    },
  },
  about: {
    "@type": "Thing",
    name: "Event Management",
    description:
      "We make managing online events easier, with a platform that allows you to handle nominations, voting, ticketing, and more—all in one place.",
  },
  keywords:
    "event management, online events, nominations, voting, ticketing, platform, JED",
  inLanguage: "en",
  author: [
    {
      "@type": "Person",
      name: "Evans Elabo",
      url: `https://ng-elabo.vercel.app`,
      image: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_LIVE_URL}/images/small_god.jpg`,
        caption: "Evans Elabo photo",
      },
    },
    {
      "@type": "Person",
      name: "Joshua Richardson Owusu",
    },
    {
      "@type": "Person",
      name: "Nana Kwesi Asante",
      url: `${process.env.NEXT_PUBLIC_LIVE_URL}/author/author3`,
    },
    {
      "@type": "Person",
      name: "Diabene Yaw Addo",
      url: `https://www.diabeney.xyz/`,
    },
  ],
};
