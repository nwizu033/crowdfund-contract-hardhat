const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");



describe("UsdcCrowdfund contract", async function(){
    // global vars
    let CrowdfundContract;
    let owner;
    let addr1;
    let addr2;
    let usdcContract = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
    let UsdcCrowdfund;
    let usdcCont;
    let usdcToken;

    this.beforeEach(async function () {
        // Getting the contract factory and signers
        CrowdfundContract = await ethers.getContractFactory("usdcCrowdfund");
        usdcCont = await ethers.getContractFactory("USDC");
        [owner, addr1, addr2] = await hre.ethers.getSigners();

        UsdcCrowdfund = await CrowdfundContract.deploy(usdcContract);
        // usdcToken = await usdcCont.getContractAt();
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
            let title = "school fees paymentss";
            let purpose = "please help oo";
            let target = 20;
            let startTime = 1;
            let endTime = 200;

        this.beforeEach(async function () {
            
            await UsdcCrowdfund.listCampaign(title,purpose,target,startTime,endTime);
        });

        it("should list a campaign", async function() {

            const campaign = await UsdcCrowdfund.campaigns(1);
            
            expect(campaign.CampaignNo).to.equal(1);
            expect(campaign.Title).to.equal(title);   
           
            
        });



        it("should return all campaigns", async function() {
            let amount = 20;
            await helpers.time.increase(60);
            await usdcToken.approve(UsdcCrowdfund.address(), amount)
            const campaign = await UsdcCrowdfund.campaigns(1);
            await UsdcCrowdfund.pledge(campaign.CampaignNo, amount);
            expect(campaign.Raised).to.equal(amount);
        
        });


    });


})
