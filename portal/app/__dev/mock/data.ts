import { faker } from "@faker-js/faker";

const projectUuid = faker.string.uuid();
const homepageUuid = "66d974b4-8f0a-4907-b83c-f4f15cb9a393";

export const successResponse = (data) => ({ result: "success", data });
export const errorResponse = (data = {}) => ({ result: "error", data });
export const project = {
  uuid: projectUuid,
  name: faker.lorem.words(1),
  description: faker.lorem.words(10),
  brandingOptions: {
    bodyFont: "Inter",
    headingFont: "Inter",
    primaryColor: "#0568cc",
    roundedCorners: 5,
    secondaryColor: "#c506cb",
    bodyBgDarkColor: "#031022",
    bodyBgLightColor: "#fcfcfc",
    bodyTextDarkColor: "#ffffff",
    bodyTextLightColor: "#000000",
  },
  favicon: faker.image.url(),
  primaryLanguage: "en",
  languages: ["en"],
  password: faker.internet.password(),
  homepage: homepageUuid,
  seoData: {
    title: faker.lorem.words(10),
    description: faker.lorem.words(10),
    keywords: faker.lorem.words(10),
    image: faker.image.url(),
    socialMediaImage: faker.image.url(),
  },
};
export const pages = [
  {
    uuid: homepageUuid,
    name: "Homepage",
    slug: "/",
    providers: [{ providerKey: "hero", args: {} }],
    blocks: [
      {
        _id: "b",
        _type: "CustomBlock",
        _bindings: { content: "hero.heading" },
        content: "Visual Content",
      },
    ],
    seoData: {
      title: faker.lorem.words(10),
      description: faker.lorem.words(10),
      keywords: faker.lorem.words(10),
      image: faker.image.url(),
      socialMediaImage: faker.image.url(),
    },
    project: projectUuid,
    type: "STATIC", // "DYNAMIC", "SUBPAGE",
    linkedSubpages: [],
    lockedBy: null,
  },
  {
    uuid: "ede74e63-eb08-4d39-8480-f993becca999",
    name: "About",
    slug: "/about",
    blocks: [],
    seoData: {
      title: faker.lorem.words(10),
      description: faker.lorem.words(20),
      keywords: faker.lorem.words(10),
      image: faker.image.url(),
      socialMediaImage: faker.image.url(),
    },
    project: projectUuid,
    type: "STATIC", // "TEMPLATE", "SUBPAGE",
    linkedSubpages: [],
    lockedBy: null,
  },
];
export const library = [
  {
    uuid: "ab-a-button-on-gradient-bg",
    name: "A button on gradient background",
    format: "html",
    preview:
      "https://ik.imagekit.io/n0uvizrukm2/BLOCKS/Screenshot%202023-10-21%20at%208.46.54%20PM_RijwduiDm.png?updatedAt=1697901423855",
    group: "announcement",
  },
];
export const html = `
    <!-- Announcement Banner -->
    <div class="bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500">
      <div class="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
        <!-- Grid -->
        <div class="grid justify-center md:grid-cols-2 md:justify-between md:items-center gap-2">
          <div class="text-center md:text-left">
            <p class="text-xs text-white/[.8] uppercase tracking-wider">
              Preview of Preline
            </p>
            <p class="mt-1 text-white font-medium">
              Sign up to get unlimited updates. No credit card required.
            </p>
          </div>
          <!-- End Col -->

          <div class="mt-3 text-center md:text-left md:flex md:justify-end md:items-center">
            <a class="py-3 px-6 inline-flex justify-center items-center gap-2 rounded-full font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary-600 transition-all text-sm" href="#">
              Sign up free
            </a>
          </div>
          <!-- End Col -->
        </div>
        <!-- End Grid -->
      </div>
    </div>
    `;
