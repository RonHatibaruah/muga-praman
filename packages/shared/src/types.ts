/**
 * Types & Domain Interfaces for NESFIC-D-41:
 * Digital Traceability and Non-Destructive Authentication of Muga Silk and Apparel
 * from Cocoon to Consumer (Department of Handloom, Textiles & Sericulture, Govt. of Assam)
 */

export enum StakeholderRole {
  None = 0,
  SericultureRearer = 1,      // মুগা পলু পুহক (Som/Soalu Host Tree Farmer)
  CocoonMarketManager = 2,    // কোঁহ বজাৰ বিষয়া (Government Cocoon Bank / MSP Officer)
  ReelingUnit = 3,            // মুগা সূতা কটা গোট (Bhir / Motorized CSTRI Reeler)
  MasterWeaver = 4,           // তাঁতী / হস্ততাঁত শিল্পী (Sualkuchi Artisan / Society Master)
  CMERTISpectralLab = 5,      // কেন্দ্ৰীয় মুগা এৰী গৱেষণা প্ৰতিষ্ঠান (NABL NIR/Raman Lab Officer)
  RetailBoutique = 6,         // বিক্ৰেতা / ৰপ্তানিকাৰক (Handloom Emporium / Global Retailer)
  SericultureAdmin = 7,       // ৰেচম সঞ্চালকালয় (Directorate of Sericulture / State GI Authority)
}

export enum BatchStage {
  RearingLogged = "REARING_LOGGED",             // পলু পালন আৰু কোঁহ সংগ্ৰহ
  CocoonMarketGraded = "COCOON_MARKET_GRADED",   // কোঁহ শ্ৰেণীবিভাজন আৰু ওজন
  ReeledFilament = "REELED_FILAMENT",           // সূতা কটা আৰু ডেনিয়াৰ পৰীক্ষণ
  HandloomWoven = "HANDLOOM_WOVEN",             // তাঁতশালত বোৱা সাজ (Mekhela Sador / Saree)
  SpectralCertified = "SPECTRAL_CERTIFIED",     // অ-ধ্বংসাত্মক NIR স্পেক্ট্ৰ'স্কপী প্ৰমাণিত (Silk Mark)
  RetailPackaged = "RETAIL_PACKAGED",           // জি.আই টেগসহ পেকেজিং সম্পন্ন (#GI-IN-ASM-MUG-0038)
  RevokedAdulterated = "REVOKED_ADULTERATED",   // জালিয়াতি / ভেজাল ধৰা পৰি বাতিল কৰা হ'ল
}

export enum MugaApparelType {
  MekhelaSador = "MEKHELA_SADOR",               // পৰম্পৰাগত মেখেলা চাদৰ
  TraditionalSaree = "TRADITIONAL_SAREE",       // মুগা শাৰী (৫.৫ মিটাৰ)
  Riha = "RIHA",                               // ৰিহা (বিয়া-সবাহৰ বিশেষ সাজ)
  Gamosa = "GAMOSA",                           // ফুলবছা মুগা গামোচা
  FabricYardage = "FABRIC_YARDAGE",             // থান কাপোৰ (প্ৰতি মিটাৰ)
  HeritageStole = "HERITAGE_STOLE",             // মুগা ষ্ট'ল / চাদৰ
}

export interface GPSCoordinate {
  lat: number;
  lng: number;
  elevationMeters?: number;
  cadastralDag?: string;    // অসম ধৰিত্ৰী দাগ নং (e.g. Dag #142/518)
  cadastralPatta?: string;  // পট্টা নং (e.g. Periodic Patta #42)
  timestamp?: string;
}

export interface RearerProfile {
  id: string;
  name: string;
  assameseName?: string;
  sericultureCardNo: string; // ৰেচম কৃষক পৰিচয় পত্ৰ
  district: "Kamrup" | "Lakhimpur" | "Dhemaji" | "Sivasagar" | "Jorhat" | "Golaghat" | "Goalpara";
  village: string;
  hostPlantSpecies: "Som (Persea bombycina)" | "Soalu (Litsea polyantha)" | "Mixed Agroforestry";
  totalHostTrees: number;
  cropSeason: "Katia (Autumn)" | "Jethua (Spring)" | "Aherua" | "Jarua";
  giCertified: boolean;
  walletAddress: string;
  farmPolygon: GPSCoordinate[];
}

export interface WeaverProfile {
  id: string;
  name: string;
  assameseName?: string;
  artisanPehchanCard: string; // Ministry of Textiles Pehchan ID
  cluster: "Sualkuchi" | "Dhakuakhana" | "Palasbari" | "Dhemaji" | "Kamrup";
  cooperativeSociety: string;
  loomType: "Traditional Throw-Shuttle" | "Fly-Shuttle Frame Loom" | "Jacquard Pattern Loom";
  registeredLooms: number;
  giAuthorizedUserNo: string; // GI-38 Authorized Artisan User No.
  walletAddress: string;
}

export interface RearingRecord {
  rearerId: string;
  rearerName: string;
  district: string;
  hostPlantSpecies: string;
  dflBatchNo: string;              // Disease-Free Layings (DFL) grainage lot
  pebrineFreeCertified: boolean;    // মাইক্ৰ'স্কপিক পেব্ৰিন ৰোগমুক্ত প্ৰমাণপত্ৰ
  cropSeason: string;
  gps: GPSCoordinate;
  cocoonCount: number;             // Total harvested cocoons (e.g. 10,000)
  cocoonWeightKg: number;
  harvestDate: string;
}

export interface CocoonMarketRecord {
  marketId: string;
  marketName: string;
  inspectorName: string;
  cocoonGrade: "Grade A (Prime)" | "Grade B (Medium)" | "Grade C (Flossy)";
  shellRatioPct: number;           // Cocoon shell ratio percentage (e.g. 9.8% - 11.5%)
  rawWeightKg: number;
  ratePerThousandRs: number;       // Govt Minimum Support Price (MSP) per 1000 cocoons
  mspCompliant: boolean;
  intakeDate: string;
}

export interface ReelingRecord {
  reelerId: string;
  reelerName: string;
  clusterLocation: string;
  reelingMethod: "Bhir Traditional" | "CSTRI Motorized Reeling Machine" | "Solar Operable Reeler";
  denierCount: number;             // Filament fineness (e.g. 35-40 Denier)
  filamentContinuityMeters: number;
  rawSilkYieldGrams: number;
  reelingCompletedDate: string;
}

export interface WeavingRecord {
  weaverId: string;
  weaverName: string;
  cluster: string;
  loomId: string;
  apparelType: MugaApparelType;
  designMotif: string;             // e.g. "Kingkhap (কিংকাপ)", "Junbiri", "Kalka", "Miri Gos"
  warpCountDenier: number;
  weftCountDenier: number;
  dimensionsMeters: string;        // e.g. "Mekhela 2.45m x 0.95m, Sador 2.80m x 1.05m"
  wovenWeightGrams: number;
  artisanFairWagePaidRs: number;
  weavingCompletedDate: string;
}

export interface SpectralBand {
  peakName: string;
  targetWavenumberCm1: number;     // e.g. Amide I (1650 cm⁻¹), Amide II (1520 cm⁻¹)
  measuredAbsorbance: number;
  expectedMin: number;
  expectedMax: number;
  conforms: boolean;
}

export interface SpectralAnalysisReport {
  certifierId: string;
  labName: string;                 // e.g. "CMER&TI Non-Destructive Silk Authentication Lab, Lahdoigarh"
  accreditationNo: string;         // NABL TC-8842
  instrumentType: "Handheld Portable NIR Spectrometer" | "Benchtop Micro-Raman Spectrometer";
  spectralScanHash: string;        // Raw spectrometer curve cryptographic hash (SHA-256)
  ipfsHash: string;
  testDate: string;
  purityScorePct: number;          // e.g. 99.4% Pure Antheraea assamensis Fibroin
  adulterationDetected: boolean;
  adulterantDetails?: {
    tasarBlendedPct?: number;      // Dyed Chinese or Indian Tasar (Antheraea mylitta)
    polyesterPct?: number;         // Synthetic polyester imitation
    viscoseRayonPct?: number;
    syntheticDyes?: boolean;
  };
  spectralBands: SpectralBand[];
  silkMarkIssued: boolean;
  silkMarkSerialNo: string;        // e.g. "SMOI-ASM-MUG-2026-9941"
}

export interface MugaBatch {
  id: string;                      // e.g. "MUG-2026-MS-001"
  stage: BatchStage;
  apparelType: MugaApparelType;
  productTitle: string;
  rearing: RearingRecord;
  cocoonMarket?: CocoonMarketRecord;
  reeling?: ReelingRecord;
  weaving?: WeavingRecord;
  spectralAnalysis?: SpectralAnalysisReport;
  retailCustodian?: string;
  serializedQrCode: string;        // e.g. "QR-MUG26-8894-X82F"
  nfcTagUid?: string;             // e.g. "04:5A:22:9C:F1:80:3D"
  giTagAuthorized: boolean;
  giCertNumber: string;            // "#GI-IN-ASM-MUG-0038-XXXX"
  blockchainTxHash?: string;
  merkleLeafHash?: string;
}
