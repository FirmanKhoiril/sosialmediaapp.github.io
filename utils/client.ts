import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: "production",
  apiVersion: "2022-11-09",
  useCdn: false,
  ignoreBrowserTokenWarning: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
