import { isEmpty } from "lodash-es";

export const hasVideoEmbed = (html: string): boolean => {
  // Regular expressions for YouTube and Vimeo URLs
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?(player)?.vimeo\.com/;

  // Check if the HTML contains a YouTube or Vimeo URL
  return youtubeRegex.test(html) || vimeoRegex.test(html);
};

export const getVideoURLFromHTML = (html: string): string => {
  if (isEmpty(html)) return html;
  // Regular expressions for video or iframe tags
  const videoTagRegex = /<video[^>]+src=['"]([^'">]+)['"]/;
  const iframeTagRegex = /<iframe[^>]+src=['"]([^'">]+)['"]/;

  // Extract the URL from the video or iframe tag
  const videoTagMatch = html.match(videoTagRegex);
  const iframeTagMatch = html.match(iframeTagRegex);

  const videoUrl = videoTagMatch ? videoTagMatch[1] : iframeTagMatch ? iframeTagMatch[1] : null;

  // Check if the URL is a YouTube URL or vimeo URL
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?player.vimeo\.com/;
  if (videoUrl && (youtubeRegex.test(videoUrl) || vimeoRegex.test(videoUrl))) {
    return videoUrl;
  }

  // If it's not a YouTube URL, return the HTML
  return html;
};
