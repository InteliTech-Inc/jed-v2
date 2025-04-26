export const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${process.env.NEXT_PUBLIC_LIVE_URL}/about`,
  name: "About",
  description:
    "About JED EVENTS - A platform that simplifies online event management with user-friendly design, real-time voting, and affordable pricing.",
  url: `${process.env.NEXT_PUBLIC_LIVE_URL}/about`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${process.env.NEXT_PUBLIC_LIVE_URL}/about`,
    name: "About",
    description:
      "Learn more about JED EVENTS, the platform simplifying event management with a focus on ease of use, transparency, and affordability.",
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
  about: {
    "@type": "Thing",
    name: "JED EVENTS",
    description:
      "JED EVENTS is an intuitive, secure, and efficient platform designed to simplify online event management for organizers and participants. We specialize in voting, nominations, ticketing, and real-time results, making events seamless and accessible for everyone.",
  },
  keywords:
    "event management, online events, nominations, voting, ticketing, platform, JED, real-time voting transparency, affordable event platform, user-friendly event platform, secure event management, high-performance event platform, easy sign-up, intuitive interface, low-commission event platform",
  inLanguage: "en",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+233 599774425 | +233 538122885 | +233 559237619",
    contactType: "Customer Service",
    areaServed: "GH",
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kumasi, Ghana",
    addressLocality: "Kumasi",
    addressCountry: "GH",
  },
};
