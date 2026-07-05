import { jsPDF } from 'jspdf';
import { APP_URL } from '@/lib/app-urls';
import { SITE_URL } from '@/lib/site-url';

export interface ChecklistPdfContent {
  title: string;
  description: string;
  items: string[];
  sectionSetup: string;
  sectionTesting: string;
  sectionLaunch: string;
  ctaTitle: string;
  ctaBody: string;
  footerTagline: string;
  filename: string;
  isRtl?: boolean;
}

const BRAND_BLUE: [number, number, number] = [37, 99, 235];
const BRAND_BLUE_LIGHT: [number, number, number] = [239, 246, 255];
const TEXT_DARK: [number, number, number] = [15, 23, 42];
const TEXT_MUTED: [number, number, number] = [100, 116, 139];
const BORDER: [number, number, number] = [226, 232, 240];

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 18;
const CONTENT_W = PAGE_W - MARGIN * 2;

const SECTION_RANGES = [
  { start: 0, end: 6, key: 'setup' as const },
  { start: 7, end: 9, key: 'testing' as const },
  { start: 10, end: 13, key: 'launch' as const },
];

async function loadLogoBase64(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  try {
    const res = await fetch(`${window.location.origin}/logo/android-chrome-192x192.png`);
    if (!res.ok) return null;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function drawPageFooter(doc: jsPDF, pageNum: number, totalPages: number, tagline: string, isRtl: boolean) {
  const y = PAGE_H - 12;
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y - 4, PAGE_W - MARGIN, y - 4);

  doc.setFontSize(8);
  doc.setTextColor(...TEXT_MUTED);
  doc.setFont('helvetica', 'normal');

  const site = SITE_URL.replace(/^https?:\/\//, '');
  const left = `${site}  ·  ${tagline}`;
  const right = `${pageNum} / ${totalPages}`;

  if (isRtl) {
    doc.text(right, MARGIN, y, { align: 'left' });
    doc.text(left, PAGE_W - MARGIN, y, { align: 'right' });
  } else {
    doc.text(left, MARGIN, y);
    doc.text(right, PAGE_W - MARGIN, y, { align: 'right' });
  }
}

function drawHeaderBand(doc: jsPDF, logoData: string | null, isRtl: boolean) {
  doc.setFillColor(...BRAND_BLUE);
  doc.rect(0, 0, PAGE_W, 32, 'F');

  if (logoData) {
    const logoSize = 14;
    const logoX = isRtl ? PAGE_W - MARGIN - logoSize : MARGIN;
    doc.addImage(logoData, 'PNG', logoX, 9, logoSize, logoSize);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  const brandX = isRtl ? PAGE_W - MARGIN - (logoData ? 18 : 0) : MARGIN + (logoData ? 18 : 0);
  doc.text('Fast Testers', brandX, 19, { align: isRtl ? 'right' : 'left' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const subX = isRtl ? MARGIN : PAGE_W - MARGIN;
  doc.text('Google Play Closed Testing', subX, 19, { align: isRtl ? 'left' : 'right' });
}

function drawChecklistItem(
  doc: jsPDF,
  index: number,
  text: string,
  y: number,
  isRtl: boolean
): number {
  const lineHeight = 4.8;
  const itemNum = index + 1;
  const textX = isRtl ? PAGE_W - MARGIN - 12 : MARGIN + 12;
  const textMaxW = CONTENT_W - 14;
  const lines = doc.splitTextToSize(text, textMaxW);
  const blockH = Math.max(10, lines.length * lineHeight + 2);

  const rowY = y;
  const circleX = isRtl ? PAGE_W - MARGIN - 5 : MARGIN + 5;
  const boxX = isRtl ? PAGE_W - MARGIN - 11 : MARGIN + 1;

  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.4);
  doc.roundedRect(boxX - 2, rowY - 1, 4, 4, 0.5, 0.5, 'S');

  doc.setFillColor(...BRAND_BLUE_LIGHT);
  doc.setDrawColor(...BRAND_BLUE);
  doc.setLineWidth(0.35);
  doc.circle(circleX, rowY + 3, 3.5, 'FD');
  doc.setTextColor(...BRAND_BLUE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text(String(itemNum), circleX, rowY + 4.2, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...TEXT_DARK);
  doc.text(lines, textX, rowY + 3.5, { align: isRtl ? 'right' : 'left' });

  return y + blockH + 3;
}

function drawSectionTitle(doc: jsPDF, title: string, y: number, isRtl: boolean): number {
  doc.setFillColor(...BRAND_BLUE_LIGHT);
  doc.roundedRect(MARGIN, y - 2, CONTENT_W, 8, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_BLUE);
  const x = isRtl ? PAGE_W - MARGIN - 4 : MARGIN + 4;
  doc.text(title.toUpperCase(), x, y + 3.5, { align: isRtl ? 'right' : 'left' });
  return y + 12;
}

function drawCtaBox(doc: jsPDF, title: string, body: string, y: number, isRtl: boolean): number {
  const bodyLines = doc.splitTextToSize(body, CONTENT_W - 16);
  const boxH = 22 + bodyLines.length * 4.5;

  doc.setFillColor(...BRAND_BLUE_LIGHT);
  doc.setDrawColor(...BRAND_BLUE);
  doc.setLineWidth(0.6);
  doc.roundedRect(MARGIN, y, CONTENT_W, boxH, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...TEXT_DARK);
  const tx = isRtl ? PAGE_W - MARGIN - 8 : MARGIN + 8;
  doc.text(title, tx, y + 8, { align: isRtl ? 'right' : 'left' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...TEXT_MUTED);
  doc.text(bodyLines, tx, y + 14, { align: isRtl ? 'right' : 'left' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...BRAND_BLUE);
  doc.text(APP_URL.replace(/\/$/, ''), tx, y + boxH - 5, { align: isRtl ? 'right' : 'left' });

  return y + boxH + 6;
}

/** Generate and download a branded Google Play checklist PDF. */
export async function downloadChecklistPdf(content: ChecklistPdfContent): Promise<void> {
  const isRtl = Boolean(content.isRtl);
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  if (isRtl) {
    doc.setR2L(true);
  }

  const logo = await loadLogoBase64();
  const sectionTitles = {
    setup: content.sectionSetup,
    testing: content.sectionTesting,
    launch: content.sectionLaunch,
  };

  let pageNum = 1;

  const ensureSpace = (needed: number, currentY: number): number => {
    if (currentY + needed > PAGE_H - 22) {
      doc.addPage();
      pageNum += 1;
      drawHeaderBand(doc, logo, isRtl);
      return 38;
    }
    return currentY;
  };

  drawHeaderBand(doc, logo, isRtl);

  let y = 42;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...TEXT_DARK);
  const titleLines = doc.splitTextToSize(content.title, CONTENT_W - 10);
  titleLines.forEach((line: string, i: number) => {
    doc.text(line, PAGE_W / 2, y + i * 8, { align: 'center' });
  });
  y += titleLines.length * 8 + 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...TEXT_MUTED);
  const descLines = doc.splitTextToSize(content.description, CONTENT_W - 10);
  doc.text(descLines, PAGE_W / 2, y, { align: 'center' });
  y += descLines.length * 5 + 6;

  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;

  for (const section of SECTION_RANGES) {
    const sectionLabel = sectionTitles[section.key];
    y = ensureSpace(14, y);
    y = drawSectionTitle(doc, sectionLabel, y, isRtl);

    for (let i = section.start; i <= section.end && i < content.items.length; i++) {
      y = ensureSpace(14, y);
      y = drawChecklistItem(doc, i, content.items[i], y, isRtl);
    }
    y += 4;
  }

  y = ensureSpace(30, y);
  y = drawCtaBox(doc, content.ctaTitle, content.ctaBody, y, isRtl);

  const totalPages = pageNum;
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawPageFooter(doc, p, totalPages, content.footerTagline, isRtl);
  }

  const date = new Date().toISOString().slice(0, 10);
  doc.save(`${content.filename}-${date}.pdf`);
}
