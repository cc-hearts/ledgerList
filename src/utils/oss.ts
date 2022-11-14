import { getPreviewPath } from '../api/index';
export async function getImagePreviewPath(fileName: string): Promise<string> {
  const { data } = await getPreviewPath({ fileName });
  return data?.path || '';
}
