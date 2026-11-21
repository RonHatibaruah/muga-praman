import http from "node:http";
import { URL } from "node:url";
import { db } from "./db.js";
import { CMERTI_SPECTRAL_STANDARDS } from "../../../packages/shared/src/constants.js";

const PORT = process.env.PORT || 4000;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(JSON.stringify(data, null, 2));
}

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  // Handle CORS Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    return res.end();
  }

  const reqUrl = new URL(req.url, `http://${req.headers.host || "localhost:4000"}`);
  const pathname = reqUrl.pathname;
  const method = req.method;

  try {
    // 1. Health check
    if (pathname === "/api/health" && method === "GET") {
      return sendJson(res, 200, {
        status: "ok",
        service: "Assam Muga Silk Value Chain Traceability Engine (NESFIC-D-41)",
        department: "Department of Handloom, Textiles & Sericulture, Government of Assam",
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Rearers list
    if (pathname === "/api/rearers" && method === "GET") {
      return sendJson(res, 200, { success: true, data: db.rearers });
    }

    // 3. Weavers list
    if (pathname === "/api/weavers" && method === "GET") {
      return sendJson(res, 200, { success: true, data: db.weavers });
    }

    // 4. Analytics (Sericulture Command Center)
    if (pathname === "/api/analytics" && method === "GET") {
      return sendJson(res, 200, { success: true, data: db.getAnalytics() });
    }

    // 5. Batches list
    if (pathname === "/api/batches" && method === "GET") {
      const batches = db.getAllBatches();
      return sendJson(res, 200, { success: true, data: batches });
    }

    // 6. Sericulture Rearing & Cocoon harvest creation
    if (pathname === "/api/batches/rearing" && method === "POST") {
      const body = await parseBody(req);
      if (!body.rearerId || !body.gps) {
        return sendJson(res, 400, {
          success: false,
          error: "Missing required fields: rearerId, gps",
        });
      }
      const newBatch = db.createRearing(body);
      return sendJson(res, 201, { success: true, data: newBatch });
    }

    // 7. Cocoon Market intake update
    const marketMatch = pathname.match(/^\/api\/batches\/([^\/]+)\/cocoon-market$/);
    if (marketMatch && method === "POST") {
      const batchId = decodeURIComponent(marketMatch[1]);
      const body = await parseBody(req);
      const updated = db.updateCocoonMarket(batchId, body);
      if (!updated) return sendJson(res, 404, { success: false, error: "Batch not found" });
      return sendJson(res, 200, { success: true, data: updated });
    }

    // 8. Reeling update
    const reelingMatch = pathname.match(/^\/api\/batches\/([^\/]+)\/reeling$/);
    if (reelingMatch && method === "POST") {
      const batchId = decodeURIComponent(reelingMatch[1]);
      const body = await parseBody(req);
      const updated = db.updateReeling(batchId, body);
      if (!updated) return sendJson(res, 404, { success: false, error: "Batch not found" });
      return sendJson(res, 200, { success: true, data: updated });
    }

    // 9. Weaving update
    const weavingMatch = pathname.match(/^\/api\/batches\/([^\/]+)\/weaving$/);
    if (weavingMatch && method === "POST") {
      const batchId = decodeURIComponent(weavingMatch[1]);
      const body = await parseBody(req);
      const updated = db.updateWeaving(batchId, body);
      if (!updated) return sendJson(res, 404, { success: false, error: "Batch not found" });
      return sendJson(res, 200, { success: true, data: updated });
    }

    // 10. CMER&TI Non-Destructive Spectral Test
    const spectralMatch = pathname.match(/^\/api\/batches\/([^\/]+)\/spectral-test$/);
    if (spectralMatch && method === "POST") {
      const batchId = decodeURIComponent(spectralMatch[1]);
      const body = await parseBody(req);
      const updated = db.updateSpectralTest(batchId, body);
      if (!updated) return sendJson(res, 404, { success: false, error: "Batch not found" });
      return sendJson(res, 200, { success: true, data: updated });
    }

    // 11. Single Batch detail
    const batchDetailMatch = pathname.match(/^\/api\/batches\/([^\/]+)$/);
    if (batchDetailMatch && method === "GET") {
      const batchId = decodeURIComponent(batchDetailMatch[1]);
      const batch = db.getBatchById(batchId);
      if (!batch) return sendJson(res, 404, { success: false, error: "Batch not found" });
      return sendJson(res, 200, { success: true, data: batch });
    }

    // 12. Public Consumer QR Verification (GS1 Digital Link)
    const verifyMatch = pathname.match(/^\/api\/verify\/([^\/]+)$/);
    if (verifyMatch && method === "GET") {
      const qrToken = decodeURIComponent(verifyMatch[1]);
      const batch = db.getBatchByQrToken(qrToken);
      if (!batch) {
        return sendJson(res, 404, {
          success: false,
          error: "Unregistered or counterfeit QR token. Please alert the Directorate Anti-Counterfeit Cell.",
        });
      }
      return sendJson(res, 200, {
        success: true,
        verified: batch.giTagAuthorized,
        data: batch,
        provenanceMerkleRoot: db.anchors[0]?.root || null,
      });
    }

    // 13. Admin GI Tag Revocation
    if (pathname === "/api/admin/gi/revoke" && method === "POST") {
      const body = await parseBody(req);
      if (!body.batchId || !body.reason) {
        return sendJson(res, 400, { success: false, error: "Missing required fields: batchId, reason" });
      }
      const result = db.revokeGI(body.batchId, body.reason, body.revokedBy || "State GI Authority");
      if (!result) return sendJson(res, 404, { success: false, error: "Batch not found" });
      return sendJson(res, 200, { success: true, data: result });
    }

    // 14. Admin Alerts Feed
    if (pathname === "/api/admin/alerts" && method === "GET") {
      return sendJson(res, 200, { success: true, data: db.getAdminAlerts() });
    }

    // 15. CMER&TI NIR Spectral Calibration Standards
    if (pathname === "/api/spectral/standards" && method === "GET") {
      return sendJson(res, 200, { success: true, data: CMERTI_SPECTRAL_STANDARDS });
    }

    // 16. Blockchain L2 Merkle Anchor Trigger
    if (pathname === "/api/blockchain/anchor" && method === "POST") {
      const anchor = db.anchorMerkleRoot();
      return sendJson(res, 200, {
        success: true,
        message: "Merkle tree state root successfully computed and anchored to Layer-2 ledger.",
        data: anchor,
      });
    }

    // Fallback 404
    return sendJson(res, 404, { success: false, error: "API endpoint not found" });
  } catch (err) {
    console.error("API Error:", err);
    return sendJson(res, 500, { success: false, error: "Internal server error" });
  }
});

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`🧵 Muga Silk Digital Traceability API Engine running on http://localhost:${PORT}`);
  });
}

export default server;
