// grains.gnocchi_noodles_pasta.pasta.tube_pasta
/*
Almond flour would be under "grains.flours.gluten_free.tree_nuts" and semolina, spelt and AP flour would be under "grains.flours.gluten.wheat".   Masa harina under "grains.flours.gluten_free.hominy", and corn flour (since it's not nixtalmalized like masa) under "grains.flours.gluten_free.corn".   Same deal with corn meal vs grits: grits is "grains.meals.gluten_free.hominy" and corn meal "grains.meals.gluten_free.corn".

*/
export default const: GrainsTableData = {
	"grains": {
		"doughs": {
			"cassava": [
				{ name: "Pearl Tapioca" },
			],
		},
		"flours": {
			"gluten": {
				"rye": [
					{ name: "Dark Rye Flour" },
				],
				"oat": [
					{ name: "Oat Flour" },
				],
				"wheat": [
					{ name: "All Purpose Flour" },
					{ name: "Bread Flour" },
					{ name: "Semolina" },
					{ name: "Spelt" },
					{ name: "Whole Wheat Flour" },
					{ name: "Sprouted Whole Wheat Flour" },
				],
			},
			"gluten_free": {
				"tree_nuts": [
					{ name: "Almond Flour", notably_contains: "Almond" },
					{ name: "Coconut Flour", notably_contains: "Coconut"}
				],
				"beans": [
					{ name: "Bean Flour" },
				],
				"cassava": [
					{ name: "Cassava Flour" },
				],
				"arrowroot": [
					{ name: "Arrowroot Powder" },
				],
				"tapioca": [
					{ name: "Tapioca Flour" },
				],
				"flaxseed": [
					{ name: "Ground Flaxseed" },
				],
				"buckwheat": [
			ls
					{ name: "Buckwheat Flour" },
				],
				"corn": [
					{ name: "Corn Flour" },
				],
				"hominy": [
					{ name: "Masa Harina" }
				],
			},
		},
		"meals": {
			"tree_nuts": [
				{ name: "Almond Flour" },
			],
			"flaxseed": [
				{name: "Flaxseed Meal"},
			],
			"corn": [
				{ name: "Corn Meal" },
				{ name: "Dry Polenta" }
			],
			"hominy": [
				{ name: "Corn Grits" }
			],
		},
		"gnocchi_noodles_and_pasta": {
			"gnocchi": [{
				name: "Gnocchi"
			}],
			// pastas are wheat based. If it's not made of wheat it's a noodle.
			"pasta": {
				"shells": [
					{ name: "Shell Pasta" },
				],
				"lasagna": [
					{ name: "Lasagna" },
				],
				"flat_long": [
					{ name: "Linguine" },
					{ name: "Fetuccine" },
				],
				"pastina": [
					{ name: "Orzo" },
					{ name: "Alphabet Pasta" },
					{ name: "Anelli" },
					{ name: "Ditalini" },
					{ name: "Stelline" },
				],
				"very_thin": [
					{ name: "Capellini" },
					{ name: "Angel Hair" },
					{ name: "Vermecelli" },
				],
				"spaghetti": [
					{ name: "Spaghetti"},
					{ name: "Whole Wheat Spaghetti" },
					{ name: "Bucatini" },
				],
				"ruffled_pasta": [
					{ name: "Farfalle" },
					{ name: "Reginetti" },
					{ name: "Fusilli" },
					{ name: "Rotini" },
				],
				"tube_pasta": [
					{ name: "Casarecce" },
					{ name: "Rigatoni" },
					{ name: "Penne Rigate" },
					{ name: "Ziti" },
					{ name: "Tortiglioni" },
				],
				"elbow_pasta" [
					{ name: "Lumache" },
					{ name: "Macaroni" },
					{ name: "Cavatappi" },
				]
			},
			"gluten_free_pasta": {
				"rigatoni": [
					{
						name: "Chickpea Rigatoni",
						notably_contains: ["Chickpea"]
					},
				],
				"spaghetti": [
					{
						name: "Konjac Spaghetti",
						notably_contains: ["Konjac"]
					},
					{
						name: "Quinoa Spaghetti",
						notably_contains: ["Quinoa"],
					},
					{
						name: "Rice Spaghetti",
						notably_contains: ["Rice"],
					},
					{
						name: "Egg White Spaghetti",
						notably_contains: ["Egg"],
				    },
				    { 
						name: "Cassava Spaghetti",
						notably_contains: ["Cassava Flour"],
					},
				],
			},
		},
		"groats": {
			"gluten": {
			},
		},
		"rice": {

		}
	}
}