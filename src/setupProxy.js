const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        ['/api/v3/ticker', '/api/v3/trades'],
        createProxyMiddleware({
            target: 'https://api.binance.com',
            changeOrigin: true,
        }),
    );

    app.use(
        ['/v2/ticker', '/v2/trades'],
        createProxyMiddleware({
            target: 'https://api-pub.bitfinex.com/',
            changeOrigin: true,
        }),
    );

    app.use(
        '/0/public',
        createProxyMiddleware({
            target: `https://api.kraken.com/`,
            changeOrigin: true,
        }),
    );
    app.use(
        ['/market/detail', '/market/history'],
        createProxyMiddleware({
            target: `https://api.huobi.pro`,
            changeOrigin: true,
        }),
    );
};
