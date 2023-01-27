const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("UsdcCrowdfund contract", function(){
    // global vars
    let CrowdfundContract;
    let owner;
    let addr1;
    let addr2;
    let usdcContract = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
    let UsdcCrowdfund;

    this.beforeEach(async function () {
        // Getting the contract factory and signers
        CrowdfundContract = await ethers.getContractFactory("usdcCrowdfund");
        [owner, addr1, addr2] = await hre.ethers.getSigners();

        UsdcCrowdfund = await CrowdfundContract.deploy(usdcContract);
    });

    describe("Deployment", function() {
        it("should set the owner", async function() {
            expect(await UsdcCrowdfund.owner()).to.equal(owner.address);
        });

        it("should confirm the address of the usdc token", async function() {
            expect(await UsdcCrowdfund.usdc()).to.equal(usdcContract);
        });

    });

    describe("Functions", function() {
        it("should list a campaign", async function() {
            let id;
            let title = "school fees payment";
            let purpose = "please help";
            let target = 20;
            let startTime = 4;
            let endTime = 10;
            await UsdcCrowdfund.listCampaign(title,purpose,target,startTime,endTime);
            const campaign = await UsdcCrowdfund.campaigns(1);
            
            expect(campaign.CampaignNo).to.equal("1");
            expect(campaign.Title).to.equal(title);
            console.log(campaign.CampaignNo);

        });


    });


})
