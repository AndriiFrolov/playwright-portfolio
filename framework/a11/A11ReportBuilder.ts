import { test, expect, TestInfo, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";
import path from "path";

export class A11ReportBuilder {
  testInfo: TestInfo;
  axe: AxeBuilder;

  constructor(axe: AxeBuilder, testInfo: TestInfo) {
    this.axe = axe;
    this.testInfo = testInfo;
  }

  async scan() {
    const accessibilityScanResults = await this.axe.analyze();
    this.attachResults("passed", JSON.stringify(accessibilityScanResults.passes));
    if (accessibilityScanResults.violations.length > 0) {
      this.attachResults("violations", JSON.stringify(accessibilityScanResults.violations));
    }
    await this.testInfo.attach("accessibility-scan-results", {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: "application/json",
    });
    await expect.soft(accessibilityScanResults.violations).toEqual([]);
  }

//   async scanWith(axe: AxeBuilder) {
//     const accessibilityScanResults = await axe.analyze();
//     this.attachResults("passed", JSON.stringify(accessibilityScanResults.passes));
//     if (accessibilityScanResults.violations.length > 0) {
//       this.attachResults("violations", JSON.stringify(accessibilityScanResults.violations));
//     }
//     await expect.soft(accessibilityScanResults.violations).toEqual([]);
//   }

  private attachResults(filename: string, scanResultsJson: string) {
    const htmlContent = this.jsonToHtmlTable(scanResultsJson);
    const filePath = this.saveHtmlToFile(`${filename}.html`, htmlContent);

    this.testInfo.attach(`accessibility-scan-results-${filename}`, {
      contentType: "text/html",
      path: filePath,
    });
  }

  private saveHtmlToFile(fileName: string, html: string): string {
    const filePath = path.join(__dirname, "..", fileName);
    fs.writeFileSync(filePath, html);
    return filePath;
  }

  private jsonToHtmlTable(response: string): string {
    console.log(response);
    let html = `<table border="1">
    <tr>
      <th>ID</th>
      <th>Description</th>
      <th>Help</th>
      <th>Help URL</th>
      <th>Impact</th>
      <th>Tags</th>
      <th>Details</th>
    </tr>`;

    const resultArray: any[] = JSON.parse(response);

    for (const result of resultArray) {
      html += `<tr>
     <td>${this.escapeHtml(result.id)}</td>
      <td>${this.escapeHtml(result.description)}</td>
      <td>${this.escapeHtml(result.help)}</td>
      <td>${this.escapeHtml(result.helpUrl)}</td>
      <td>${result.impact || ""}</td>
      <td>${result.tags.join(", ")}</td>
      <td><pre>${this.escapeHtml(JSON.stringify(result.nodes, null, 2))}</pre></td>
      </tr>`;
    }
    html += `</table>`;
    return html;
  }

  private escapeHtml(text: string): string {
    if (text === undefined) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
