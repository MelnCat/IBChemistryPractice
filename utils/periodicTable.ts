import { subscript } from "./text";

type GroupBlock = (typeof periodicTable)[number]["GroupBlock"];

export const greekPrefix = (s: string, n: number) => s.toLowerCase() === "oxide" ? [
	"?ERR?", "Monoxide", "Dioxide", "Trioxide", "Tetroxide", "Pentoxide", "Hexoxide", "Heptoxide", "Octoxide", "Nonoxide", "Decoxide"
][n] :
	(
		[
			"?ERR?",
			"Mono",
			"Di",
			"Tri",
			"Tetra",
			"Penta",
			"Hexa",
			"Hepta",
			"Octa",
			"Nona",
			"Deca",
		][n] + s.toLowerCase()
	);

export const anionName = (e: string) =>
	({
		Hydrogen: "Hydride",
		Carbon: "Carbide",
		Nitrogen: "Nitride",
		Oxygen: "Oxide",
		Fluorine: "Fluoride",
		Phosphorus: "Phosphide",
		Sulfur: "Sulfide",
		Chlorine: "Chloride",
		Selenium: "Selenide",
		Bromine: "Bromide",
		Iodine: "Iodide",
		Astatine: "Astatide",
	}[e]) ?? e;


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

export const nonmetals = periodicTable.filter(
	x => groupCategory(x.GroupBlock) == "nonmetal"
);
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
