export const getShareUrl = (token: string) => `/share/${token}`;
export const getApiShareEndpoint = (projectId:number, siteId:number) => `/api/projects/${projectId}/sites/${siteId}/share`