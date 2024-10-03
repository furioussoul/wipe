import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import { find, map, omit } from "lodash-es";
import { html, library, pages, project, successResponse } from "./data.ts";

export const handlers: any = [
  http.get("/api/chaibuilder/library", () => HttpResponse.json(successResponse(library))),
  http.get("/api/chaibuilder/assets", () => HttpResponse.json(successResponse([]))),
  http.get("/api/chaibuilder/block", () => HttpResponse.json(successResponse(html))),
  http.get("/api/chaibuilder/verify", () => HttpResponse.json(successResponse({}))),
  http.get("/api/chaibuilder/project", () => HttpResponse.json(successResponse(project))),
  http.get("/api/chaibuilder/pages", () =>
    HttpResponse.json(successResponse(map(pages, (page) => omit(page, ["blocks", "linkedSubpages", "project"])))),
  ),
  http.get("/api/chaibuilder/page", ({ request }) => {
    const url = new URL(request.url);
    const pageUuid = url.searchParams.get("uuid");
    const page = find(pages, { uuid: pageUuid });
    if (!page) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(
      successResponse({
        ...page,
        lockedBy: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          self: true,
        },
      }),
    );
  }),
  http.post("/api/chaibuilder/logout", () => HttpResponse.json(successResponse({}))),

  // update:
  http.put("/api/chaibuilder/project", () => HttpResponse.json(successResponse({}))),
  http.put("/api/chaibuilder/page", () => HttpResponse.json(successResponse({}))),

  // create, publish:
  http.post("/api/chaibuilder/publish", () => HttpResponse.json(successResponse({}))),
  http.post("/api/chaibuilder/upload", () => HttpResponse.json(successResponse({ url: faker.image.url() }))),
  http.post("/api/chaibuilder/pages", () => HttpResponse.json(successResponse({}))),
  http.post("/api/chaibuilder/authenticate", () => {
    return HttpResponse.json({ token: faker.string.uuid() });
  }),
  http.post("/api/chaibuilder/login", () => {
    return HttpResponse.json(
      successResponse({
        email: faker.internet.email(),
        accessToken: faker.string.uuid(),
        name: faker.internet.displayName(),
      }),
    );
  }),

  // delete:
  http.delete("/api/chaibuilder/page", () => HttpResponse.json(successResponse({}))),
];
