import { CODEBASE } from '@/constants/route-pages.const';
import { NODE_ENVS } from '@/constants/shared.const';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { ErrorLayout } from '@/layouts/ErrorLayout';
import { Codebase } from '@/pages/Codebase';

const isDevelop = import.meta.env.VITE_NODE_ENV === NODE_ENVS.DEVELOP;

export default {
  children: [
    {
      element: <Codebase />,
      index: true,
    },
  ],
  element: isDevelop ? <DefaultLayout /> : <ErrorLayout />,
  meta: {
    requiresAuth: true,
    roles: [],
    title: 'Codebase',
  },
  path: CODEBASE,
};
