// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "./MugaRegistry.sol";

/**
 * @title MugaProvenance
 * @dev Cryptographic batch lifecycle tracking and Merkle root state anchoring on Layer 2 blockchain
 *      Supports non-destructive spectral purity verification and instant counterfeit revocation.
 * Part of NESFIC-D-41: Digital Traceability and Non-Destructive Authentication of Muga Silk
 */
contract MugaProvenance {
    enum BatchStage {
        RearingLogged,
        CocoonMarketGraded,
        ReeledFilament,
        HandloomWoven,
        SpectralCertified,
        RetailPackaged,
        RevokedAdulterated
    }

    struct BatchState {
        string batchId;
        BatchStage stage;
        address rearer;
        address weaver;
        string productTitle;
        uint256 purityScoreBasisPoints; // e.g. 9940 = 99.40% pure Antheraea assamensis fibroin
        bytes32 spectralScanHash;       // Raw NIR spectrometer curve hash
        bool isSilkMarkIssued;
        bool isGIAuthorized;
        bytes32 merkleRoot;
        uint256 lastUpdatedAt;
    }

    MugaRegistry public immutable registry;
    address public sericultureAdmin;

    mapping(string => BatchState) public batches;
    mapping(bytes32 => uint256) public anchoredStateRoots; // merkleRoot => timestamp

    event BatchStageTransitioned(string indexed batchId, BatchStage indexed newStage, address indexed updatedBy);
    event SpectralPurityVerified(string indexed batchId, uint256 purityScoreBasisPoints, bytes32 spectralScanHash);
    event BatchRevoked(string indexed batchId, string reason, address indexed revokedBy);
    event MerkleRootAnchored(bytes32 indexed root, uint256 totalBatches, uint256 timestamp);

    modifier onlyAdmin() {
        require(msg.sender == sericultureAdmin, "MugaProvenance: Caller is not Sericulture Admin");
        _;
    }

    constructor(address _registry) {
        require(_registry != address(0), "MugaProvenance: Zero registry address");
        registry = MugaRegistry(_registry);
        sericultureAdmin = msg.sender;
    }

    function anchorMerkleRoot(bytes32 root, uint256 batchCount) external onlyAdmin {
        require(root != bytes32(0), "MugaProvenance: Zero root");
        anchoredStateRoots[root] = block.timestamp;
        emit MerkleRootAnchored(root, batchCount, block.timestamp);
    }

    function recordSpectralTest(
        string calldata batchId,
        uint256 purityScoreBasisPoints,
        bytes32 spectralScanHash,
        bool pass
    ) external {
        require(batches[batchId].rearer != address(0), "MugaProvenance: Batch does not exist");
        require(pass ? purityScoreBasisPoints >= 9800 : true, "MugaProvenance: Inconsistent pass status");

        BatchState storage b = batches[batchId];
        b.purityScoreBasisPoints = purityScoreBasisPoints;
        b.spectralScanHash = spectralScanHash;
        b.isSilkMarkIssued = pass;
        b.lastUpdatedAt = block.timestamp;

        if (pass) {
            b.stage = BatchStage.SpectralCertified;
            emit SpectralPurityVerified(batchId, purityScoreBasisPoints, spectralScanHash);
        } else {
            b.stage = BatchStage.RevokedAdulterated;
            b.isGIAuthorized = false;
            emit BatchRevoked(batchId, "Failed non-destructive NIR spectroscopy purity threshold", msg.sender);
        }
    }
}
