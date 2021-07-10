import IPFS from "ipfs";

import { libp2pConfig } from "./libp2p-config.mjs";

const node = await IPFS.create({
    silent: false,
    libp2p: libp2pConfig()
});

const added = await node.add("Hello World, private network!");
console.log("\nadded: %s", added);

const content = node.cat(added.cid);
for await (const chunk of content) {
    console.log(chunk.toString());
}
