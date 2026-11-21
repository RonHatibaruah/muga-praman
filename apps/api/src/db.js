/**
 * In-Memory & Edge Data Store for Muga Silk Digital Traceability (NESFIC-D-41)
 * Department of Handloom, Textiles & Sericulture, Government of Assam
 * Pre-seeded with 6 authentic Muga Silk production batches across Assam
 */

import { MerkleTree, hashBatch, sha256 } from "../../../packages/shared/src/merkle.js";
import { SAMPLE_REARERS, SAMPLE_WEAVERS, CMERTI_SPECTRAL_STANDARDS } from "../../../packages/shared/src/constants.js";

export class MugaTraceabilityDB {
  constructor() {
    this.rearers = [...SAMPLE_REARERS];
    this.weavers = [...SAMPLE_WEAVERS];
    this.batches = new Map();
    this.anchors = [];
    this.adminAlerts = [];
    this.seedInitialData();
  }

  seedInitialData() {
    // 1. Fully completed Cocoon-to-Consumer Batch: Sualkuchi Kingkhap Mekhela Sador
    const batch1 = {
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
    };

    // 2. Handloom Woven Batch: Sualkuchi Temple Border Saree
    const batch2 = {
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
    };

    // 3. Reeled Filament Batch: Lakhimpur Reeling Cluster
    const batch3 = {
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
    };

    // 4. Cocoon Market Graded Batch: Sivasagar Heritage Sericulture
    const batch4 = {
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
    };

    // 5. Spectral Certified Batch: Royal Assamese Riha
    const batch5 = {
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
    };

    // 6. Flagged Counterfeit Batch: Intercepted by CMER&TI NIR Spectroscopy
    const batch6 = {
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
          tasarBlendedPct: 18.5,    // Dyed Chinese Tasar fiber blend
          polyesterPct: 19.4,       // Synthetic polyester warp filament
          syntheticDyes: true,      // Synthetic yellow dye imitating natural Muga luster
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
    };

    [batch1, batch2, batch3, batch4, batch5, batch6].forEach(b => {
      this.batches.set(b.id, b);
    });

    this.adminAlerts.push({
      id: "ALERT-2026-MUG-001",
      severity: "CRITICAL",
      timestamp: "2026-11-20T16:35:00+05:30",
      batchId: "MUG-2026-FLG-006",
      cluster: "Guwahati Commercial Market",
      message: "🚨 ADULTERATION INTERCEPTED: CMER&TI NIR Spectrometer detected 19.4% synthetic polyester and 18.5% dyed Tasar silk in batch MUG-2026-FLG-006. Assam GI Tag #38 authorization revoked.",
    });

    this.anchorMerkleRoot();
  }

  getAllBatches() {
    return Array.from(this.batches.values());
  }

  getBatchById(id) {
    return this.batches.get(id);
  }

  getBatchByQrToken(token) {
    for (const batch of this.batches.values()) {
      if (batch.serializedQrCode === token || batch.id === token) {
        return batch;
      }
    }
    return null;
  }

  createRearing(record) {
    const newId = `MUG-2026-SER-${String(this.batches.size + 1).padStart(3, "0")}`;
    const newBatch = {
      id: newId,
      stage: "REARING_LOGGED",
      apparelType: record.apparelType || "MEKHELA_SADOR",
      productTitle: `Assam Muga Silk Lot (${record.district || "Assam"})`,
      rearing: {
        rearerId: record.rearerId,
        rearerName: record.rearerName || "Registered Muga Rearer",
        district: record.district || "Lakhimpur",
        hostPlantSpecies: record.hostPlantSpecies || "Som (Persea bombycina)",
        dflBatchNo: record.dflBatchNo || `DFL-2026-${Date.now()}`,
        pebrineFreeCertified: record.pebrineFreeCertified ?? true,
        cropSeason: record.cropSeason || "Katia (Autumn)",
        gps: record.gps,
        cocoonCount: record.cocoonCount || 10000,
        cocoonWeightKg: record.cocoonWeightKg || 15.0,
        harvestDate: new Date().toISOString(),
      },
      serializedQrCode: `QR-MUG26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      giTagAuthorized: true,
      giCertNumber: `#GI-IN-ASM-MUG-0038-${String(this.batches.size + 1).padStart(5, "0")}`,
    };

    this.batches.set(newId, newBatch);
    this.anchorMerkleRoot();
    return newBatch;
  }

  updateCocoonMarket(batchId, data) {
    const batch = this.batches.get(batchId);
    if (!batch) return null;
    batch.cocoonMarket = {
      marketId: data.marketId || "MKT-DEFAULT-01",
      marketName: data.marketName || "Assam Sericulture Cocoon Bank",
      inspectorName: data.inspectorName || "Govt Sericulture Officer",
      cocoonGrade: data.cocoonGrade || "Grade A (Prime)",
      shellRatioPct: data.shellRatioPct || 10.5,
      rawWeightKg: data.rawWeightKg || batch.rearing?.cocoonWeightKg || 15.0,
      ratePerThousandRs: data.ratePerThousandRs || 2200,
      mspCompliant: true,
      intakeDate: new Date().toISOString(),
    };
    batch.stage = "COCOON_MARKET_GRADED";
    this.anchorMerkleRoot();
    return batch;
  }

  updateReeling(batchId, data) {
    const batch = this.batches.get(batchId);
    if (!batch) return null;
    batch.reeling = {
      reelerId: data.reelerId || "REEL-SUA-01",
      reelerName: data.reelerName || "Sualkuchi Reeling Unit",
      clusterLocation: data.clusterLocation || "Sualkuchi",
      reelingMethod: data.reelingMethod || "CSTRI Motorized Reeling Machine",
      denierCount: data.denierCount || 38,
      filamentContinuityMeters: data.filamentContinuityMeters || 500,
      rawSilkYieldGrams: data.rawSilkYieldGrams || 1200,
      reelingCompletedDate: new Date().toISOString(),
    };
    batch.stage = "REELED_FILAMENT";
    this.anchorMerkleRoot();
    return batch;
  }

  updateWeaving(batchId, data) {
    const batch = this.batches.get(batchId);
    if (!batch) return null;
    batch.weaving = {
      weaverId: data.weaverId || "WEAV-SUA-001",
      weaverName: data.weaverName || "Sualkuchi Master Weaver",
      cluster: data.cluster || "Sualkuchi",
      loomId: data.loomId || "LOOM-SUA-JACQ-01",
      apparelType: data.apparelType || batch.apparelType || "MEKHELA_SADOR",
      designMotif: data.designMotif || "Traditional Kingkhap",
      warpCountDenier: data.warpCountDenier || 38,
      weftCountDenier: data.weftCountDenier || 40,
      dimensionsMeters: data.dimensionsMeters || "Mekhela 2.45m x 0.95m, Sador 2.80m x 1.05m",
      wovenWeightGrams: data.wovenWeightGrams || 800,
      artisanFairWagePaidRs: data.artisanFairWagePaidRs || 12500,
      weavingCompletedDate: new Date().toISOString(),
    };
    batch.stage = "HANDLOOM_WOVEN";
    this.anchorMerkleRoot();
    return batch;
  }

  updateSpectralTest(batchId, testData) {
    const batch = this.batches.get(batchId);
    if (!batch) return null;

    const purity = testData.purityScorePct ?? 99.2;
    const isCompliant = purity >= CMERTI_SPECTRAL_STANDARDS.pureMugaFibroinMin && !testData.adulterationDetected;

    batch.spectralAnalysis = {
      certifierId: testData.certifierId || "LAB-CMERTI-01",
      labName: testData.labName || "Central Muga Eri Research & Training Institute (CMER&TI), Lahdoigarh",
      accreditationNo: "NABL TC-8842",
      instrumentType: testData.instrumentType || "Handheld Portable NIR Spectrometer",
      spectralScanHash: sha256(JSON.stringify(testData)),
      ipfsHash: `QmCMERTI_${Date.now()}_MugaSpectralCert`,
      testDate: new Date().toISOString(),
      purityScorePct: purity,
      adulterationDetected: !isCompliant,
      adulterantDetails: testData.adulterantDetails,
      spectralBands: testData.spectralBands || [
        { peakName: "Amide I (C=O)", targetWavenumberCm1: 1650, measuredAbsorbance: 0.86, expectedMin: 0.65, expectedMax: 0.95, conforms: isCompliant },
        { peakName: "Amide II (N-H)", targetWavenumberCm1: 1520, measuredAbsorbance: 0.74, expectedMin: 0.50, expectedMax: 0.85, conforms: isCompliant },
        { peakName: "Amide III (C-N)", targetWavenumberCm1: 1235, measuredAbsorbance: 0.52, expectedMin: 0.35, expectedMax: 0.65, conforms: isCompliant },
      ],
      silkMarkIssued: isCompliant,
      silkMarkSerialNo: isCompliant ? `SMOI-ASM-MUG-2026-${Math.floor(1000 + Math.random() * 9000)}` : "REJECTED",
    };

    if (isCompliant) {
      batch.stage = "SPECTRAL_CERTIFIED";
      batch.giTagAuthorized = true;
    } else {
      batch.stage = "REVOKED_ADULTERATED";
      batch.giTagAuthorized = false;
      batch.giCertNumber = "REVOKED_NON_COMPLIANT";
      this.adminAlerts.unshift({
        id: `ALERT-${Date.now()}`,
        severity: "CRITICAL",
        timestamp: new Date().toISOString(),
        batchId: batch.id,
        cluster: batch.weaving?.cluster || "Handloom Cluster",
        message: `🚨 ADULTERATION ALERT: Batch ${batch.id} failed NIR spectroscopy (Purity: ${purity}%). GI authorization revoked.`,
      });
    }

    this.anchorMerkleRoot();
    return batch;
  }

  revokeGI(batchId, reason, revokedBy) {
    const batch = this.batches.get(batchId);
    if (!batch) return null;
    batch.giTagAuthorized = false;
    batch.stage = "REVOKED_ADULTERATED";
    batch.giCertNumber = `REVOKED_${reason.toUpperCase().replace(/\s+/g, "_")}`;
    const alert = {
      id: `ALERT-${Date.now()}`,
      severity: "CRITICAL",
      timestamp: new Date().toISOString(),
      batchId,
      cluster: batch.weaving?.cluster || "Assam Handloom",
      message: `🚨 GI TAG REVOCATION: Batch ${batchId} revoked by ${revokedBy}. Reason: ${reason}`,
    };
    this.adminAlerts.unshift(alert);
    this.anchorMerkleRoot();
    return { batch, alert };
  }

  anchorMerkleRoot() {
    const batchLeaves = Array.from(this.batches.values()).map(b => hashBatch(b));
    const tree = new MerkleTree(batchLeaves);
    const root = tree.getRoot();

    const anchor = {
      root: root.startsWith("0x") ? root : `0x${root}`,
      batchCount: batchLeaves.length,
      timestamp: new Date().toISOString(),
      network: "Polygon L2 POS / Base",
      txHash: `0x${sha256(root + Date.now())}`,
    };

    this.anchors.unshift(anchor);
    if (this.anchors.length > 20) this.anchors.pop();
    return anchor;
  }

  getAnalytics() {
    const all = Array.from(this.batches.values());
    const totalBatches = all.length;
    const stageCounts = {};
    const clusterDistribution = {};
    let compliantCount = 0;

    for (const b of all) {
      stageCounts[b.stage] = (stageCounts[b.stage] || 0) + 1;
      const district = b.rearing?.district || "Other";
      clusterDistribution[district] = (clusterDistribution[district] || 0) + 1;
      if (b.giTagAuthorized && b.stage !== "REVOKED_ADULTERATED") {
        compliantCount++;
      }
    }

    return {
      totalBatches,
      activeRearers: this.rearers.length,
      activeWeavers: this.weavers.length,
      stageCounts,
      clusterDistribution,
      complianceRate: totalBatches > 0 ? (compliantCount / totalBatches) * 100 : 100,
      latestMerkleRoot: this.anchors[0]?.root || null,
      latestTxHash: this.anchors[0]?.txHash || null,
      alertsCount: this.adminAlerts.length,
    };
  }

  getAdminAlerts() {
    return this.adminAlerts;
  }
}

export const db = new MugaTraceabilityDB();
