// Remove trailing and leading slash, usually included in nodes
// returned by API
const getSlug = (path: string) => path.replace(/^\/|\/$/g, "");

export default getSlug;
