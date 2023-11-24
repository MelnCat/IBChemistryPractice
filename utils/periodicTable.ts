import type { periodicTable } from "./PubChemElements_all";
import { subscript } from "./text";

type GroupBlock = (typeof periodicTable)[number]["GroupBlock"];

export const groupCategory = (group: GroupBlock) => {
	switch (group) {
		case "Noble gas":
			return "noble gas" as const;
		case "Nonmetal":
		case "Halogen":
			return "nonmetal" as const;
		case "Alkali metal":
		case "Alkaline earth metal":
		case "Post-transition metal":
		case "Transition metal":
		case "Lanthanide":
		case "Actinide":
			return "metal" as const;
		case "Metalloid":
			return "metalloid" as const;
	}
};

export const polyatomicIons = (
	[
		["Ammonium", "NH4", 1],
		["Hydroxide", "OH", -1],
		["Nitrate", "NO3", -1],
		["Hydrogen Carbonate", "HCO3", -1],
		["Carbonate", "CO3", -2],
		["Sulfate", "SO4", -2],
		["Phosphate", "PO4", -3],
		["Cyanide", "CN", -1],
		["Ethanoate", "CH3COO", -1],
	] as const
).map(x => ({ name: x[0], formula: subscript(x[1]), charge: x[2] }));

export const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
