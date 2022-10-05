// eslint-disable-next-line @typescript-eslint/no-var-requires
const getBranchName = require('current-git-branch');

const releasePrefix = 'release/';

export const getRelease = () => {
  /* istanbul ignore next */
  const branchName = getBranchName() || '';
  const release = branchName.replace(releasePrefix, '');
  return release;
};
