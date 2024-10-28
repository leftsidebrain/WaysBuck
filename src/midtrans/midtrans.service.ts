import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MidtransService {
  private readonly serverKey: string;
  private readonly apiUrl: string;

  constructor(private configService: ConfigService) {
    this.serverKey = this.configService.get<string>('MIDTRANS_SERVER_KEY');
    this.apiUrl = 'https://app.sandbox.midtrans.com/snap/v1/transactions'; // Ganti ke URL produksi jika siap
  }

  async createTransaction(body: any) {
    const payload = {
      transaction_details: body.transaction_details,
      customer_details: body.customer_details,
      item_details: body.item_details,
    };

    try {
      const response = await axios.post(`${this.apiUrl}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(this.serverKey + ':').toString('base64')}`,
        },
      });

      return response.data;
    } catch (error) {
      // Periksa apakah respons kesalahan memiliki data
      if (error.response) {
        console.error('Midtrans API Error:', error.response.data);
      }
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }

  async getTransactionStatus(orderId: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/${orderId}/status`, {
        headers: {
          Authorization: `Basic ${Buffer.from(this.serverKey + ':').toString('base64')}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Midtrans API Error:', error.response.data);
      }
      throw new Error(`Failed to get transaction status: ${error.message}`);
    }
  }
}
