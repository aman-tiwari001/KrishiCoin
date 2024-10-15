// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Crowdfunding {
    // Struct to represent a crowdfunding project
    struct Project {
        string name;
        uint256 targetFunds;
        uint256 deadline;
        address owner;
        uint256 totalFunded;
        bool fundsWithdrawn;
        mapping(address => uint256) funders; // Tracking funders for each project
    }

    // State variables
    mapping(uint256 => Project) projects;

    // Events
    event ProjectCreated(
        uint256 projectId,
        string name,
        uint256 targetFunds,
        uint256 deadline,
        address owner
    );
    event Funded(uint256 projectId, address funder, uint256 amount);
    event OwnerWithdrawn(uint256 projectId, uint256 amount);
    event FunderWithdrawn(uint256 projectId, address funder, uint256 amount);

    // Function to create a new crowdfunding project
    function createProject(
        string memory _name,
        uint256 _targetFunds,
        uint256 _deadline,
        uint256 _projectId
    ) public {
        Project storage newProject = projects[_projectId];
        newProject.name = _name;
        newProject.targetFunds = _targetFunds;
        newProject.deadline = _deadline;
        newProject.owner = msg.sender;
        newProject.totalFunded = 0;
        newProject.fundsWithdrawn = false;

        emit ProjectCreated(
            _projectId,
            _name,
            _targetFunds,
            _deadline,
            msg.sender
        );
    }

    // Helper functions
    function isFundEnabled(
        Project storage project
    ) internal view returns (bool) {
        return block.timestamp <= project.deadline && !project.fundsWithdrawn;
    }

    function isFundSuccess(
        Project storage project
    ) internal view returns (bool) {
        return project.totalFunded >= project.targetFunds;
    }

    // Fund a specific project
    function fund(uint256 projectId) public payable {
        Project storage project = projects[projectId];
        require(isFundEnabled(project), "Funding is disabled");

        project.funders[msg.sender] += msg.value;
        project.totalFunded += msg.value;

        emit Funded(projectId, msg.sender, msg.value);
    }

    // Owner withdraws funds from a specific project
    function withdrawOwner(uint256 projectId) public {
        Project storage project = projects[projectId];
        require(msg.sender == project.owner, "Unauthorized");
        require(isFundSuccess(project), "Funds can't be withdrawn now");

        uint256 balance = project.totalFunded;
        project.totalFunded = 0; // Prevent re-entrancy

        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Unable to send funds");
        project.fundsWithdrawn = true;
        emit OwnerWithdrawn(projectId, balance);
    }

    // Funder withdraws funds from a specific project
    function withdrawFunder(uint256 projectId) public {
        Project storage project = projects[projectId];
        require(
            !isFundEnabled(project) && !isFundSuccess(project),
            "Funds can't be withdrawn"
        );

        uint256 balance = project.funders[msg.sender];
        require(balance > 0, "No funds to withdraw");

        project.funders[msg.sender] = 0; // Prevent re-entrancy

        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Unable to send funds");
        emit FunderWithdrawn(projectId, msg.sender, balance);
    }

    // Get project details
    function getProject(
        uint256 projectId
    )
        public
        view
        returns (
            string memory name,
            uint256 targetFunds,
            uint256 deadline,
            address owner,
            uint256 totalFunded,
            bool fundsWithdrawn
        )
    {
        Project storage project = projects[projectId];
        return (
            project.name,
            project.targetFunds,
            project.deadline,
            project.owner,
            project.totalFunded,
            project.fundsWithdrawn
        );
    }
}
