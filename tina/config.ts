import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
    basePath: "fuzzy-fest",
  },
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "band",
        label: "Bands",
        path: "public/content/bands",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            isTitle: true,
            required: true,
          },
        ],
      },
      {
        name: "festival",
        label: "Festivals",
        path: "public/content/festivals",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "website",
            label: "Website",
          },
          {
            type: "boolean",
            name: "isIndoor",
            label: "Indoor",
          },
          {
            label: "Dates",
            name: "dates",
            type: "object",
            fields: [
              {
                label: "Start",
                name: "start",
                type: "datetime",
              },
              {
                label: "End",
                name: "end",
                type: "datetime",
              },
            ],
          },
          {
            label: "Location",
            name: "location",
            type: "object",
            fields: [
              {
                label: "Country",
                name: "country",
                type: "string",
              },
              {
                label: "City",
                name: "city",
                type: "string",
              },
              {
                label: "Lat",
                name: "lat",
                type: "number",
              },
              {
                label: "Lon",
                name: "lon",
                type: "number",
              },
            ],
          },
          {
            label: "Lineup",
            name: "lineup",
            type: "string",
            list: true,
          },
        ],
      },
    ],
  },
});
