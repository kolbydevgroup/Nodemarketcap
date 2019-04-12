##// CURRENT:
##// list of topics by {TOPIC:[["TITLE", "URL"]]}
##
##// FUTURE:
##////list of topics by {TOPIC:[["TITLE", "URL", "TAGS",""],
##////                          ["TITLE", "URL", "TAGS"]]}
##["lowercasecoinname", "lower case ticker", " uppercaseticker", "1", "2", "discordlink", "bitcointalk link", "github link", "twitter link", "website link", "explorer link", "exchange link 1", "exhcange name 1", "exchange link 2", "exchange name 2", "['enabled'] only if it is a fork of pivx or pos coin", "masternode colatrol cost"]
def Content():
    TOPIC_DICT = {"coin":[["curium", "cru", "CRU", "1", "2", "Curium (CRU)", "https://discord.gg/BNxtX7b", "https://bitcointalk.org/index.php?topic=3076542.0", "https://github.com/curiumofficial/curium", "https://twitter.com/CuriumOfficial", "https://curiumofficial.com", "http://explorer.curiumofficial.com", "https://app.stocks.exchange/en/basic-trade/pair/BTC/CRU/1D", "Stocks Exchange", "https://graviex.net/markets/crubtc", "Graviex", "['enabled']", "10000"],
							["gincoin", "gin", "GIN", "0", "1", "Gincoin (GIN)", "https://discord.gg/RTgVNxR", "https://bitcointalk.org/index.php?topic=2998031", "https://github.com/gincoin-dev/gincoin-core", "https://twitter.com/gincoin_crypto", "https://gincoin.io", "https://explorer.gincoin.io", "https://www.cryptopia.co.nz/Exchange?market=GIN_BTC", "Cryptopia", "https://wallet.crypto-bridge.org/market/BRIDGE.GIN_BRIDGE.BTC", "CryptoBridge", "", "1000"],
							["genesisx", "xgs", "XGS", "1", "2", "GenesisX (XGS)", "https://discord.gg/qJtah9A", "https://bitcointalk.org/index.php?topic=4408230.new#new", "https://github.com/genesis-x/genesis-x/releases", "https://twitter.com/GenesisX_XGS", "https://genesisx.net", "http://explorer.genesisx.net", "https://wallet.crypto-bridge.org/market/BRIDGE.XGS_BRIDGE.BTC", "Cryptobridge", "https://tradeogre.com/exchange/BTC-XGS", "Tradeogre", "['enabled']", "5000"],
							["zealium", "nzl", "NZL", "1", "2", "Zealium (NZL)", "https://discord.gg/NqSkngG", "https://bitcointalk.org/index.php?topic=3126497.0", "https://github.com/zealiumcoin/Zealium/releases", "https://twitter.com/ZealiumCoin", "https://zealium.co.nz/", "https://explorer.zealium.co.nz/", "https://wallet.crypto-bridge.org/market/BRIDGE.NZL_BRIDGE.BTC", "cryptobridge", "https://wallet.escodex.com/market/ESCODEX.NZL_ESCODEX.BTC", "escodex", "['enabled']", "4000"],
							["bitcloud", "btdx", "BTDX", "1", "2", "BitCloud (BTDX)", "https://discord.gg/kgWVGD2", "https://bitcointalk.org/index.php?topic=2092583.0", "https://github.com/LIMXTEC/Bitcloud", "https://twitter.com/bitcloud_btdx", "https://bit-cloud.info", "https://chainz.cryptoid.info/btdx/", "https://www.cryptopia.co.nz/Exchange?market=BTDX_BTC", "Cryptopia", "https://wallet.crypto-bridge.org/market/BRIDGE.BTDX_BRIDGE.BTC", "CryptoBridge", "['enabled']", "10000"],
							["carebit", "care", "CARE", "1", "2", "Carebit (CARE)", "https://discord.gg/BBBms9Z", "https://bitcointalk.org/index.php?topic=3156446.0", "https://github.com/carebitcoin/carebitcoin", "https://twitter.com/CarebitAdmin", "https://carebit.org/", "http://chain.carebit.org", "https://wallet.crypto-bridge.org/market/BRIDGE.CARE_BRIDGE.BTC", "Crypto-Bridge", "https://graviex.net/markets/carebtc", "Graviex", "['enabled']", "120000"],
							["gobyte", "gbx", "GBX", "0", "0", "GoByte (GBX)", "https://discord.gg/3qUBEE9", "https://bitcointalk.org/index.php?topic=2442185.0", "https://github.com/gobytecoin/gobyte", "https://twitter.com/gobytenetwork", "https://gobyte.net/", "https://explorer.gobyte.network/", "https://www.cryptopia.co.nz/Exchange?market=GBX_BTC", "Cryptopia", "https://hitbtc.com/exchange/GBX-to-BTC", "HitBTC", "", "1000"],
							["xchange", "xcg", "XCG", "0", "0", "Xchange (XCG)", "https://discord.gg/PWUbfYc", "https://bitcointalk.org/index.php?topic=4472626.0", "https://github.com/Xcgtech/", "https://twitter.com/Xchange_XCG", "https://xcgtech.com/", "https://explorer.xcgtech.com/", "https://www.coinexchange.io/market/XCG/BTC", "CoinExchange", "https://btc-alpha.com/exchange/XCG_BTC/", "BTC-Alpha", "", "50000"],
							["nix", "nix", "NIX", "1", "2", "NIX Platform (NIX)", "https://discord.gg/agAsvQY", "https://bitcointalk.org/index.php?topic=3454993.0", "https://github.com/NixPlatform/NixCore/", "https://twitter.com/nixplatform", "https://nixplatform.io/", "https://blockchain.nixplatform.io/", "https://www.idax.mn/#/exchange?pairname=NIX_BTC", "IDAX", "https://nanex.co/exchange/NIXNANO", "NANEX", "", "40000"],
							["keyco", "kec", "KEC", "1", "2", "Keyco (KEC)", "https://discord.gg/fgJQ3RA", "https://bitcointalk.org/index.php?topic=3419937.0", "https://github.com/keycoteam", "https://twitter.com/KeycoBot", "https://keyco.io", "http://80.211.196.242/", "https://wallet.crypto-bridge.org/market/BRIDGE.KEC_BRIDGE.BTC", "Crypto Bridge", "https://graviex.net/markets/kecbtc", "Graviex", "['enabled']", "1000"],
							["kreds", "kreds", "KREDS", "0", "1", "Kreds (KREDS)", "https://discord.gg/k8ShNag",
"https://bitcointalk.org/index.php?topic=2886837.0", "https://github.com/KredsBlockchain/kreds-core", " https://twitter.com/kredsblockchain", "https://www.kredsblockchain.com", "https://www.kredsexplorer.com", "https://wallet.crypto-bridge.org/market/BRIDGE.KREDS_BRIDGE.BTC", "Crypto-bridge", "https://www.southxchange.com/Market/Book/KREDS/BTC", "SouthXchange",  "['enabled']", "100000"],							
							["sub1x", "sub1x", "SUB1X", "1", "2", "SUB1X (SUB1X)", "https://discord.gg/Bd7Cfbe", "https://bitcointalk.org/index.php?topic=3094567.0", "https://github.com/SuB1X-Coin/zSub1x", "https://twitter.com/sub_1x_?lang=en-gb", "https://sub1x.org/", "http://explorer.sub1x.org/", "https://wallet.crypto-bridge.org/market/BRIDGE.SUBIX_BRIDGE.BTC", "CryptoBridge", "", "", "['enabled']", "20" ],
							["h2ocoin", "h2o", "H2O", "1", "2", "H2Ocoin (H2O)", "https://discord.gg/7htKUpK", "https://bitcointalk.org/index.php?topic=4437496", "https://github.com/h2ocore/h2o", "https://twitter.com/H2OCOIN",  "http://h2ocore.org/", "http://explorer.h2ocore.org/", "https://graviex.net/markets/h2obtc","Graviex", "", "", "", "15000"],
							["alqo", "xlq", "XLQ", "1", "2", "ALQO (XLQ)", "https://discord.gg/BNxtX7b", "https://bitcointalk.org/index.php?topic=2343884.0", "https://github.com/ALQOCRYPTO/ALQO", "https://twitter.com/ALQOCOIN", "https://alqo.org/", "https://explorer.alqo.org/overview", "https://wallet.crypto-bridge.org/market/BRIDGE.ALQO_BRIDGE.BTC", "Crypto Bridge", "https://app.stocks.exchange/en/basic-trade/pair/BTC/ALQO/1D", "Stocks.Exchange", "['enabled']", "10000"],
							["catocoin", "cato", "CATO", "1", "2", "CatoCoin (CATO)", "https://discord.gg/kNxfaZq", "https://bitcointalk.org/index.php?topic=4532077.0", "https://github.com/CatoCoin/CatoCoin", "https://twitter.com/catocoin", "https://catocoin.net/", "http://explorer.catocoin.info/", "https://wallet.crypto-bridge.org/market/BRIDGE.CATO_BRIDGE.BTC", "Crypto-Bridge", "https://www.coinexchange.io/market/CATO/BTC", "Coinexchange.io", "['enabled']", "3600"],
							["lunarium", "xln", "XLN", "1", "2", "Lunarium (XLN)", "https://discord.gg/4nFZeJr", "", "https://github.com/LunariumCoin", "https://twitter.com/lunariumcoin/", "https://www.lunarium.io/", "http://explorer.lunarium.io/", "https://crex24.com/exchange/XLN-BTC", "Crex24", "", "", "['enabled']", "10000"],

                            ["dash","dashinfo"]],
							}

    return TOPIC_DICT








if __name__ == "__main__":
    x = Content()

    print(x["Basics"])

    for each in x["Basics"]:
        print(each[1])