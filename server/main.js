import * as server from "./main/server.js";
/*
const config = JSON.parse(
	await fs.readFile(new URL("./config.json", import.meta.url))
);*/

process.title = "Proyecto Armony";

try {
	await server.iniciar();
} catch (e) {
	console.log(
		e.stack +
			"\n\nError de inicialización. El programa no continuará con su " +
			"ejecución."
	);
	process.exit(1);
}
