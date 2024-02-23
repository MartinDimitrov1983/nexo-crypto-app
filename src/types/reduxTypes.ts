export interface PlatformState {
    data: {
              symbol: string;
              price: string;
              error?: string;
          }
        | undefined;
    trades: [];
    isLoading: Boolean;
    isTradeLoading: Boolean;
}

export type TradeActionParams = {
    symbol: string;
    limit?: number;
};
