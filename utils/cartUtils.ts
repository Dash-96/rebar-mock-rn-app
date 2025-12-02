import { Upgrade } from "@/models/productModel";

export function getSizeSymbol(size: string) {
  return size.toUpperCase().substring(0, 1);
}

export function flattenUpgrades(upgrades: Upgrade[]): Partial<Upgrade>[] {
  let flatArray: Partial<Upgrade>[] = [];
  upgrades.forEach((upgrade) => {
    for (let i = 0; i < upgrade.quaintity; i++) {
      flatArray.push({ title: upgrade.title, price: upgrade.price });
    }
  });
  return flatArray;
}
