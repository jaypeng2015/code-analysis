function persistIDMRules(idmPath, assuranceRuleConfig) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`persisting ${idmPath}`, { assuranceRuleConfig });
      resolve();
    }, 1000);
  });
}

async function persistRuleData(
  aspJobs,
  aspLongQueue,
  assuranceRuleConfig,
) {
  try {
    if (assuranceRuleConfig) {
      aspJobs.map(async (entry) => {
        const [, connectedSession] = entry;
        const aspLongJobId = connectedSession.jobData.jobId;
        const aspJob = await aspLongQueue.getJob(aspLongJobId);
        if (aspJob.returnvalue) {
          const idmPath = aspJob.returnvalue.aspCommonPath;
          await persistIDMRules(idmPath, assuranceRuleConfig);
        }
      })
      console.log('Data persisted successfully')
    } else {
      console.log('Nothing to persist')
    }
  } catch (error) {
    console.error({ error }, 'Error persisting rule data');
  }
}

const aspLongQueue = {
  getJob: (id) => ({
    returnvalue: { aspCommonPath: `mock ${id}` }
  })
};

(async () => {
  await persistRuleData([[1, { jobData: { jobId: 1 } }], [2, { jobData: { jobId: 2 } }]], aspLongQueue, { foo: 'bar' });
})();

