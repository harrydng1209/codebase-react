import { HEALTH_CHECK } from '@/constants/route-apis.const';
import { SELECTORS } from '@/constants/shared.const';
import { get } from '@/libs/axios/util';

export const healthCheck = async () => {
  const url = HEALTH_CHECK;
  return await get<unknown>(
    url,
    undefined,
    SELECTORS.APIS_SECTION,
    'All systems are go! Health check successful',
  );
};
