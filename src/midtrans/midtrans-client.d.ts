declare module 'midtrans-client' {
  class Snap {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey: string;
    });
    createTransaction(parameters: any): Promise<any>;
    transaction: {
      notification(body: any): Promise<any>;
    };
  }

  export { Snap };
}
