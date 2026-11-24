/**
 * Frontend Application Logic for Assam Muga Silk Digital Traceability (NESFIC-D-41)
 * Department of Handloom, Textiles & Sericulture, Government of Assam
 * Features:
 * - Non-Destructive NIR & Raman Spectroscopy Authentication (Amide I, II, III peaks)
 * - Cocoon-to-Consumer Provenance Timeline (Rearing -> Cocoon Bank -> Reeling -> Sualkuchi Loom -> Lab)
 * - Assam GI Tag #38 & Silk Mark India Cryptographic Certification
 * - Cadastral GIS Land Parcel Surveillance (Dharitree Dag & Patta for Som/Soalu plantations)
 * - Multi-Role Admin Governance Panel with 6 administrative sub-modules
 */

// Dynamically detect local dev vs Cloudflare production deployment
const API_BASE = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") && window.location.port !== "3000"
  ? "http://localhost:4000/api"
  : (window.location.port === "3000" ? "http://localhost:4000/api" : "/api");

// 6 Authentic Assam Muga Silk Batches (Synced with backend seed data)
let fallbackBatches = [
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

let sampleRearers = [
  { id: "REAR-LAK-001", name: "Bhaben Chutia (ভবেন চুতীয়া)", district: "Lakhimpur (Dhakuakhana)", trees: 280, host: "Som" },
  { id: "REAR-DHE-002", name: "Hemanta Borgohain (হেমন্ত বৰগোহাঁই)", district: "Dhemaji (Jonai)", trees: 340, host: "Soalu" },
  { id: "REAR-SIV-003", name: "Sivasagar Heritage Farm", district: "Sivasagar (Joysagar)", trees: 520, host: "Mixed" },
];

let sericultureDiseaseMatrix = [
  { disease: "Pebrine (পেব্ৰিন)", pathogen: "Nosema assamensis (Microsporidia)", protocol: "Mother Moth Microscopic Examination", tolerance: "0.00% (Zero Tolerance)", sop: "Mandatory destruction of contaminated egg batches; supply only DFLs.", status: "CLEARED" },
  { disease: "Flacherie (মুখলগা)", pathogen: "Bacillus bombysepticus / Bacteria", protocol: "Larval digestive fluid streak test", tolerance: "< 1.5%", sop: "Disinfection of rearing house with 2% bleaching powder + 0.3% slaked lime.", status: "CONTROLLED" },
  { disease: "Grasserie (যখিনী ৰোগ)", pathogen: "Nuclear Polyhedrosis Virus (NPV)", protocol: "Polyhedra inclusion body microscopy", tolerance: "< 2.0%", sop: "Maintenance of optimum rearing temp (24-28°C) & relative humidity (80-85%).", status: "CONTROLLED" },
  { disease: "Uzi Fly Parasite (উজি মাখি)", pathogen: "Exorista sorbillans (Diptera)", protocol: "Cocoon pierced mark inspection", tolerance: "< 3.0%", sop: "Deployment of nylon mosquito mesh wire screens around Som plantations.", status: "PROTECTED" },
  { disease: "Som Gall Midge (পাতত গুটি)", pathogen: "Asphondylia assamensis", protocol: "Foliage survey before brushing", tolerance: "< 5.0%", sop: "Pruning infested branches; neem oil bio-pesticide spray 15 days pre-brushing.", status: "SAFE" },
];

let activeBatch = fallbackBatches[0];
let adminAuthenticated = false;

// Toast Notifications
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = "toastOut 0.3s ease-in forwards";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Tab Switching
function setupTabs() {
  const tabs = document.querySelectorAll(".tab-btn[data-tab]");
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      jumpToTab(target);
    });
  });
}

window.jumpToTab = function(tabName) {
  const tabs = document.querySelectorAll(".tab-btn[data-tab]");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach(t => t.classList.remove("active"));
  panes.forEach(p => p.classList.remove("active"));

  const targetTab = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
  const targetPane = document.getElementById(`pane-${tabName}`);

  if (targetTab && targetPane) {
    targetTab.classList.add("active");
    targetPane.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (tabName === "admin" && adminAuthenticated) {
      setTimeout(() => {
        if (typeof initOrUpdateGisMap === "function") initOrUpdateGisMap();
      }, 200);
    }
  }
};

// 1. Consumer QR Explorer
function setupConsumerVerification() {
  const btnVerify = document.getElementById("btn-verify");
  const inputSearch = document.getElementById("qr-search-input");

  if (btnVerify) {
    btnVerify.addEventListener("click", () => {
      const val = inputSearch.value.trim();
      if (val) lookupBatch(val);
    });
  }

  // Auto-render default batch on load
  lookupBatch("QR-MUG26-8894-X82F");
}

window.lookupBatch = async function(token) {
  const inputSearch = document.getElementById("qr-search-input");
  if (inputSearch) inputSearch.value = token;

  // Highlight active chip
  document.querySelectorAll(".batch-chip").forEach(c => {
    c.classList.remove("active");
    if (c.getAttribute("onclick") && c.getAttribute("onclick").includes(token)) {
      c.classList.add("active");
    }
  });

  try {
    const res = await fetch(`${API_BASE}/verify/${encodeURIComponent(token)}`);
    if (res.ok) {
      const data = await res.json();
      activeBatch = data.data;
      renderVerificationSuccess(activeBatch);
    } else {
      const local = fallbackBatches.find(b => b.serializedQrCode === token || b.id === token);
      if (local) {
        activeBatch = local;
        renderVerificationSuccess(activeBatch);
      } else {
        renderVerificationFailure(token);
      }
    }
  } catch (e) {
    const local = fallbackBatches.find(b => b.serializedQrCode === token || b.id === token);
    if (local) {
      activeBatch = local;
      renderVerificationSuccess(activeBatch);
    } else {
      renderVerificationFailure(token);
    }
  }
};

function renderVerificationSuccess(b) {
  const container = document.getElementById("verification-result");
  if (!container) return;

  const isFlagged = b.stage === "REVOKED_ADULTERATED" || !b.giTagAuthorized;

  let bannerHtml = "";
  if (isFlagged) {
    bannerHtml = `
      <div class="result-banner danger" style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
        <div style="display: flex; gap: 1rem; align-items: flex-start;">
          <span style="font-size: 2.2rem;">🚨</span>
          <div>
            <h3 style="color: #991b1b; margin-bottom: 0.25rem;">COUNTERFEIT / ADULTERATION ALERT</h3>
            <p style="color: #7f1d1d; font-size: 0.92rem; line-height: 1.5;">
              This textile batch (<code>${b.id}</code>) has been <strong>REJECTED & INTERCEPTED</strong> by the Central Muga Eri Research & Training Institute (CMER&TI). Non-destructive NIR spectroscopy detected synthetic polyester and dyed Tasar fiber adulteration. Assam GI Tag #38 authorization is revoked.
            </p>
            <div style="margin-top: 0.5rem; font-size: 0.82rem; font-weight: 700; color: #b91c1c;">
              Reported to: Directorate Anti-Counterfeit Flying Squad • Sample Hash: <code>${b.spectralAnalysis?.spectralScanHash?.slice(0, 24)}...</code>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    bannerHtml = `
      <div class="result-banner success" style="background: #fdfbf7; border: 2px solid #f59e0b; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.15);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; gap: 1rem; align-items: center;">
            <span style="font-size: 2.4rem;">🛡️</span>
            <div>
              <div style="font-size: 0.78rem; text-transform: uppercase; font-weight: 800; color: #b45309; letter-spacing: 0.05em;">
                OFFICIAL GEOGRAPHICAL INDICATION VERIFIED
              </div>
              <h2 style="color: #78350f; font-size: 1.35rem; margin: 0.1rem 0;">
                Assam Muga Silk • Certificate #38 Authorized
              </h2>
              <div style="font-size: 0.85rem; color: #4b5563;">
                ${b.productTitle} • GI Serial: <strong>${b.giCertNumber}</strong>
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <div style="background: #065f46; color: #fff; padding: 0.4rem 0.85rem; border-radius: 9999px; font-weight: 700; font-size: 0.85rem;">
              ✓ 100% Pure Muga (${b.spectralAnalysis?.purityScorePct || 99.4}%)
            </div>
            <div style="background: #0284c7; color: #fff; padding: 0.4rem 0.85rem; border-radius: 9999px; font-weight: 700; font-size: 0.85rem;">
              🌟 Silk Mark: ${b.spectralAnalysis?.silkMarkSerialNo || "SMOI-PASS"}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 5-Stage Chronological Timeline
  const timelineHtml = `
    <div class="card" style="margin-bottom: 1.5rem;">
      <h3 style="color: var(--primary-muga); margin-bottom: 1rem;">
        🧵 Chronological Cocoon-to-Consumer Provenance Journey
      </h3>
      <div class="timeline">

        <!-- Stage 1: Rearing -->
        <div class="timeline-item">
          <div class="timeline-dot green"></div>
          <div class="timeline-content">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
              <strong>1. Silkworm Rearing & Cocoon Harvest (পলু পালন)</strong>
              <small style="color: var(--text-muted);">${b.rearing.harvestDate ? new Date(b.rearing.harvestDate).toLocaleDateString() : "Oct 2026"}</small>
            </div>
            <div style="font-size: 0.85rem; margin-top: 0.35rem; color: #374151;">
              Farmer: <strong>${b.rearing.rearerName}</strong> (${b.rearing.rearerId})<br>
              Host Trees: <strong>${b.rearing.hostPlantSpecies}</strong> • Season: ${b.rearing.cropSeason}<br>
              Cadastral Survey: <strong>${b.rearing.gps?.cadastralDag || "Dag #118/340"}</strong> (${b.rearing.gps?.cadastralPatta || "Periodic Patta #24"})<br>
              GPS Coordinates: <code>${b.rearing.gps.lat}, ${b.rearing.gps.lng}</code> (Elevation: ${b.rearing.gps.elevationMeters || 102}m)<br>
              Cocoon Yield: <strong>${b.rearing.cocoonCount.toLocaleString()} cocoons</strong> (~${b.rearing.cocoonWeightKg} Kg)
            </div>
          </div>
        </div>

        <!-- Stage 2: Cocoon Market -->
        <div class="timeline-item">
          <div class="timeline-dot ${b.cocoonMarket ? "green" : "gray"}"></div>
          <div class="timeline-content">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
              <strong>2. Government Cocoon Market & Bank (কোঁহ বজাৰ)</strong>
              <small style="color: var(--text-muted);">${b.cocoonMarket?.intakeDate ? new Date(b.cocoonMarket.intakeDate).toLocaleDateString() : "Pending"}</small>
            </div>
            <div style="font-size: 0.85rem; margin-top: 0.35rem; color: #374151;">
              ${b.cocoonMarket ? `
                Market: <strong>${b.cocoonMarket.marketName}</strong><br>
                Grade: <strong>${b.cocoonMarket.cocoonGrade}</strong> • Shell Ratio: <strong>${b.cocoonMarket.shellRatioPct}%</strong><br>
                MSP Rate: ₹${b.cocoonMarket.ratePerThousandRs} / 1000 cocoons (Govt Minimum Support Price Guarantee)
              ` : `<em>Pending official cocoon bank grading.</em>`}
            </div>
          </div>
        </div>

        <!-- Stage 3: Reeling -->
        <div class="timeline-item">
          <div class="timeline-dot ${b.reeling ? "green" : "gray"}"></div>
          <div class="timeline-content">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
              <strong>3. CSTRI Motorized Reeling & Twisting (সূতা কটা)</strong>
              <small style="color: var(--text-muted);">${b.reeling?.reelingCompletedDate ? new Date(b.reeling.reelingCompletedDate).toLocaleDateString() : "Pending"}</small>
            </div>
            <div style="font-size: 0.85rem; margin-top: 0.35rem; color: #374151;">
              ${b.reeling ? `
                Unit: <strong>${b.reeling.reelerName}</strong> (${b.reeling.clusterLocation})<br>
                Method: <strong>${b.reeling.reelingMethod}</strong><br>
                Filament Fineness: <strong>${b.reeling.denierCount} Denier</strong> • Continuity: ${b.reeling.filamentContinuityMeters}m unbroken<br>
                Raw Muga Silk Yield: ${b.reeling.rawSilkYieldGrams} grams
              ` : `<em>Pending reeling operations.</em>`}
            </div>
          </div>
        </div>

        <!-- Stage 4: Sualkuchi Weaving -->
        <div class="timeline-item">
          <div class="timeline-dot ${b.weaving ? "green" : "gray"}"></div>
          <div class="timeline-content">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
              <strong>4. Sualkuchi Handloom Weaving (তাঁতশালত বোৱা)</strong>
              <small style="color: var(--text-muted);">${b.weaving?.weavingCompletedDate ? new Date(b.weaving.weavingCompletedDate).toLocaleDateString() : "Pending"}</small>
            </div>
            <div style="font-size: 0.85rem; margin-top: 0.35rem; color: #374151;">
              ${b.weaving ? `
                Artisan: <strong>${b.weaving.weaverName}</strong> (Loom: <code>${b.weaving.loomId}</code>)<br>
                Cluster: <strong>${b.weaving.cluster}</strong> (The Manchester of the East)<br>
                Heritage Motif: <strong>${b.weaving.designMotif}</strong><br>
                Dimensions: ${b.weaving.dimensionsMeters} • Net Woven Weight: ${b.weaving.wovenWeightGrams}g<br>
                Artisan Fair Wage DBT: <strong style="color: #065f46;">₹${b.weaving.artisanFairWagePaidRs.toLocaleString()} (Paid)</strong>
              ` : `<em>Pending loom assignment.</em>`}
            </div>
          </div>
        </div>

        <!-- Stage 5: CMER&TI Spectroscopy -->
        <div class="timeline-item">
          <div class="timeline-dot ${isFlagged ? "red" : (b.spectralAnalysis ? "green" : "gray")}"></div>
          <div class="timeline-content">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
              <strong>5. CMER&TI Non-Destructive NIR Purity Scan (অ-ধ্বংসাত্মক পৰীক্ষণ)</strong>
              <small style="color: var(--text-muted);">${b.spectralAnalysis?.testDate ? new Date(b.spectralAnalysis.testDate).toLocaleDateString() : "Pending"}</small>
            </div>
            <div style="font-size: 0.85rem; margin-top: 0.35rem; color: #374151;">
              ${b.spectralAnalysis ? `
                Testing Facility: <strong>${b.spectralAnalysis.labName}</strong> (${b.spectralAnalysis.accreditationNo})<br>
                Instrument: <strong>${b.spectralAnalysis.instrumentType}</strong><br>
                Calculated Fibroin Purity: <strong style="color: ${isFlagged ? "#dc2626" : "#065f46"}; font-size: 0.95rem;">${b.spectralAnalysis.purityScorePct}%</strong><br>
                ${isFlagged ? `
                  <div style="background: #fee2e2; border-left: 3px solid #dc2626; padding: 0.4rem; margin-top: 0.35rem; font-size: 0.8rem; color: #991b1b;">
                    ⚠️ Adulteration Profile: ${b.spectralAnalysis.adulterantDetails?.polyesterPct}% Synthetic Polyester warp + ${b.spectralAnalysis.adulterantDetails?.tasarBlendedPct}% Dyed Chinese Tasar fiber.
                  </div>
                ` : `
                  Amide I (1650 cm⁻¹): 0.88 • Amide II (1520 cm⁻¹): 0.76 • Amide III (1235 cm⁻¹): 0.54<br>
                  Synthetic Impurities: <strong>0.00% (Pure Antheraea assamensis)</strong><br>
                  Silk Mark Issued: <strong>${b.spectralAnalysis.silkMarkSerialNo}</strong>
                `}
              ` : `<em>Pending spectroscopic test scan.</em>`}
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  container.innerHTML = bannerHtml + timelineHtml;
}

function renderVerificationFailure(token) {
  const container = document.getElementById("verification-result");
  if (!container) return;
  container.innerHTML = `
    <div class="result-banner danger" style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 8px; padding: 1.5rem; text-align: center;">
      <span style="font-size: 3rem;">⚠️</span>
      <h3 style="color: #991b1b; margin-top: 0.5rem;">UNREGISTERED OR FORGED QR CODE</h3>
      <p style="color: #7f1d1d; font-size: 0.95rem; max-width: 600px; margin: 0.5rem auto;">
        The token <code>${token}</code> is not found in the Government of Assam Sericulture Blockchain Registry. This fabric has not undergone mandatory CMER&TI non-destructive authentication and may be an unauthorized synthetic or counterfeit blend.
      </p>
      <button class="btn-primary" style="background: #dc2626; margin-top: 0.75rem;" onclick="showToast('Incident logged and forwarded to Directorate Anti-Counterfeit Cell.', 'warning')">
        🚨 Report Counterfeit to Sericulture Directorate
      </button>
    </div>
  `;
}

// Action Modals: Certificate & Packaging Stamp
function setupActionModals() {
  const btnOpenCert = document.getElementById("btn-open-cert");
  const btnCloseCert = document.getElementById("btn-close-cert");
  const btnCloseCertBottom = document.getElementById("btn-close-cert-bottom");
  const certModal = document.getElementById("cert-modal");

  if (btnOpenCert && certModal) {
    btnOpenCert.addEventListener("click", () => {
      renderOfficialCertificate(activeBatch);
      certModal.classList.add("active");
    });
    [btnCloseCert, btnCloseCertBottom].forEach(b => b?.addEventListener("click", () => certModal.classList.remove("active")));
  }

  const btnOpenStamp = document.getElementById("btn-open-stamp");
  const btnCloseStamp = document.getElementById("btn-close-stamp");
  const btnCloseStampBottom = document.getElementById("btn-close-stamp-bottom");
  const stampModal = document.getElementById("stamp-modal");

  if (btnOpenStamp && stampModal) {
    btnOpenStamp.addEventListener("click", () => {
      renderPackagingStamp(activeBatch);
      stampModal.classList.add("active");
    });
    [btnCloseStamp, btnCloseStampBottom].forEach(b => b?.addEventListener("click", () => stampModal.classList.remove("active")));
  }

  const btnOpenApprec = document.getElementById("btn-open-appreciation");
  const btnCloseApprec = document.getElementById("btn-close-appreciation");
  const btnCloseApprecBottom = document.getElementById("btn-close-appreciation-bottom");
  const btnSubmitApprec = document.getElementById("btn-submit-appreciation");
  const apprecModal = document.getElementById("grower-appreciation-modal");

  if (btnOpenApprec && apprecModal) {
    btnOpenApprec.addEventListener("click", () => apprecModal.classList.add("active"));
    [btnCloseApprec, btnCloseApprecBottom].forEach(b => b?.addEventListener("click", () => apprecModal.classList.remove("active")));
    btnSubmitApprec?.addEventListener("click", () => {
      showToast("💛 Direct appreciation and heritage badge awarded to artisan & rearer!", "success");
      apprecModal.classList.remove("active");
    });
  }
}

function renderOfficialCertificate(b) {
  const area = document.getElementById("cert-print-area");
  if (!area) return;

  area.innerHTML = `
    <div style="border: 4px double #b45309; padding: 2rem; background: #fffcf7; font-family: 'Times New Roman', serif; color: #1e293b;">
      <div style="text-align: center; border-bottom: 2px solid #b45309; padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <div style="font-size: 1.1rem; font-weight: 700; color: #78350f; text-transform: uppercase; letter-spacing: 0.1em;">
          GOVERNMENT OF ASSAM • DEPARTMENT OF HANDLOOM, TEXTILES & SERICULTURE
        </div>
        <div style="font-size: 0.9rem; color: #475569; margin-top: 0.25rem;">
          In Scientific Collaboration with Central Muga Eri Research & Training Institute (CMER&TI), Lahdoigarh
        </div>
        <h1 style="font-size: 1.8rem; color: #78350f; margin: 0.5rem 0;">
          Certificate of Authenticity & Geographical Indication
        </h1>
        <div style="font-size: 0.85rem; font-weight: 700; color: #065f46;">
          ASSAM MUGA SILK • GI APPLICATION NO. 55 • REGISTRATION CERTIFICATE NO. 38
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; font-size: 0.9rem;">
        <div>
          <div>Batch Number: <strong>${b.id}</strong></div>
          <div>Apparel Type: <strong>${b.productTitle}</strong></div>
          <div>Sericulture District: <strong>${b.rearing.district}</strong></div>
          <div>Weaving Society: <strong>${b.weaving?.cluster || "Sualkuchi"} Handloom Guild</strong></div>
        </div>
        <div style="text-align: right;">
          <div>GI Serial: <strong>${b.giCertNumber}</strong></div>
          <div>Silk Mark Serial: <strong>${b.spectralAnalysis?.silkMarkSerialNo || "SMOI-PASS"}</strong></div>
          <div>Date of Certification: <strong>${b.spectralAnalysis?.testDate ? new Date(b.spectralAnalysis.testDate).toLocaleDateString() : "Nov 2026"}</strong></div>
          <div>Blockchain State Hash: <code>${b.blockchainTxHash ? b.blockchainTxHash.slice(0, 16) : "0x8f3c...812"}...</code></div>
        </div>
      </div>

      <div style="background: #fefce8; border: 1px solid #fef08a; padding: 1rem; margin-bottom: 1.5rem; font-size: 0.88rem;">
        <div style="font-weight: 700; color: #78350f; margin-bottom: 0.35rem;">CMER&TI Non-Destructive Spectroscopic Attestation:</div>
        <p style="color: #451a03; line-height: 1.5; margin: 0;">
          This textile has been examined using non-destructive Near-Infrared (NIR) molecular spectroscopy (NABL TC-8842). The sample exhibited characteristic Amide I, II, and III protein absorption peaks confirming <strong>${b.spectralAnalysis?.purityScorePct || 99.4}% pure Antheraea assamensis fibroin</strong> with zero synthetic adulteration.
        </p>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 2rem;">
        <div>
          <div style="border-top: 1px solid #78350f; width: 180px; text-align: center; font-size: 0.8rem; padding-top: 0.25rem;">
            Artisan / Master Weaver
          </div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 1.8rem;">🛡️</div>
          <div style="font-size: 0.75rem; font-weight: 700; color: #78350f;">OFFICIAL GI SEAL #38</div>
        </div>
        <div>
          <div style="border-top: 1px solid #78350f; width: 180px; text-align: center; font-size: 0.8rem; padding-top: 0.25rem;">
            Director of Sericulture, Assam
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPackagingStamp(b) {
  const area = document.getElementById("stamp-preview-area");
  if (!area) return;

  area.innerHTML = `
    <div style="border: 2px dashed #b45309; padding: 1.5rem; background: #fffcf7; text-align: center; border-radius: 8px;">
      <div style="font-size: 0.75rem; font-weight: 800; color: #b45309; letter-spacing: 0.08em; text-transform: uppercase;">
        GS1 DIGITAL LINK • GEOGRAPHICAL INDICATION VERIFIED
      </div>
      <div style="font-size: 1.25rem; font-weight: 700; color: #78350f; margin: 0.25rem 0;">
        100% PURE ASSAM MUGA SILK (GI-38)
      </div>
      <div style="font-size: 0.85rem; color: #475569; margin-bottom: 1rem;">
        ${b.productTitle}
      </div>

      <div style="display: inline-block; padding: 0.75rem; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 1rem;">
        <svg viewBox="0 0 100 100" width="120" height="120">
          <!-- Simplified High-Contrast QR Code Representation -->
          <rect width="100" height="100" fill="#fff" />
          <rect x="10" y="10" width="25" height="25" fill="#78350f" />
          <rect x="15" y="15" width="15" height="15" fill="#fff" />
          <rect x="18" y="18" width="9" height="9" fill="#78350f" />

          <rect x="65" y="10" width="25" height="25" fill="#78350f" />
          <rect x="70" y="15" width="15" height="15" fill="#fff" />
          <rect x="73" y="18" width="9" height="9" fill="#78350f" />

          <rect x="10" y="65" width="25" height="25" fill="#78350f" />
          <rect x="15" y="70" width="15" height="15" fill="#fff" />
          <rect x="18" y="73" width="9" height="9" fill="#78350f" />

          <!-- Center Silk Emblem -->
          <circle cx="50" cy="50" r="10" fill="#f59e0b" />
          <text x="50" y="54" font-size="8" font-weight="900" fill="#78350f" text-anchor="middle">GI</text>
        </svg>
      </div>

      <div style="font-size: 0.8rem; font-family: monospace; color: #1e293b; margin-bottom: 0.5rem;">
        Token: <strong>${b.serializedQrCode}</strong> • NFC: <code>${b.nfcTagUid || "04:5A:22:9C"}</code>
      </div>
      <div style="font-size: 0.75rem; color: #64748b;">
        Scan to view complete farmer, reeling, loom, and CMER&TI spectral test history.<br>
        https://muga-trace.assam.gov.in/verify/${b.id}
      </div>
    </div>
  `;
}

// 2. Silkworm Rearer & Cocoon Market Portal ("পলু-সেৱা")
function setupRearerPortal() {
  const selectGrower = document.getElementById("select-grower");
  if (selectGrower) {
    selectGrower.innerHTML = sampleRearers.map(r => `
      <option value="${r.id}">${r.name} — ${r.district} (${r.trees} ${r.host} trees)</option>
    `).join("");
  }

  const formHarvest = document.getElementById("form-harvest");
  if (formHarvest) {
    formHarvest.addEventListener("submit", (e) => {
      e.preventDefault();
      const rearerId = selectGrower.value;
      const count = parseInt(document.getElementById("input-cocoon-count")?.value || "12000");
      const weight = parseFloat(document.getElementById("input-weight")?.value || "18.5");
      const host = document.getElementById("select-host-plant")?.value || "Som (Persea bombycina)";

      const newBatch = {
        id: `MUG-2026-SER-${String(fallbackBatches.length + 1).padStart(3, "0")}`,
        stage: "REARING_LOGGED",
        apparelType: "MEKHELA_SADOR",
        productTitle: `Assam Muga Silk Lot (${host.split(" ")[0]})`,
        rearing: {
          rearerId,
          rearerName: sampleRearers.find(x => x.id === rearerId)?.name || "Registered Rearer",
          district: "Lakhimpur",
          hostPlantSpecies: host,
          dflBatchNo: `DFL-2026-KATIA-${Math.floor(100 + Math.random() * 900)}`,
          pebrineFreeCertified: true,
          cropSeason: document.getElementById("select-crop-season")?.value || "Katia (Autumn)",
          gps: { lat: 27.2412, lng: 94.4515, elevationMeters: 102, cadastralDag: "Dag #118/340", cadastralPatta: "Periodic Patta #24" },
          cocoonCount: count,
          cocoonWeightKg: weight,
          harvestDate: new Date().toISOString(),
        },
        serializedQrCode: `QR-MUG26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        giTagAuthorized: true,
        giCertNumber: `#GI-IN-ASM-MUG-0038-${String(fallbackBatches.length + 1).padStart(5, "0")}`,
      };

      fallbackBatches.unshift(newBatch);
      showToast(`🐛 Rearing harvest logged successfully! Batch ID: <strong>${newBatch.id}</strong>`, "success");
      updateProcessBatchDropdown();
      formHarvest.reset();
    });
  }

  // GPS Refresh simulation
  const btnGps = document.getElementById("btn-gps-refresh");
  if (btnGps) {
    btnGps.addEventListener("click", () => {
      showToast("📍 High-precision GPS locked: 27.2412, 94.4515 (Dhakuakhana Dag #118/340)", "info");
    });
  }

  // Weighbridge sync
  const btnWbSync = document.getElementById("btn-weighbridge-sync");
  if (btnWbSync) {
    btnWbSync.addEventListener("click", () => {
      const statusDiv = document.getElementById("weighbridge-status");
      if (statusDiv) {
        statusDiv.innerHTML = `
          <div style="background: #ecfdf5; border: 1px solid #6ee7b7; padding: 0.75rem; border-radius: 6px; color: #065f46;">
            ✓ <strong>Weighbridge Receipt Synced:</strong> Verified weight 18.2 Kg (12,000 cocoons). Shell ratio: 10.8%. MSP payout of ₹26,400 dispatched via DBT to Bhaben Chutia.
          </div>
        `;
      }
      showToast("⚖️ Cocoon Bank intake and MSP receipt synced!", "success");
    });
  }

  // Bilingual Toggle (Assamese / English)
  const btnLang = document.getElementById("btn-lang-toggle");
  let isAssamese = false;
  if (btnLang) {
    btnLang.addEventListener("click", () => {
      isAssamese = !isAssamese;
      btnLang.textContent = isAssamese ? "English / অসমীয়া" : "অসমীয়া / EN";
      const title = document.getElementById("rearer-title-text");
      if (title) title.textContent = isAssamese ? "মুগা পলু পালন আৰু কোঁহ সংগ্ৰহ পঞ্জীয়ন" : "Silkworm Rearer (Som/Soalu) Harvest Log";
      showToast(isAssamese ? "ভাষাটো অসমীয়ালৈ সলনি কৰা হ'ল।" : "Switched interface to English.", "info");
    });
  }

  // Render disease matrix table
  const tbody = document.getElementById("ppc-table-body");
  if (tbody) {
    tbody.innerHTML = sericultureDiseaseMatrix.map(m => `
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.6rem; font-weight: 700; color: #78350f;">${m.disease}</td>
        <td style="padding: 0.6rem; font-style: italic;">${m.pathogen}</td>
        <td style="padding: 0.6rem;">${m.protocol}</td>
        <td style="padding: 0.6rem;">${m.tolerance}</td>
        <td style="padding: 0.6rem; font-size: 0.8rem;">${m.sop}</td>
        <td style="padding: 0.6rem;"><span style="background: #ecfdf5; color: #065f46; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 700; font-size: 0.75rem;">${m.status}</span></td>
      </tr>
    `).join("");
  }
}

// 3. Reeling & Sualkuchi Loom Portal
function setupWeavingPortal() {
  updateProcessBatchDropdown();

  const formProcess = document.getElementById("form-process-batch");
  if (formProcess) {
    formProcess.addEventListener("submit", (e) => {
      e.preventDefault();
      const select = document.getElementById("select-process-batch");
      const batchId = select?.value;
      const b = fallbackBatches.find(x => x.id === batchId);
      if (b) {
        b.weaving = {
          weaverId: "WEAV-SUA-001",
          weaverName: "Prabin Baishya (প্ৰবীন বৈশ্য)",
          cluster: "Sualkuchi",
          loomId: "LOOM-SUA-JACQ-018",
          apparelType: document.getElementById("select-grade")?.value || "MEKHELA_SADOR",
          designMotif: document.getElementById("select-motif")?.value || "Traditional Kingkhap",
          warpCountDenier: 38,
          weftCountDenier: 40,
          dimensionsMeters: "Mekhela 2.45m x 0.95m, Sador 2.80m x 1.05m",
          wovenWeightGrams: 820,
          artisanFairWagePaidRs: parseInt(document.getElementById("input-fair-wage")?.value || "14500"),
          weavingCompletedDate: new Date().toISOString(),
        };
        b.stage = "HANDLOOM_WOVEN";
        showToast(`🏛️ Sualkuchi weaving logged for <strong>${b.id}</strong>! Ready for CMER&TI spectral scan.`, "success");
      }
    });
  }

  // Telemetry simulation boxes
  const iotContainer = document.getElementById("iot-telemetry-container");
  if (iotContainer) {
    iotContainer.innerHTML = `
      <div class="stat-box" style="border-left-color: #0284c7;">
        <div class="stat-label">CSTRI Motorized Reeling Speed</div>
        <div class="stat-value" style="color: #0284c7;">240 RPM</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">Filament Tension: 14.2cN • Denier: 37.4</div>
      </div>
      <div class="stat-box" style="border-left-color: #f59e0b;">
        <div class="stat-label">Sualkuchi Jacquard Loom Humidity</div>
        <div class="stat-value" style="color: #b45309;">68% RH</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">Optimal silk pliability range (65-72%)</div>
      </div>
      <div class="stat-box" style="border-left-color: #10b981;">
        <div class="stat-label">Active Society Looms</div>
        <div class="stat-value" style="color: #065f46;">42 Looms</div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">Cluster: Sualkuchi Resham Samabai</div>
      </div>
    `;
  }
}

function updateProcessBatchDropdown() {
  const select = document.getElementById("select-process-batch");
  const selectSpectral = document.getElementById("select-spectral-batch");

  if (select) {
    select.innerHTML = fallbackBatches.map(b => `
      <option value="${b.id}">${b.id} — ${b.productTitle} (${b.stage})</option>
    `).join("");
  }
  if (selectSpectral) {
    selectSpectral.innerHTML = fallbackBatches.map(b => `
      <option value="${b.id}">${b.id} — ${b.productTitle}</option>
    `).join("");
  }
}

// 4. CMER&TI Non-Destructive Spectral Lab Portal
function setupSpectralPortal() {
  const btnScan = document.getElementById("btn-run-spectral-scan");
  const btnSilkMark = document.getElementById("btn-issue-silk-mark");

  if (btnScan) {
    btnScan.addEventListener("click", () => {
      const select = document.getElementById("select-spectral-batch");
      const batchId = select?.value || fallbackBatches[0].id;
      const b = fallbackBatches.find(x => x.id === batchId);

      const isFlagged = b && (b.id === "MUG-2026-FLG-006" || b.stage === "REVOKED_ADULTERATED");

      const pAmide1 = document.getElementById("peak-amide1");
      const pAmide2 = document.getElementById("peak-amide2");
      const pAmide3 = document.getElementById("peak-amide3");
      const pPolyester = document.getElementById("peak-polyester");
      const pPurity = document.getElementById("spectral-purity-score");
      const curve = document.getElementById("svg-spectral-curve");
      const statusInd = document.getElementById("spectral-status-indicator");

      if (isFlagged) {
        if (pAmide1) { pAmide1.textContent = "0.42 (FAIL)"; pAmide1.style.color = "#dc2626"; }
        if (pAmide2) { pAmide2.textContent = "0.38 (FAIL)"; pAmide2.style.color = "#dc2626"; }
        if (pAmide3) { pAmide3.textContent = "0.24 (FAIL)"; pAmide3.style.color = "#dc2626"; }
        if (pPolyester) { pPolyester.textContent = "0.68 (HIGH ESTER DETECTED)"; pPolyester.style.color = "#dc2626"; }
        if (pPurity) { pPurity.textContent = "62.1% (COUNTERFEIT / BLEND)"; pPurity.style.color = "#dc2626"; }
        if (curve) {
          curve.setAttribute("stroke", "#ef4444");
          // Distorted curve with polyester peak
          curve.setAttribute("d", "M 50 160 Q 90 155 120 150 Q 140 40 150 30 Q 170 120 200 90 Q 250 130 280 140 Q 320 160 370 165");
        }
        if (statusInd) {
          statusInd.innerHTML = "● <strong>SYNTHETIC ADULTERATION DETECTED</strong>";
          statusInd.style.color = "#ef4444";
        }
        showToast("🚨 Non-destructive NIR scan failed! Synthetic polyester blend detected in sample.", "error");
      } else {
        if (pAmide1) { pAmide1.textContent = "0.88 (PASS)"; pAmide1.style.color = "#065f46"; }
        if (pAmide2) { pAmide2.textContent = "0.76 (PASS)"; pAmide2.style.color = "#065f46"; }
        if (pAmide3) { pAmide3.textContent = "0.54 (PASS)"; pAmide3.style.color = "#065f46"; }
        if (pPolyester) { pPolyester.textContent = "0.00 (NONE DETECTED)"; pPolyester.style.color = "#065f46"; }
        if (pPurity) { pPurity.textContent = "99.4% (Pure Muga Fibroin)"; pPurity.style.color = "#065f46"; }
        if (curve) {
          curve.setAttribute("stroke", "#f59e0b");
          curve.setAttribute("d", "M 50 160 Q 90 155 120 130 Q 150 70 170 45 Q 190 75 220 70 Q 250 120 280 110 Q 320 150 370 165");
        }
        if (statusInd) {
          statusInd.innerHTML = "● Optical Signature Verified (Antheraea assamensis)";
          statusInd.style.color = "#34d399";
        }
        showToast("🔬 Optical scan complete: 100% pure Muga fibroin verified!", "success");
      }
    });
  }

  if (btnSilkMark) {
    btnSilkMark.addEventListener("click", () => {
      showToast("🌟 Cryptographic NABL Silk Mark certificate generated & IPFS hash pinned!", "success");
    });
  }
}

// 5. Sericulture Directorate & State GI Admin Panel
function setupAdminGovernance() {
  const btnAutofill = document.getElementById("btn-autofill-admin");
  const formLogin = document.getElementById("form-admin-login");
  const btnLogout = document.getElementById("btn-admin-logout");
  const loginView = document.getElementById("admin-login-view");
  const authView = document.getElementById("admin-authenticated-view");

  if (btnAutofill) {
    btnAutofill.addEventListener("click", () => {
      const u = document.getElementById("admin-username");
      const p = document.getElementById("admin-password");
      if (u) u.value = "admin@sericulture.assam.gov.in";
      if (p) p.value = "muga2026";
      showToast("🔑 Demo credentials auto-filled.", "info");
    });
  }

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const u = document.getElementById("admin-username")?.value;
      const p = document.getElementById("admin-password")?.value;

      if ((u === "admin@sericulture.assam.gov.in" || u.includes("admin")) && (p === "muga2026" || p.length >= 4)) {
        adminAuthenticated = true;
        if (loginView) loginView.style.display = "none";
        if (authView) authView.style.display = "block";
        showToast("🏛️ Welcome Anindita Sonowal! Sericulture Command Center unlocked.", "success");
        renderAdminAnalytics();
        renderAdminGITable();
        renderAdminAlerts();
        setTimeout(() => initOrUpdateGisMap(), 200);
      } else {
        const err = document.getElementById("admin-login-error");
        if (err) {
          err.style.display = "block";
          err.textContent = "Invalid institutional credentials. Please use demo credentials.";
        }
      }
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      adminAuthenticated = false;
      if (authView) authView.style.display = "none";
      if (loginView) loginView.style.display = "block";
      showToast("🔒 Admin session ended.", "info");
    });
  }

  setupAdminSubtabs();
}

function setupAdminSubtabs() {
  const tabs = document.querySelectorAll(".admin-tab-btn");
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".admin-subpane").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-subtab");
      const pane = document.getElementById(`subtab-${target}`);
      if (pane) pane.classList.add("active");
      if (target === "heatmap") setTimeout(() => initOrUpdateGisMap(), 200);
    });
  });

  // Merkle Trigger
  const btnMerkle = document.getElementById("btn-trigger-merkle-anchor");
  if (btnMerkle) {
    btnMerkle.addEventListener("click", () => {
      const display = document.getElementById("admin-merkle-root-display");
      const status = document.getElementById("merkle-anchor-status");
      const newRoot = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;
      if (display) display.textContent = newRoot;
      if (status) {
        status.innerHTML = `
          <div style="background: #ecfdf5; border: 1px solid #6ee7b7; padding: 0.75rem; border-radius: 6px; color: #065f46; margin-top: 0.5rem; font-size: 0.85rem;">
            ✓ <strong>State Root Anchored:</strong> 6 batches aggregated into Merkle Root <code>${newRoot.slice(0, 20)}...</code> on Polygon PoS Layer 2 (Tx: 0x9a8b...712).
          </div>
        `;
      }
      showToast("🔗 Cryptographic Merkle root anchored to Layer-2 ledger!", "success");
    });
  }
}

function renderAdminAnalytics() {
  const grid = document.getElementById("analytics-stats-grid");
  if (!grid) return;

  const total = fallbackBatches.length;
  const compliant = fallbackBatches.filter(b => b.giTagAuthorized && b.stage !== "REVOKED_ADULTERATED").length;
  const rate = Math.round((compliant / total) * 100);

  grid.innerHTML = `
    <div class="stat-box" style="border-left-color: #b45309;">
      <div class="stat-label">Total Tracked Batches</div>
      <div class="stat-value" style="color: #78350f;">${total}</div>
      <div style="font-size: 0.8rem; color: var(--text-muted);">Cocoon to Consumer</div>
    </div>
    <div class="stat-box" style="border-left-color: #065f46;">
      <div class="stat-label">GI & Purity Compliance</div>
      <div class="stat-value" style="color: #065f46;">${rate}%</div>
      <div style="font-size: 0.8rem; color: var(--text-muted);">${compliant} of ${total} lots certified</div>
    </div>
    <div class="stat-box" style="border-left-color: #0284c7;">
      <div class="stat-label">Active Handloom Weavers</div>
      <div class="stat-value" style="color: #0284c7;">48 Artisans</div>
      <div style="font-size: 0.8rem; color: var(--text-muted);">Sualkuchi Silk Cluster</div>
    </div>
    <div class="stat-box" style="border-left-color: #dc2626;">
      <div class="stat-label">Anti-Counterfeit Interceptions</div>
      <div class="stat-value" style="color: #dc2626;">1 Batch</div>
      <div style="font-size: 0.8rem; color: var(--text-muted);">GI Tag #38 Revoked</div>
    </div>
  `;
}

function renderAdminGITable() {
  const tbody = document.getElementById("admin-gi-table-body");
  if (!tbody) return;

  tbody.innerHTML = fallbackBatches.map(b => {
    const isAuth = b.giTagAuthorized && b.stage !== "REVOKED_ADULTERATED";
    return `
      <tr style="border-bottom: 1px solid var(--border-color);">
        <td style="padding: 0.75rem; font-weight: 700;">${b.id}</td>
        <td style="padding: 0.75rem;">${b.apparelType}</td>
        <td style="padding: 0.75rem;">${b.rearing.district}</td>
        <td style="padding: 0.75rem;">${b.weaving?.cluster || "Sualkuchi"}</td>
        <td style="padding: 0.75rem; font-weight: 700; color: ${isAuth ? "#065f46" : "#dc2626"};">
          ${b.spectralAnalysis?.purityScorePct || 99.4}%
        </td>
        <td style="padding: 0.75rem; font-family: monospace; font-size: 0.8rem;">${b.giCertNumber}</td>
        <td style="padding: 0.75rem;">
          <span style="background: ${isAuth ? "#ecfdf5" : "#fef2f2"}; color: ${isAuth ? "#065f46" : "#dc2626"}; padding: 0.25rem 0.6rem; border-radius: 9999px; font-weight: 700; font-size: 0.75rem;">
            ${isAuth ? "✓ AUTHORIZED" : "🚨 REVOKED"}
          </span>
        </td>
        <td style="padding: 0.75rem; text-align: center;">
          <button class="btn-secondary" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;" onclick="toggleGICert('${b.id}', ${!isAuth})">
            ${isAuth ? "Revoke GI" : "Re-Authorize"}
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

window.toggleGICert = function(batchId, newStatus) {
  const b = fallbackBatches.find(x => x.id === batchId);
  if (b) {
    b.giTagAuthorized = newStatus;
    if (!newStatus) {
      b.stage = "REVOKED_ADULTERATED";
      b.giCertNumber = "REVOKED_BY_ADMIN";
      showToast(`🚨 GI authorization revoked for <strong>${batchId}</strong>!`, "warning");
    } else {
      b.stage = "SPECTRAL_CERTIFIED";
      b.giCertNumber = `#GI-IN-ASM-MUG-0038-${batchId.slice(-5)}`;
      showToast(`🛡️ GI authorization restored for <strong>${batchId}</strong>.`, "success");
    }
    renderAdminGITable();
    renderAdminAnalytics();
  }
};

function renderAdminAlerts() {
  const container = document.getElementById("admin-alerts-container");
  if (!container) return;

  container.innerHTML = `
    <div style="background: #fef2f2; border: 1px solid #fecaca; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 6px; margin-bottom: 0.75rem;">
      <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #991b1b; font-weight: 700;">
        <span>🚨 CRITICAL ENFORCEMENT ALERT</span>
        <span>20 Nov 2026, 16:35 IST</span>
      </div>
      <p style="color: #7f1d1d; font-size: 0.88rem; margin: 0.4rem 0;">
        Batch <code>MUG-2026-FLG-006</code> intercepted in Guwahati commercial market raid. Handheld NIR spectroscopy detected 19.4% polyester and 18.5% dyed Chinese Tasar. Assam GI Tag #38 revoked.
      </p>
      <div style="font-size: 0.78rem; color: #b91c1c;">
        Action: Seized by Enforcement Squad • Show Cause Notice Issued to Merchant
      </div>
    </div>
  `;
}

// Interactive Leaflet GIS Map for Sericulture & Cadastral Parcels
let gisMap = null;
let currentGisMode = "macro";

function initOrUpdateGisMap() {
  const mapCanvas = document.getElementById("gis-map-canvas");
  if (!mapCanvas || typeof L === "undefined") return;

  if (!gisMap) {
    gisMap = L.map("gis-map-canvas").setView([26.75, 93.5], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors • Dept. of Sericulture Assam",
    }).addTo(gisMap);
  }

  renderGisMarkers();
}

function renderGisMarkers() {
  if (!gisMap) return;

  // Clear existing layers
  gisMap.eachLayer(layer => {
    if (layer instanceof L.Marker || layer instanceof L.Polygon) {
      gisMap.removeLayer(layer);
    }
  });

  if (currentGisMode === "macro") {
    // Sericulture Regional District Markers
    const locations = [
      { name: "Sualkuchi Silk Weaving Hub", lat: 26.1664, lng: 91.5721, desc: "The Manchester of the East • 3,000+ Active Jacquard & Throw-shuttle Looms" },
      { name: "Dhakuakhana Som Reserve", lat: 27.2412, lng: 94.4515, desc: "Lakhimpur • Primary Som tree silkworm rearing belt (Katia crop)" },
      { name: "Jonai Sericulture Belt", lat: 27.4845, lng: 94.5811, desc: "Dhemaji • Soalu plantation cluster & Government Cocoon Bank" },
      { name: "Joysagar Heritage Sericulture Farm", lat: 26.9688, lng: 94.6312, desc: "Sivasagar • Historical Ahom Dynasty royal sericulture complex" },
      { name: "CMER&TI Lahdoigarh", lat: 26.7725, lng: 94.3412, desc: "Jorhat • Central Research Institute & NABL Non-Destructive Spectral Lab" },
    ];

    locations.forEach(loc => {
      L.marker([loc.lat, loc.lng])
        .addTo(gisMap)
        .bindPopup(`<strong>${loc.name}</strong><br><small>${loc.desc}</small>`);
    });

    gisMap.setView([26.75, 93.5], 7);
  } else {
    // Micro Cadastral Parcels (Dhakuakhana Dag #118/340)
    const polygon = [
      [27.2412, 94.4515],
      [27.2435, 94.4538],
      [27.2408, 94.4565],
      [27.2385, 94.4528],
    ];

    const poly = L.polygon(polygon, { color: "#b45309", fillColor: "#fde68a", fillOpacity: 0.5 }).addTo(gisMap);
    poly.bindPopup("<strong>Dhakuakhana Som Agroforestry Plot</strong><br>Cadastral Dag #118/340 • Patta #24<br>Rearer: Bhaben Chutia (280 Som trees)").openPopup();
    gisMap.fitBounds(poly.getBounds());
  }
}

window.switchGisMode = function(mode) {
  currentGisMode = mode;
  document.getElementById("btn-mode-macro")?.classList.toggle("active", mode === "macro");
  document.getElementById("btn-mode-cadastral")?.classList.toggle("active", mode === "cadastral");
  const clusterBar = document.getElementById("cadastral-cluster-bar");
  if (clusterBar) clusterBar.style.display = mode === "cadastral" ? "flex" : "none";
  renderGisMarkers();
};

window.loadCadastralCluster = function(name) {
  document.querySelectorAll(".cluster-chip").forEach(c => c.classList.remove("active"));
  const btn = Array.from(document.querySelectorAll(".cluster-chip")).find(c => c.textContent.includes(name));
  if (btn) btn.classList.add("active");

  if (gisMap) {
    if (name === "Kamrup") {
      gisMap.setView([26.1664, 91.5721], 14);
      showToast("📍 Loaded Sualkuchi Master Weaver Cluster Dag boundaries.", "info");
    } else {
      gisMap.setView([27.2412, 94.4515], 14);
      showToast(`📍 Loaded ${name} Som plantation Cadastral Parcels.`, "info");
    }
  }
};

// Tutorial Modal Setup
function setupTutorialModal() {
  const btnOpen = document.getElementById("btn-open-tutorial");
  const btnClose = document.getElementById("btn-close-tutorial");
  const btnCloseBottom = document.getElementById("btn-close-tutorial-bottom");
  const modal = document.getElementById("tutorial-modal");
  const triggers = document.querySelectorAll(".tutorial-trigger, #btn-open-tutorial, #footer-tutorial-link");

  if (modal) {
    triggers.forEach(t => {
      t.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("active");
      });
    });
    [btnClose, btnCloseBottom].forEach(b => b?.addEventListener("click", () => modal.classList.remove("active")));
  }
}

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupConsumerVerification();
  setupActionModals();
  setupRearerPortal();
  setupWeavingPortal();
  setupSpectralPortal();
  setupAdminGovernance();
  setupTutorialModal();
});
