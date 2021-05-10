const childProcess = require('child_process');

async function setCommitHash() {
  return childProcess.exec('git rev-parse HEAD', (_err, stdout) => {
    process.env.COMMIT_HASH = stdout.replace(/[\n\r]+/g, '');
  });
}

module.exports = setCommitHash;
