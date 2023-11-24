<script setup lang="ts">
const polyatomic = ref(true);
const ionic = ref(true);
const current = ref({ name: "Loading", formula: "" });
const findName = ref(true);
const input = ref("");
const err = ref("");
setInterval(() => {
	input.value = subscript(input.value);
}, 1);
const submit = () => {
	const content = input.value.toLowerCase().replaceAll(" ", "").trim();
	if (findName.value) {
		if (content === current.value.name.toLowerCase().replaceAll(" ", "")) {
			generate();
			input.value = "";
			err.value = "";
		} else err.value = "Wrong";
	} else {
		if (
			content === current.value.formula.toLowerCase().replaceAll(" ", "")
		) {
			generate();
			err.value = "";
			input.value = "";
		} else err.value = "Wrong";
	}
};

const generate = () => {
	if (!ionic.value) {
		const first = sample(nonmetals);
		const second = sample(nonmetals.filter(x => first !== x));
		const firstNum = 1 + Math.floor(Math.random() * 10);
		const secondNum = 1 + Math.floor(Math.random() * 10);
		const firstName =
			firstNum === 1 ? first.Name : greekPrefix(first.Name, firstNum);
		const secondName = greekPrefix(anionName(second.Name), secondNum);
		current.value = {
			name: `${firstName} ${secondName}`,
			formula: subscript(
				`${first.Symbol}${firstNum === 1 ? "" : firstNum}${
					second.Symbol
				}${secondNum === 1 ? "" : secondNum}`
			),
		};
		return;
	}
	const anion = polyatomic.value
		? sample(polyatomicIons.filter(x => x.charge < 0))
		: sample(
				periodicTable.filter(
					x => groupCategory(x.GroupBlock) == "nonmetal"
				)
		  );
	const cation = sample(
		periodicTable.filter(x => groupCategory(x.GroupBlock) === "metal")
	);
	const anionCharge =
		"charge" in anion
			? anion.charge
			: sample(anion.OxidationStates.filter(x => x < 0));
	const cationCharge = sample(cation.OxidationStates.filter(x => x > 0));
	const anionNumber = Math.abs(cationCharge / gcd(anionCharge, cationCharge));
	const cationNumber = Math.abs(anionCharge / gcd(anionCharge, cationCharge));
	const name = subscript(
		`${cation.Symbol}${cationNumber === 1 ? "" : cationNumber}${
			"formula" in anion
				? anionNumber > 1
					? `(${anion.formula})`
					: anion.formula
				: anion.Symbol
		}${anionNumber === 1 ? "" : anionNumber}`
	);
	current.value = {
		formula: name,
		name: `${cation.Name}${
			cation.OxidationStates.length > 1 ? `(${roman(cationCharge)})` : ""
		} ${"name" in anion ? anion.name : anionName(anion.Name)}`,
	};
};
generate();
</script>
<template>
	<section class="settings">
		<div>
			Bond:
			<button @click="ionic = !ionic">
				{{ ionic ? "Ionic" : "Covalent" }}
			</button>
		</div>
		<div>
			Anion:
			<button @click="polyatomic = !polyatomic">
				{{ polyatomic ? "Polyatomic" : "Element" }}
			</button>
		</div>
		<div>
			Find:
			<button
				@click="
					findName = !findName;
					generate();
				"
			>
				{{ findName ? "Name" : "Formula" }}
			</button>
		</div>
	</section>
	<button @click="generate()">Reload</button>
	<h1>Find The {{ findName ? "Name" : "Formula" }}</h1>
	<h2>{{ findName ? current.formula : current.name }}</h2>
	<input
		v-model="input"
		@change="
			err = '';
			input = subscript(input);
		"
		@keypress="
			e => {
				e.key === 'Enter' && submit();
			}
		"
	/>
	<button @click="submit()">Submit</button> {{ err }}
</template>
<style></style>
