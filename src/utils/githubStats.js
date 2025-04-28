export async function fetchTotalLinesOfCode() {
  try {
    const response = await fetch('https://dnachavez.dev/github-stats.php');
    if (!response.ok) {
      throw new Error('Failed to fetch total lines of code');
    }
    const data = await response.json();
    const totalLines = data.totalLines;
    return totalLines > 1000 ? `${Math.round(totalLines / 1000)}k+` : totalLines.toString();
  } catch (error) {
    console.error('Error fetching total lines of code:', error);
    return 'Error';
  }
} 