import { describe, expect, it } from "vitest";
import { previewJobs } from "../jobs-preview";

const job = (id: string, title: string, company: string) => ({ id, title, company });

describe("previewJobs", () => {
  it("returns all jobs for pro users", () => {
    const jobs = [
      job("1", "PM", "Brex"),
      job("2", "PM", "Brex"),
      job("3", "PM", "Brex"),
      job("4", "PM", "Brex"),
    ];
    expect(previewJobs(jobs, true)).toHaveLength(4);
  });

  it("dedupes the free preview by title + company", () => {
    const jobs = [
      job("1", "Staff Product Manager, Growth", "Brex"),
      job("2", "Staff Product Manager, Growth", "Brex"),
      job("3", "Staff Product Manager, Growth", "Brex"),
      job("4", "Senior PM", "Stripe"),
      job("5", "PM, Payments", "Razorpay"),
    ];
    expect(previewJobs(jobs, false).map((j) => j.id)).toEqual(["1", "4", "5"]);
  });

  it("treats title/company as case- and whitespace-insensitive", () => {
    const jobs = [
      job("1", "Senior PM", "Brex"),
      job("2", " senior pm ", "BREX"),
      job("3", "PM", "Stripe"),
      job("4", "PM", "Notion"),
    ];
    expect(previewJobs(jobs, false).map((j) => j.id)).toEqual(["1", "3", "4"]);
  });

  it("backfills with duplicates when fewer than 3 unique roles exist", () => {
    const jobs = [job("1", "PM", "Brex"), job("2", "PM", "Brex"), job("3", "PM", "Brex")];
    expect(previewJobs(jobs, false).map((j) => j.id)).toEqual(["1", "2", "3"]);
  });

  it("returns fewer than 3 cards when fewer jobs exist", () => {
    expect(previewJobs([job("1", "PM", "Brex")], false)).toHaveLength(1);
  });
});
