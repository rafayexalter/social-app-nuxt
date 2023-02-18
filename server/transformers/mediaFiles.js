export const mediaFileTransformer = (mediaFile) => {
  /**
   * Get tweet data and exclude extra data such as createdAt, updatedAt etc
   */
  return {
    id: mediaFile.id,
    url: mediaFile.url,
  };
};
