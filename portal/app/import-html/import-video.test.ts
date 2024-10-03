import { getVideoURLFromHTML, hasVideoEmbed } from "./import-video.ts";

describe("hasVideoEmbed", () => {
  it("returns true for valid YouTube URLs within iframe tag", () => {
    expect(hasVideoEmbed('<iframe src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"></iframe>')).toBe(true);
    expect(hasVideoEmbed('<iframe src="https://youtu.be/dQw4w9WgXcQ"></iframe>')).toBe(true);
  });

  it("returns true for valid Vimeo URLs within iframe tag", () => {
    expect(hasVideoEmbed('<iframe src="https://vimeo.com/76979871"></iframe>')).toBe(true);
  });

  it("returns true for valid YouTube URLs within video tag", () => {
    expect(hasVideoEmbed('<video src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"></video>')).toBe(true);
    expect(hasVideoEmbed('<video src="https://youtu.be/dQw4w9WgXcQ"></video>')).toBe(true);
  });

  it("returns true for valid Vimeo URLs within video tag", () => {
    expect(hasVideoEmbed('<video src="https://vimeo.com/76979871"></video>')).toBe(true);
  });

  it("returns false for invalid YouTube URLs", () => {
    expect(hasVideoEmbed('<iframe src="https://www.youtube.com/watch?v=invalid"></iframe>')).toBe(false);
  });

  it("returns false for non-video URLs", () => {
    expect(hasVideoEmbed('<iframe src="https://www.github.com"></iframe>')).toBe(false);
  });

  it("returns false for empty strings", () => {
    expect(hasVideoEmbed("")).toBe(false);
  });

  it("returns false for null", () => {
    expect(hasVideoEmbed(null)).toBe(false);
  });
  it("returns false for invalid html", () => {
    expect(hasVideoEmbed(`<div><h1>No url</h1></div>`)).toBe(false);
  });
});

describe("getVideoURLFromHTML", () => {
  it("returns YouTube URL for valid YouTube iframe", () => {
    const html = `<iframe width="1188" height="668" src="https://www.youtube.com/embed/cxtThNNS-w8" title="Navi Mumbai International Airport 2024 Progress | DB Patil International Airport" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    expect(getVideoURLFromHTML(html)).toBe("https://www.youtube.com/embed/cxtThNNS-w8");
  });

  it("returns null for invalid YouTube iframe", () => {
    const html = '<iframe src="https://www.youtube.com/watch?v=invalid"></iframe>';
    expect(getVideoURLFromHTML(html)).toBe(html);
  });

  it("returns original HTML for non-video iframe", () => {
    const html = '<iframe src="https://www.github.com"></iframe>';
    expect(getVideoURLFromHTML(html)).toBe(html);
  });

  it("returns empty string for empty string", () => {
    expect(getVideoURLFromHTML("")).toBe("");
  });

  it("returns null for invalid HTML", () => {
    const html = `<div><h1>No url</h1></div>`;
    expect(getVideoURLFromHTML(html)).toBe(html);
  });

  it("returns video URL for valid video tag", () => {
    const html = '<video src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"></video>';
    expect(getVideoURLFromHTML(html)).toBe("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  });

  it("returns null for invalid video tag", () => {
    const html = '<video src="https://www.youtube.com/watch?v=invalid"></video>';
    expect(getVideoURLFromHTML(html)).toBe(html);
  });

  it("returns original HTML for non-video tag", () => {
    const html = '<video src="https://www.github.com"></video>';
    expect(getVideoURLFromHTML(html)).toBe(html);
  });
});
