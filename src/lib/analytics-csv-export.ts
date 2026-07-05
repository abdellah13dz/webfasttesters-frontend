/**
 * Build and download a multi-section CSV report from admin analytics API data.
 */

export interface AnalyticsCsvDailyStat {
  date: string;
  events: number;
  pageViews: number;
  ctaClicks: number;
  uniqueVisitors: number;
}

export interface AnalyticsCsvNamedCount {
  name: string;
  count: number;
}

export interface AnalyticsCsvCountryStat {
  code: string;
  name: string;
  visits: number;
  uniqueVisitors: number;
}

export interface AnalyticsCsvData {
  range: { from: string; to: string };
  summary: {
    totalEvents: number;
    pageViews: number;
    uniqueVisitors: number;
    uniqueSessions: number;
    ctaClicks: number;
    formSubmissions: number;
    avgPagesPerVisitor: number;
    bounceRate: number;
    trackedWithVisitorId: number;
  };
  eventsByType: Record<string, number>;
  pageViews: Record<string, number>;
  ctaClicks: Record<string, number>;
  dailyStats: AnalyticsCsvDailyStat[];
  countries: AnalyticsCsvCountryStat[];
  devices: AnalyticsCsvNamedCount[];
  browsers: AnalyticsCsvNamedCount[];
  referrers: AnalyticsCsvNamedCount[];
  languages: AnalyticsCsvNamedCount[];
  cities: AnalyticsCsvNamedCount[];
}

function escapeCsvCell(value: string | number | null | undefined): string {
  const str = value == null ? '' : String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function row(...cells: (string | number | null | undefined)[]): string {
  return cells.map(escapeCsvCell).join(',');
}

function blankLine(): string {
  return '';
}

function sectionTitle(title: string): string {
  return row(title);
}

function formatEventType(type: string): string {
  return type
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function sortedEntries(map: Record<string, number>): Array<[string, number]> {
  return Object.entries(map).sort(([, a], [, b]) => b - a);
}

export function buildAnalyticsCsv(data: AnalyticsCsvData): string {
  const lines: string[] = [];
  const exportedAt = new Date().toISOString();

  lines.push(sectionTitle('Fast Testers — Analytics Export'));
  lines.push(row('Exported At', exportedAt));
  lines.push(row('Date From', data.range.from));
  lines.push(row('Date To', data.range.to));
  lines.push(blankLine());

  lines.push(sectionTitle('Summary'));
  lines.push(row('Metric', 'Value'));
  lines.push(row('Unique Visitors', data.summary.uniqueVisitors));
  lines.push(row('Page Views', data.summary.pageViews));
  lines.push(row('Sessions', data.summary.uniqueSessions));
  lines.push(row('CTA Clicks', data.summary.ctaClicks));
  lines.push(row('Form Submissions', data.summary.formSubmissions));
  lines.push(row('Bounce Rate (%)', data.summary.bounceRate));
  lines.push(row('Avg Pages / Visitor', data.summary.avgPagesPerVisitor));
  lines.push(row('Total Events', data.summary.totalEvents));
  lines.push(row('Countries Detected', data.countries.length));
  lines.push(row('Events With Visitor ID', data.summary.trackedWithVisitorId));
  lines.push(blankLine());

  lines.push(sectionTitle('Traffic Over Time'));
  lines.push(row('Date', 'Events', 'Page Views', 'Unique Visitors', 'CTA Clicks'));
  for (const day of data.dailyStats) {
    lines.push(
      row(day.date, day.events, day.pageViews, day.uniqueVisitors, day.ctaClicks)
    );
  }
  lines.push(blankLine());

  lines.push(sectionTitle('Events By Type'));
  lines.push(row('Event Type', 'Count'));
  for (const [type, count] of sortedEntries(data.eventsByType)) {
    lines.push(row(formatEventType(type), count));
  }
  lines.push(blankLine());

  lines.push(sectionTitle('Countries'));
  lines.push(row('Rank', 'Code', 'Country', 'Visits', 'Unique Visitors'));
  data.countries.forEach((c, i) => {
    lines.push(row(i + 1, c.code, c.name, c.visits, c.uniqueVisitors));
  });
  lines.push(blankLine());

  lines.push(sectionTitle('Devices'));
  lines.push(row('Rank', 'Device', 'Count'));
  data.devices.forEach((d, i) => {
    lines.push(row(i + 1, d.name, d.count));
  });
  lines.push(blankLine());

  lines.push(sectionTitle('Browsers'));
  lines.push(row('Rank', 'Browser', 'Count'));
  data.browsers.forEach((b, i) => {
    lines.push(row(i + 1, b.name, b.count));
  });
  lines.push(blankLine());

  lines.push(sectionTitle('Top Referrers'));
  lines.push(row('Rank', 'Referrer', 'Count'));
  data.referrers.forEach((r, i) => {
    lines.push(row(i + 1, r.name, r.count));
  });
  lines.push(blankLine());

  lines.push(sectionTitle('Languages'));
  lines.push(row('Rank', 'Language', 'Count'));
  data.languages.forEach((l, i) => {
    lines.push(row(i + 1, l.name, l.count));
  });
  lines.push(blankLine());

  lines.push(sectionTitle('Cities'));
  lines.push(row('Rank', 'City', 'Count'));
  data.cities.forEach((c, i) => {
    lines.push(row(i + 1, c.name, c.count));
  });
  lines.push(blankLine());

  lines.push(sectionTitle('Top Pages'));
  lines.push(row('Rank', 'Page', 'Views'));
  sortedEntries(data.pageViews).forEach(([page, views], i) => {
    lines.push(row(i + 1, page, views));
  });
  lines.push(blankLine());

  lines.push(sectionTitle('Top CTAs'));
  lines.push(row('Rank', 'CTA Element', 'Clicks'));
  sortedEntries(data.ctaClicks).forEach(([element, clicks], i) => {
    lines.push(row(i + 1, element, clicks));
  });

  return lines.join('\r\n');
}

export function downloadAnalyticsCsv(data: AnalyticsCsvData): void {
  const csv = buildAnalyticsCsv(data);
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `fasttesters-analytics_${data.range.from}_${data.range.to}.csv`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
