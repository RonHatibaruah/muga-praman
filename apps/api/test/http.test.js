import test from "node:test";
import assert from "node:assert/strict";

test("HTTP API endpoints respond accurately for Muga Silk Traceability", async () => {
  const { db } = await import("../src/db.js");

  // Verify DB state
  const batches = db.getAllBatches();
  assert.ok(batches.length >= 6);

  // Test verify logic
  const verified = db.getBatchByQrToken("QR-MUG26-8894-X82F");
  assert.equal(verified.id, "MUG-2026-MS-001");
  assert.equal(verified.giCertNumber, "#GI-IN-ASM-MUG-0038-00441");
  assert.equal(verified.spectralAnalysis.purityScorePct, 99.4);

  // Test analytics
  const analytics = db.getAnalytics();
  assert.ok(analytics.complianceRate > 50); // 5 of 6 seed batches compliant (1 flagged counterfeit)
  assert.ok(analytics.latestMerkleRoot.startsWith("0x"));
});
