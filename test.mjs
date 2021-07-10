import IPFS from "ipfs";

import { libp2pConfig } from "./libp2p-config.mjs";

if (process.argv.length < 3) {
    console.log('node test.mjs <cid>');
    process.exit(1);
}

const node = await IPFS.create({
    silent: false,
    libp2p: libp2pConfig()
});

const cid = process.argv[2];
console.log("\nread cid: %s", cid);
const stream = node.cat(cid);
for await (const chunk of stream) {
    console.log(chunk.toString());
}
