import test from "node:test";
import assert from "node:assert/strict";
import { db } from "../src/db.js";
import { MerkleTree, sha256 } from "../../../packages/shared/src/merkle.js";
import { CMERTI_SPECTRAL_STANDARDS } from "../../../packages/shared/src/constants.js";

test("Database seeds correctly with authentic Assam Muga silk batches", () => {
  const batches = db.getAllBatches();
  assert.ok(batches.length >= 6, "Expected at least 6 pre-seeded batches");
  const batch1 = db.getBatchById("MUG-2026-MS-001");
  assert.ok(batch1, "Batch MUG-2026-MS-001 should exist");
  assert.equal(batch1.stage, "RETAIL_PACKAGED");
  assert.equal(batch1.rearing.district, "Lakhimpur");
  assert.equal(batch1.giTagAuthorized, true);
  assert.equal(batch1.spectralAnalysis.purityScorePct, 99.4);
  assert.equal(batch1.spectralAnalysis.silkMarkIssued, true);
});

test("Consumer QR lookup resolves correctly for Muga silk", () => {
  const verified = db.getBatchByQrToken("QR-MUG26-8894-X82F");
  assert.ok(verified, "Should find batch by QR token");
  assert.equal(verified.id, "MUG-2026-MS-001");
  assert.equal(verified.weaving.cluster, "Sualkuchi");
  assert.equal(verified.apparelType, "MEKHELA_SADOR");
});

test("Sericulture Rearing creates new batch and transitions stages", () => {
  const newBatch = db.createRearing({
    rearerId: "REAR-LAK-001",
    rearerName: "Bhaben Chutia",
    district: "Lakhimpur",
    hostPlantSpecies: "Som (Persea bombycina)",
    gps: { lat: 27.2412, lng: 94.4515 },
    cocoonCount: 10000,
    cocoonWeightKg: 15.0,
  });

  assert.ok(newBatch.id.startsWith("MUG-2026-SER-"));
  assert.equal(newBatch.stage, "REARING_LOGGED");

  // Step 2: Cocoon Market
  const marketUpdated = db.updateCocoonMarket(newBatch.id, {
    marketId: "MKT-LAK-01",
    marketName: "Dhakuakhana Cocoon Market",
    cocoonGrade: "Grade A (Prime)",
    shellRatioPct: 10.8,
  });
  assert.equal(marketUpdated.stage, "COCOON_MARKET_GRADED");
  assert.equal(marketUpdated.cocoonMarket.shellRatioPct, 10.8);

  // Step 3: Reeling
  const reeled = db.updateReeling(newBatch.id, {
    reelerId: "REEL-SUA-04",
    reelerName: "Sualkuchi Reeling Unit",
    denierCount: 38,
  });
  assert.equal(reeled.stage, "REELED_FILAMENT");
  assert.equal(reeled.reeling.denierCount, 38);

  // Step 4: Weaving
  const woven = db.updateWeaving(newBatch.id, {
    weaverId: "WEAV-SUA-001",
    weaverName: "Prabin Baishya",
    cluster: "Sualkuchi",
    loomId: "LOOM-01",
    apparelType: "MEKHELA_SADOR",
  });
  assert.equal(woven.stage, "HANDLOOM_WOVEN");
  assert.equal(woven.weaving.cluster, "Sualkuchi");

  // Step 5: CMER&TI Spectral Purity Pass
  const tested = db.updateSpectralTest(newBatch.id, {
    certifierId: "LAB-CMERTI-01",
    purityScorePct: 99.5,
    adulterationDetected: false,
  });
  assert.equal(tested.stage, "SPECTRAL_CERTIFIED");
  assert.equal(tested.giTagAuthorized, true);
  assert.equal(tested.spectralAnalysis.silkMarkIssued, true);
});

test("Intercepts adulteration and counterfeit batches via NIR spectroscopy", () => {
  const flagged = db.getBatchById("MUG-2026-FLG-006");
  assert.ok(flagged, "Flagged batch MUG-2026-FLG-006 must exist");
  assert.equal(flagged.stage, "REVOKED_ADULTERATED");
  assert.equal(flagged.giTagAuthorized, false);
  assert.equal(flagged.spectralAnalysis.adulterationDetected, true);
  assert.ok(flagged.spectralAnalysis.purityScorePct < 70);
  assert.equal(flagged.spectralAnalysis.silkMarkIssued, false);

  // Test dynamic interception on new batch
  const testBatch = db.createRearing({
    rearerId: "REAR-TEST",
    gps: { lat: 26.1, lng: 91.5 },
  });

  const failedTest = db.updateSpectralTest(testBatch.id, {
    certifierId: "LAB-CMERTI-01",
    purityScorePct: 78.4, // Below 98% threshold
    adulterationDetected: true,
    adulterantDetails: { polyesterPct: 21.6 },
  });

  assert.equal(failedTest.stage, "REVOKED_ADULTERATED");
  assert.equal(failedTest.giTagAuthorized, false);
  assert.equal(failedTest.giCertNumber, "REVOKED_NON_COMPLIANT");
});

test("Merkle Tree root generation and anchor calculation", () => {
  const anchor = db.anchorMerkleRoot();
  assert.ok(anchor.root.startsWith("0x"));
  assert.equal(anchor.root.length, 66);
  assert.ok(anchor.batchCount >= 6);
  assert.ok(anchor.txHash.startsWith("0x"));
});

test("Analytics correctly computes regional and compliance breakdown", () => {
  const analytics = db.getAnalytics();
  assert.ok(analytics.totalBatches >= 6);
  assert.ok(analytics.activeRearers >= 3);
  assert.ok(analytics.activeWeavers >= 2);
  assert.ok(analytics.complianceRate > 0 && analytics.complianceRate <= 100);
  assert.ok(analytics.latestMerkleRoot.startsWith("0x"));
  assert.ok(analytics.alertsCount >= 1);
});

test("Admin GI revocation and alert feed functions", () => {
  const result = db.revokeGI("MUG-2026-SAR-002", "Suspicion of synthetic blend in retail market", "Enforcement Squad");
  assert.ok(result);
  assert.equal(result.batch.giTagAuthorized, false);
  assert.equal(result.batch.stage, "REVOKED_ADULTERATED");
  assert.ok(result.alert.message.includes("Suspicion of synthetic blend"));

  const alerts = db.getAdminAlerts();
  assert.ok(alerts.length >= 2);
  assert.equal(alerts[0].batchId, "MUG-2026-SAR-002");
});

test("CMER&TI Spectral Standards return approved reference parameters", () => {
  assert.equal(CMERTI_SPECTRAL_STANDARDS.pureMugaFibroinMin, 98.0);
  assert.ok(CMERTI_SPECTRAL_STANDARDS.keyAbsorptionPeaks.length >= 3);
  assert.equal(CMERTI_SPECTRAL_STANDARDS.adulterantSignatures.polyesterEsterPeakCm1, 1720);
});
