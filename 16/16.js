const { exampleToArray, fileToArray } = require("../input-parser");

const input = fileToArray("./16.txt", false);

const hexToBin = (hex) => parseInt(hex, 16).toString(2).padStart(4, "0");
const binToHex = (bin) => parseInt(bin, 2).toString(16).toUpperCase();
const binToDec = (bin) => parseInt(bin, 2);

const getPacketVersion = (packet) => +binToHex(packet.substring(0, 3));

const processLiteralPacket = (packetBin) => {
  const packetBits = packetBin.substring(6);
  let numberInBin = "";
  const groups = packetBits.match(/.{5}/g);
  let consumedBitsLength = 0;
  let parse = true;

  groups.forEach((group) => {
    if (!parse) return;
    if (group[0] == 0) parse = false;
    numberInBin += group.substring(1);
    consumedBitsLength += 5;
  });

  const remainder = packetBits.substring(consumedBitsLength);

  return {
    version: getPacketVersion(packetBin),
    packet: packetBin.substring(0, 6 + consumedBitsLength),
    remainder,
    decimalValue: binToDec(numberInBin),
  };
};

const processOperationalPacket = (packetBin) => {};

class Packet {
  constructor({ version, packet, decimalValue }) {
    this.version = version;
    this.packet = packet;
    this.decimalValue = decimalValue;
  }
}

let packets = [];
const processPacket = (packet, convertToBin = false) => {

  const binaryString = convertToBin
    ? packet
        .split("")
        .map((val) => hexToBin(val))
        .join("")
    : packet;

  let packetVersion = getPacketVersion(binaryString);
  const packetTypeId = binToHex(binaryString.substring(3, 6));
  let packetData = binaryString.substring(6);

  const isLiteralPacket = packetTypeId == 4;

  if (isLiteralPacket) return processLiteralPacket(binaryString);
  else {
    // Operators
    const lengthTypeId = packetData[0];
    let subPackets = [];

    if (lengthTypeId == 0) {
      const totalSubPacketLength = binToDec(packetData.substring(1, 16));
      let subPacketsBinary = packetData.substring(16);
      let parse = true;

      while (parse) {
        const discoveredPacket = processPacket(subPacketsBinary);
        console.log(discoveredPacket)
        packets.push(new Packet(discoveredPacket));

        const { remainder, packet } = discoveredPacket;
        subPacketsBinary = remainder;
        subPackets.push(packet);
        parse = subPackets.join("").length < totalSubPacketLength;
      }
    } else if (lengthTypeId == 1) {
      const numPackets = binToDec(packetData.substring(1, 12));
      let subPackets = [];
      let subPacketsBinary = packetData.substring(12);
      let parse = true;

      while (parse) {
        const discoveredPacket = processPacket(subPacketsBinary);
        console.log(discoveredPacket)
        packets.push(new Packet(discoveredPacket));

        const { remainder, packet } = discoveredPacket;
        console.log(remainder, packet)

        subPacketsBinary = remainder;
        subPackets.push(packet);
        parse = subPackets.length < numPackets;
      }
    }

    console.log(convertToBin)
    if (!convertToBin) return {
      version: packetVersion,
      packet: binaryString.substring(0, subPackets.join("").length),
      remainder: binaryString.substring(subPackets.join("").length)
    }
  }

  packets.unshift(
    new Packet({
      version: packetVersion,
      packet: binaryString,
      decimalValue: undefined,
    })
  );
};

// processPacket("8A004A801A8002F478", true)
processPacket("620080001611562C8802118E34", true)
console.log(packets)
const sumPacketsVersion = packets.reduce((sum, packet) => sum + packet.version, 0);
console.log("P1", sumPacketsVersion);
// console.log("---")
// console.log(`Complex example 2: ${}`);
// processPacket(input);
