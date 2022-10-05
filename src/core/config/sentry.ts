import { getRelease } from '../../shared/utils';
import { SENTRY_DSN } from '../../shared/constants';

export default {
  dsn: SENTRY_DSN,
  environment: process.env.APP_ENV,
  release: getRelease(),
  tracesSampleRate: 0,
  beforeBreadcrumb: breadcrumb => {
    /* istanbul ignore next */
    if (breadcrumb?.data?.url.includes('nr-data.net')) {
      return null;
    }
    return breadcrumb;
  },
  beforeSend(event) {
    if (process.env.NODE_ENV === 'test') {
      /* istanbul ignore next */
      const exception = event.exception.values.length ? event.exception.values[0].value : '';
      event.fingerprint = [`test-${exception}`];
    }
    return event;
  },
};
