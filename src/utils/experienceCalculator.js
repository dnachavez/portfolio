export function calculateTotalExperience(jobs) {
  const workedMonths = new Set();
  
  jobs.forEach(job => {
    const startDate = new Date(job.jobTime.split(' - ')[0]);
    const endDate = job.jobTime.includes('Present') ? new Date() : new Date(job.jobTime.split(' - ')[1]);
    
    const start = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    
    let current = new Date(start);
    while (current <= end) {
      workedMonths.add(`${current.getFullYear()}-${current.getMonth()}`);
      current.setMonth(current.getMonth() + 1);
    }
  });
  
  const totalMonths = workedMonths.size;
  return Math.floor(totalMonths / 12);
} 