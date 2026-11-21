/**
 * Cloudflare Pages Function: Serverless Edge API for Muga Silk Traceability (NESFIC-D-41)
 * Department of Handloom, Textiles & Sericulture, Government of Assam
 * Synchronized with 6-batch sericulture & Sualkuchi handloom dataset
 */

const SEED_BATCHES = [
  {
    id: "MUG-2026-MS-001",
    stage: "RETAIL_PACKAGED",
    apparelType: "MEKHELA_SADOR",
    productTitle: "Heritage Sualkuchi Kingkhap Muga Mekhela Sador (কিংকাপ মেখেলা চাদৰ)",
    rearing: {
      rearerId: "REAR-LAK-001",
      rearerName: "Bhaben Chutia (ভবেন চুতীয়া)",
      district: "Lakhimpur",
      hostPlantSpecies: "Som (Persea bombycina)",
      dflBatchNo: "DFL-2026-KATIA-084",
      pebrineFreeCertified: true,
      cropSeason: "Katia (Autumn)",
      gps: { lat: 27.2412, lng: 94.4515, elevationMeters: 102, cadastralDag: "Dag #118/340", cadastralPatta: "Periodic Patta #24" },
      cocoonCount: 12000,
      cocoonWeightKg: 18.5,
      harvestDate: "2026-10-15T08:30:00+05:30",
    },
    cocoonMarket: {
      marketId: "MKT-LAK-01",
      marketName: "Dhakuakhana Government Cocoon Market & Cocoon Bank",
      inspectorName: "D. Hazarika (Sericulture Inspector)",
      cocoonGrade: "Grade A (Prime)",
      shellRatioPct: 10.8,
      rawWeightKg: 18.2,
      ratePerThousandRs: 2200,
      mspCompliant: true,
      intakeDate: "2026-10-18T11:00:00+05:30",
    },
    reeling: {
      reelerId: "REEL-SUA-04",
      reelerName: "Sualkuchi Silk Reeling & Twisting Co-Op",
      clusterLocation: "Sualkuchi, Kamrup",
      reelingMethod: "CSTRI Motorized Reeling Machine",
      denierCount: 38,
      filamentContinuityMeters: 480,
      rawSilkYieldGrams: 1450,
      reelingCompletedDate: "2026-10-24T16:00:00+05:30",
    },
    weaving: {
      weaverId: "WEAV-SUA-001",
      weaverName: "Prabin Baishya (প্ৰবীন বৈশ্য)",
      cluster: "Sualkuchi",
      loomId: "LOOM-SUA-JACQ-018",
      apparelType: "MEKHELA_SADOR",
      designMotif: "Traditional Kingkhap (কিংকাপ) with Gold Maku Shuttle",
      warpCountDenier: 38,
      weftCountDenier: 40,
      dimensionsMeters: "Mekhela 2.45m x 0.95m, Sador 2.80m x 1.05m",
      wovenWeightGrams: 820,
      artisanFairWagePaidRs: 14500,
      weavingCompletedDate: "2026-11-08T18:00:00+05:30",
    },
    spectralAnalysis: {
      certifierId: "LAB-CMERTI-01",
      labName: "Central Muga Eri Research & Training Institute (CMER&TI), Lahdoigarh",
      accreditationNo: "NABL TC-8842",
      instrumentType: "Handheld Portable NIR Spectrometer",
      spectralScanHash: "0x4e9b81f12a3d09c687e1f4095a8820cbb71e2908f4c173d19a28e51b32d56a71",
      ipfsHash: "QmCMERTI9941PureMugaSpectralPassCert",
      testDate: "2026-11-12T14:30:00+05:30",
      purityScorePct: 99.4,
      adulterationDetected: false,
      spectralBands: [
        { peakName: "Amide I (C=O beta-sheet)", targetWavenumberCm1: 1650, measuredAbsorbance: 0.88, expectedMin: 0.65, expectedMax: 0.95, conforms: true },
        { peakName: "Amide II (N-H bend)", targetWavenumberCm1: 1520, measuredAbsorbance: 0.76, expectedMin: 0.50, expectedMax: 0.85, conforms: true },
        { peakName: "Amide III (C-N in-plane)", targetWavenumberCm1: 1235, measuredAbsorbance: 0.54, expectedMin: 0.35, expectedMax: 0.65, conforms: true },
        { peakName: "Natural Sericin Check", targetWavenumberCm1: 1400, measuredAbsorbance: 0.11, expectedMin: 0.05, expectedMax: 0.20, conforms: true },
      ],
      silkMarkIssued: true,
      silkMarkSerialNo: "SMOI-ASM-MUG-2026-00441",
    },
    retailCustodian: "Assam Apex Weavers & Artisans Co-Operative Federation (ARTFED)",
    serializedQrCode: "QR-MUG26-8894-X82F",
    nfcTagUid: "04:5A:22:9C:F1:80:3D",
    giTagAuthorized: true,
    giCertNumber: "#GI-IN-ASM-MUG-0038-00441",
    blockchainTxHash: "0x8f3c7e99214b2a65d38a719c84e1bfa74319a92289410d55e925bca34821a812",
  },
  {
    id: "MUG-2026-SAR-002",
    stage: "HANDLOOM_WOVEN",
    apparelType: "TRADITIONAL_SAREE",
    productTitle: "Royal Temple Border 5.5m Pure Muga Saree (মুগা শাৰী)",
    rearing: {
      rearerId: "REAR-DHE-002",
      rearerName: "Hemanta Borgohain (হেমন্ত বৰগোহাঁই)",
      district: "Dhemaji",
      hostPlantSpecies: "Soalu (Litsea polyantha)",
      dflBatchNo: "DFL-2026-JETHUA-022",
      pebrineFreeCertified: true,
      cropSeason: "Jethua (Spring)",
      gps: { lat: 27.4845, lng: 94.5811, elevationMeters: 114, cadastralDag: "Dag #205/612", cadastralPatta: "Myadi Patta #88" },
      cocoonCount: 15000,
      cocoonWeightKg: 22.8,
      harvestDate: "2026-11-02T09:00:00+05:30",
    },
    cocoonMarket: {
      marketId: "MKT-DHE-02",
      marketName: "Jonai Government Sericulture Farm & Cocoon Bank",
      inspectorName: "R. Borah",
      cocoonGrade: "Grade A (Prime)",
      shellRatioPct: 10.4,
      rawWeightKg: 22.5,
      ratePerThousandRs: 2150,
      mspCompliant: true,
      intakeDate: "2026-11-05T10:30:00+05:30",
    },
    reeling: {
      reelerId: "REEL-DHE-01",
      reelerName: "Jonai Sericulture Mahila Samabai",
      clusterLocation: "Jonai, Dhemaji",
      reelingMethod: "CSTRI Motorized Reeling Machine",
      denierCount: 36,
      filamentContinuityMeters: 510,
      rawSilkYieldGrams: 1800,
      reelingCompletedDate: "2026-11-10T15:00:00+05:30",
    },
    weaving: {
      weaverId: "WEAV-SUA-002",
      weaverName: "Hemaprabha Das (হেমপ্ৰভা দাস)",
      cluster: "Sualkuchi",
      loomId: "LOOM-SUA-THROW-007",
      apparelType: "TRADITIONAL_SAREE",
      designMotif: "Traditional Temple Border (দৌল আৰ্হি) with Peacock motifs",
      warpCountDenier: 36,
      weftCountDenier: 38,
      dimensionsMeters: "5.50m length x 1.15m width",
      wovenWeightGrams: 750,
      artisanFairWagePaidRs: 16200,
      weavingCompletedDate: "2026-11-19T17:00:00+05:30",
    },
    retailCustodian: "Silkalay Master Artisans Guild, Sualkuchi",
    serializedQrCode: "QR-MUG26-SAR-PENDING-02",
    giTagAuthorized: true,
    giCertNumber: "#GI-IN-ASM-MUG-0038-00442",
    blockchainTxHash: "0x3a4b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
  },
  {
    id: "MUG-2026-YRN-003",
    stage: "REELED_FILAMENT",
    apparelType: "FABRIC_YARDAGE",
    productTitle: "Certified 35-Denier Muga Filament Hanks (মুগা সূতা)",
    rearing: {
      rearerId: "REAR-LAK-001",
      rearerName: "Bhaben Chutia (ভবেন চুতীয়া)",
      district: "Lakhimpur",
      hostPlantSpecies: "Som (Persea bombycina)",
      dflBatchNo: "DFL-2026-KATIA-089",
      pebrineFreeCertified: true,
      cropSeason: "Katia (Autumn)",
      gps: { lat: 27.2412, lng: 94.4515, elevationMeters: 102, cadastralDag: "Dag #118/340", cadastralPatta: "Periodic Patta #24" },
      cocoonCount: 8000,
      cocoonWeightKg: 12.0,
      harvestDate: "2026-11-14T08:00:00+05:30",
    },
    cocoonMarket: {
      marketId: "MKT-LAK-01",
      marketName: "Dhakuakhana Government Cocoon Market",
      inspectorName: "D. Hazarika",
      cocoonGrade: "Grade A (Prime)",
      shellRatioPct: 10.9,
      rawWeightKg: 11.9,
      ratePerThousandRs: 2200,
      mspCompliant: true,
      intakeDate: "2026-11-16T09:30:00+05:30",
    },
    reeling: {
      reelerId: "REEL-LAK-02",
      reelerName: "Dhakuakhana Sericulture Cluster Unit",
      clusterLocation: "Dhakuakhana, Lakhimpur",
      reelingMethod: "Solar Operable Reeler",
      denierCount: 35,
      filamentContinuityMeters: 530,
      rawSilkYieldGrams: 980,
      reelingCompletedDate: "2026-11-20T12:00:00+05:30",
    },
    retailCustodian: "Dhakuakhana Sericulture Cluster Unit",
    serializedQrCode: "QR-MUG26-YRN-PENDING-03",
    giTagAuthorized: true,
    giCertNumber: "#GI-IN-ASM-MUG-0038-00443",
    blockchainTxHash: "0x7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d",
  },
  {
    id: "MUG-2026-CCN-004",
    stage: "COCOON_MARKET_GRADED",
    apparelType: "FABRIC_YARDAGE",
    productTitle: "Joysagar Grade-A Prime Muga Cocoons (মুগা কোঁহ লট)",
    rearing: {
      rearerId: "REAR-SIV-003",
      rearerName: "Sivasagar Heritage Sericulture Farm",
      district: "Sivasagar",
      hostPlantSpecies: "Mixed Agroforestry",
      dflBatchNo: "DFL-2026-KATIA-101",
      pebrineFreeCertified: true,
      cropSeason: "Katia (Autumn)",
      gps: { lat: 26.9688, lng: 94.6312, elevationMeters: 98, cadastralDag: "Dag #512/890", cadastralPatta: "Govt Institutional Grant #04" },
      cocoonCount: 20000,
      cocoonWeightKg: 30.5,
      harvestDate: "2026-11-18T07:30:00+05:30",
    },
    cocoonMarket: {
      marketId: "MKT-SIV-01",
      marketName: "Joysagar Government Cocoon Market & Bank",
      inspectorName: "M. Neog",
      cocoonGrade: "Grade A (Prime)",
      shellRatioPct: 11.2,
      rawWeightKg: 30.2,
      ratePerThousandRs: 2250,
      mspCompliant: true,
      intakeDate: "2026-11-20T10:00:00+05:30",
    },
    retailCustodian: "Joysagar Government Cocoon Bank",
    serializedQrCode: "QR-MUG26-CCN-PENDING-04",
    giTagAuthorized: true,
    giCertNumber: "#GI-IN-ASM-MUG-0038-00444",
    blockchainTxHash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
  },
  {
    id: "MUG-2026-RIH-005",
    stage: "SPECTRAL_CERTIFIED",
    apparelType: "RIHA",
    productTitle: "Royal Assamese Ceremonial Muga Riha (ৰাজকীয় মুগা ৰিহা)",
    rearing: {
      rearerId: "REAR-LAK-001",
      rearerName: "Bhaben Chutia (ভবেন চুতীয়া)",
      district: "Lakhimpur",
      hostPlantSpecies: "Som (Persea bombycina)",
      dflBatchNo: "DFL-2026-KATIA-078",
      pebrineFreeCertified: true,
      cropSeason: "Katia (Autumn)",
      gps: { lat: 27.2412, lng: 94.4515, elevationMeters: 102, cadastralDag: "Dag #118/340", cadastralPatta: "Periodic Patta #24" },
      cocoonCount: 6500,
      cocoonWeightKg: 10.0,
      harvestDate: "2026-10-10T08:00:00+05:30",
    },
    cocoonMarket: {
      marketId: "MKT-LAK-01",
      marketName: "Dhakuakhana Government Cocoon Market",
      inspectorName: "D. Hazarika",
      cocoonGrade: "Grade A (Prime)",
      shellRatioPct: 10.6,
      rawWeightKg: 9.8,
      ratePerThousandRs: 2200,
      mspCompliant: true,
      intakeDate: "2026-10-12T10:00:00+05:30",
    },
    reeling: {
      reelerId: "REEL-SUA-04",
      reelerName: "Sualkuchi Silk Reeling & Twisting Co-Op",
      clusterLocation: "Sualkuchi, Kamrup",
      reelingMethod: "CSTRI Motorized Reeling Machine",
      denierCount: 37,
      filamentContinuityMeters: 495,
      rawSilkYieldGrams: 810,
      reelingCompletedDate: "2026-10-18T14:00:00+05:30",
    },
    weaving: {
      weaverId: "WEAV-SUA-001",
      weaverName: "Prabin Baishya (প্ৰবীন বৈশ্য)",
      cluster: "Sualkuchi",
      loomId: "LOOM-SUA-JACQ-018",
      apparelType: "RIHA",
      designMotif: "Miri Gos & Guna borders (গুণা বন কৰা)",
      warpCountDenier: 37,
      weftCountDenier: 38,
      dimensionsMeters: "2.80m length x 0.85m width",
      wovenWeightGrams: 410,
      artisanFairWagePaidRs: 11000,
      weavingCompletedDate: "2026-10-28T16:00:00+05:30",
    },
    spectralAnalysis: {
      certifierId: "LAB-CMERTI-01",
      labName: "Central Muga Eri Research & Training Institute (CMER&TI), Lahdoigarh",
      accreditationNo: "NABL TC-8842",
      instrumentType: "Handheld Portable NIR Spectrometer",
      spectralScanHash: "0x11223344556677889900aabbccddeeff00112233445566778899aabbccddeeff",
      ipfsHash: "QmCMERTI8872RihaSpectralPassCert",
      testDate: "2026-11-04T11:00:00+05:30",
      purityScorePct: 99.8,
      adulterationDetected: false,
      spectralBands: [
        { peakName: "Amide I (C=O beta-sheet)", targetWavenumberCm1: 1650, measuredAbsorbance: 0.91, expectedMin: 0.65, expectedMax: 0.95, conforms: true },
        { peakName: "Amide II (N-H bend)", targetWavenumberCm1: 1520, measuredAbsorbance: 0.79, expectedMin: 0.50, expectedMax: 0.85, conforms: true },
        { peakName: "Amide III (C-N in-plane)", targetWavenumberCm1: 1235, measuredAbsorbance: 0.58, expectedMin: 0.35, expectedMax: 0.65, conforms: true },
        { peakName: "Natural Sericin Check", targetWavenumberCm1: 1400, measuredAbsorbance: 0.09, expectedMin: 0.05, expectedMax: 0.20, conforms: true },
      ],
      silkMarkIssued: true,
      silkMarkSerialNo: "SMOI-ASM-MUG-2026-00445",
    },
    retailCustodian: "Sualkuchi Resham Samabai Samiti Ltd.",
    serializedQrCode: "QR-MUG26-RIH-PENDING-05",
    giTagAuthorized: true,
    giCertNumber: "#GI-IN-ASM-MUG-0038-00445",
    blockchainTxHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
  },
  {
    id: "MUG-2026-FLG-006",
    stage: "REVOKED_ADULTERATED",
    apparelType: "MEKHELA_SADOR",
    productTitle: "⚠️ SUSPICIOUS LOT - Counterfeit Sualkuchi Mekhela Sador (ভেজাল ধৰা পৰা লট)",
    rearing: {
      rearerId: "REAR-UNVERIFIED",
      rearerName: "Unregistered Sericulture Middleman",
      district: "Unknown / Outside Assam Sericulture Belt",
      hostPlantSpecies: "Undisclosed",
      dflBatchNo: "DFL-COUNTERFEIT-UNKNOWN",
      pebrineFreeCertified: false,
      cropSeason: "Commercial Spot Purchase",
      gps: { lat: 26.1822, lng: 91.7455, elevationMeters: 55 },
      cocoonCount: 10000,
      cocoonWeightKg: 15.0,
      harvestDate: "2026-11-10T10:00:00+05:30",
    },
    weaving: {
      weaverId: "WEAV-UNKNOWN",
      weaverName: "Powerloom Commercial Synthetics Unit",
      cluster: "Commercial Wholesale Center",
      loomId: "PWR-LOOM-SYNTH-99",
      apparelType: "MEKHELA_SADOR",
      designMotif: "Imitation Jacquard Kingkhap Pattern",
      warpCountDenier: 45,
      weftCountDenier: 48,
      dimensionsMeters: "Mekhela 2.45m x 0.95m, Sador 2.80m x 1.05m",
      wovenWeightGrams: 940,
      artisanFairWagePaidRs: 1800,
      weavingCompletedDate: "2026-11-16T15:00:00+05:30",
    },
    spectralAnalysis: {
      certifierId: "LAB-CMERTI-01",
      labName: "Central Muga Eri Research & Training Institute (CMER&TI), Lahdoigarh",
      accreditationNo: "NABL TC-8842",
      instrumentType: "Handheld Portable NIR Spectrometer",
      spectralScanHash: "0xdeadbeef11223344556677889900aabbccddeeff00112233445566778899aabb",
      ipfsHash: "QmCMERTI_ALERT_AdulterationDetectedHash",
      testDate: "2026-11-20T16:30:00+05:30",
      purityScorePct: 62.1,
      adulterationDetected: true,
      adulterantDetails: {
        tasarBlendedPct: 18.5,
        polyesterPct: 19.4,
        syntheticDyes: true,
      },
      spectralBands: [
        { peakName: "Amide I (C=O beta-sheet)", targetWavenumberCm1: 1650, measuredAbsorbance: 0.42, expectedMin: 0.65, expectedMax: 0.95, conforms: false },
        { peakName: "Amide II (N-H bend)", targetWavenumberCm1: 1520, measuredAbsorbance: 0.38, expectedMin: 0.50, expectedMax: 0.85, conforms: false },
        { peakName: "Amide III (C-N in-plane)", targetWavenumberCm1: 1235, measuredAbsorbance: 0.24, expectedMin: 0.35, expectedMax: 0.65, conforms: false },
        { peakName: "Polyester Ester Carbonyl", targetWavenumberCm1: 1720, measuredAbsorbance: 0.68, expectedMin: 0.00, expectedMax: 0.05, conforms: false },
      ],
      silkMarkIssued: false,
      silkMarkSerialNo: "REJECTED_NON_COMPLIANT",
    },
    retailCustodian: "Interception Holding Room - Directorate Anti-Counterfeit Cell",
    serializedQrCode: "QR-MUG26-FLG-INTERCEPTED",
    giTagAuthorized: false,
    giCertNumber: "REVOKED_FRAUD_DETECTED",
    blockchainTxHash: "0x9999999999999999999999999999999999999999999999999999999999999999",
  },
];

let liveBatches = [...SEED_BATCHES];
let liveAlerts = [
  {
    id: "ALERT-2026-MUG-001",
    severity: "CRITICAL",
    timestamp: "2026-11-20T16:35:00+05:30",
    batchId: "MUG-2026-FLG-006",
    cluster: "Guwahati Commercial Market",
    message: "🚨 ADULTERATION INTERCEPTED: CMER&TI NIR Spectrometer detected 19.4% synthetic polyester and 18.5% dyed Tasar silk in batch MUG-2026-FLG-006. Assam GI Tag #38 authorization revoked.",
  },
];

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/^\/api\/?/, "");
  const method = request.method;

  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // 1. Health
  if (pathname === "health" || pathname === "") {
    return jsonResponse({
      status: "ok",
      service: "Assam Muga Silk Value Chain Traceability Edge Engine (NESFIC-D-41)",
      department: "Department of Handloom, Textiles & Sericulture, Government of Assam",
      runtime: "Cloudflare Pages Functions / V8 Edge",
      timestamp: new Date().toISOString(),
    });
  }

  // 2. Batches list
  if (pathname === "batches" && method === "GET") {
    return jsonResponse({ success: true, data: liveBatches });
  }

  // 3. Batch Detail
  const batchDetailMatch = pathname.match(/^batches\/([^\/]+)$/);
  if (batchDetailMatch && method === "GET") {
    const id = decodeURIComponent(batchDetailMatch[1]);
    const b = liveBatches.find(x => x.id === id);
    if (!b) return jsonResponse({ success: false, error: "Batch not found" }, 404);
    return jsonResponse({ success: true, data: b });
  }

  // 4. Verify QR Token
  const verifyMatch = pathname.match(/^verify\/([^\/]+)$/);
  if (verifyMatch && method === "GET") {
    const token = decodeURIComponent(verifyMatch[1]);
    const b = liveBatches.find(x => x.serializedQrCode === token || x.id === token);
    if (!b) {
      return jsonResponse({
        success: false,
        error: "Unregistered or counterfeit QR token. Please alert the Directorate Anti-Counterfeit Cell.",
      }, 404);
    }
    return jsonResponse({
      success: true,
      verified: b.giTagAuthorized,
      data: b,
      provenanceMerkleRoot: "0x8f3c7e99214b2a65d38a719c84e1bfa74319a92289410d55e925bca34821a812",
    });
  }

  // 5. Analytics
  if (pathname === "analytics" && method === "GET") {
    const total = liveBatches.length;
    const stageCounts = {};
    const clusterDistribution = {};
    let compliant = 0;
    for (const b of liveBatches) {
      stageCounts[b.stage] = (stageCounts[b.stage] || 0) + 1;
      const dist = b.rearing?.district || "Other";
      clusterDistribution[dist] = (clusterDistribution[dist] || 0) + 1;
      if (b.giTagAuthorized && b.stage !== "REVOKED_ADULTERATED") compliant++;
    }
    return jsonResponse({
      success: true,
      data: {
        totalBatches: total,
        activeRearers: 3,
        activeWeavers: 2,
        stageCounts,
        clusterDistribution,
        complianceRate: total > 0 ? (compliant / total) * 100 : 100,
        latestMerkleRoot: "0x8f3c7e99214b2a65d38a719c84e1bfa74319a92289410d55e925bca34821a812",
        alertsCount: liveAlerts.length,
      },
    });
  }

  // 6. Admin GI Revoke
  if (pathname === "admin/gi/revoke" && method === "POST") {
    try {
      const body = await request.json();
      const b = liveBatches.find(x => x.id === body.batchId);
      if (!b) return jsonResponse({ success: false, error: "Batch not found" }, 404);
      b.giTagAuthorized = false;
      b.stage = "REVOKED_ADULTERATED";
      b.giCertNumber = `REVOKED_${body.reason.toUpperCase().replace(/\s+/g, "_")}`;
      const alert = {
        id: `ALERT-${Date.now()}`,
        severity: "CRITICAL",
        timestamp: new Date().toISOString(),
        batchId: body.batchId,
        cluster: b.weaving?.cluster || "Assam Handloom",
        message: `🚨 GI TAG REVOCATION: Batch ${body.batchId} revoked by ${body.revokedBy || "State GI Authority"}. Reason: ${body.reason}`,
      };
      liveAlerts.unshift(alert);
      return jsonResponse({ success: true, data: { batch: b, alert } });
    } catch (e) {
      return jsonResponse({ success: false, error: "Invalid JSON" }, 400);
    }
  }

  // 7. Admin Alerts
  if (pathname === "admin/alerts" && method === "GET") {
    return jsonResponse({ success: true, data: liveAlerts });
  }

  return jsonResponse({ success: false, error: "Endpoint not found" }, 404);
}
