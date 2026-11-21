// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

/**
 * @title MugaRegistry
 * @dev Manages registered sericulture stakeholders across Assam: Rearers, Cocoon Markets,
 *      Reeling Units, Master Weavers, and CMER&TI Accredited Laboratories.
 * Part of NESFIC-D-41: Digital Traceability and Non-Destructive Authentication of Muga Silk
 * (Department of Handloom, Textiles & Sericulture, Government of Assam)
 */
contract MugaRegistry {
    enum StakeholderRole {
        None,
        SericultureRearer,      // Som/Soalu host plantation rearers
        CocoonMarketManager,    // Govt Cocoon Bank & MSP inspectors
        ReelingUnit,            // Reeling co-operatives
        MasterWeaver,           // Sualkuchi loom societies & artisans
        CMERTISpectralLab,      // NABL NIR/Raman testing facilities
        RetailBoutique,         // Certified handloom emporiums
        SericultureAdmin        // Directorate of Sericulture & State GI Authority
    }

    struct Stakeholder {
        address account;
        string name;
        StakeholderRole role;
        string district;            // e.g. "Kamrup (Sualkuchi)", "Lakhimpur", "Dhemaji", "Sivasagar"
        string governmentRegId;     // Sericulture Card No. / Pehchan ID / NABL TC
        string cadastralParcelHash; // IPFS hash of Dharitree Dag/Patta farm polygon
        bool isGIAuthorized;        // Certified under Assam Muga Silk GI Tag #GI-IN-ASM-MUG-0038
        bool isActive;
        uint256 registeredAt;
    }

    address public sericultureAdmin;
    uint256 public totalStakeholders;

    mapping(address => Stakeholder) public stakeholders;
    mapping(string => address) public regIdToAddress;

    event StakeholderRegistered(address indexed account, string name, StakeholderRole role, string district);
    event GICertificationUpdated(address indexed account, bool isAuthorized, string reason);
    event AdminTransferred(address indexed oldAdmin, address indexed newAdmin);

    modifier onlyAdmin() {
        require(msg.sender == sericultureAdmin, "MugaRegistry: Caller is not Sericulture Admin");
        _;
    }

    modifier onlyActive(address account) {
        require(stakeholders[account].isActive, "MugaRegistry: Stakeholder is inactive");
        _;
    }

    constructor() {
        sericultureAdmin = msg.sender;
        stakeholders[msg.sender] = Stakeholder({
            account: msg.sender,
            name: "Directorate of Sericulture & Handloom, Assam",
            role: StakeholderRole.SericultureAdmin,
            district: "Kamrup Metropolitan",
            governmentRegId: "GOVT-ASM-DHTS-01",
            cadastralParcelHash: "QmSericultureDirectorateAssamHQPolygon",
            isGIAuthorized: true,
            isActive: true,
            registeredAt: block.timestamp
        });
        totalStakeholders = 1;
    }

    function registerStakeholder(
        address account,
        string calldata name,
        StakeholderRole role,
        string calldata district,
        string calldata governmentRegId,
        string calldata cadastralParcelHash,
        bool isGIAuthorized
    ) external onlyAdmin {
        require(account != address(0), "MugaRegistry: Zero address");
        require(bytes(name).length > 0, "MugaRegistry: Empty name");

        stakeholders[account] = Stakeholder({
            account: account,
            name: name,
            role: role,
            district: district,
            governmentRegId: governmentRegId,
            cadastralParcelHash: cadastralParcelHash,
            isGIAuthorized: isGIAuthorized,
            isActive: true,
            registeredAt: block.timestamp
        });

        regIdToAddress[governmentRegId] = account;
        totalStakeholders++;

        emit StakeholderRegistered(account, name, role, district);
        if (isGIAuthorized) {
            emit GICertificationUpdated(account, true, "Initial registration approved by Directorate");
        }
    }

    function setGICertification(address account, bool isAuthorized, string calldata reason) external onlyAdmin {
        require(stakeholders[account].isActive, "MugaRegistry: Stakeholder does not exist or inactive");
        stakeholders[account].isGIAuthorized = isAuthorized;
        emit GICertificationUpdated(account, isAuthorized, reason);
    }
}
