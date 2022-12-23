import { Contract, ethers } from "ethers";

export class DonateService {

    static async donate(contract: Contract, amountInEther: number): Promise<void[]> {
        const amountInWei = amountInEther * 10 ** 18;
        return await contract.donate({ value: amountInWei });
    }

    static async getTotalDonationsAmount(contract: Contract): Promise<string> {
        const totalDonationsAmount = await contract.getTotalDonationsAmount();
        return ethers.utils.formatEther(totalDonationsAmount);
    }

    static async getHighestDonation(contract: Contract): Promise<{ highestDonationInEther: string, highestDonorAddress: string }> {
        const highestDonation = await contract.getHighestDonation();
        return {
            highestDonationInEther: ethers.utils.formatEther(highestDonation[0]),
            highestDonorAddress: highestDonation[1]
        };
    }
}