import { useEffect, useRef, useState } from "react";

export function useSearch() {
	const [search, setSearch] = useState("");
	const [error, setError] = useState("");
	const isFirstInput = useRef(true);

	useEffect(() => {
		if (isFirstInput.current) {
			isFirstInput.current = search === "";
			return;
		}
		if (search === "") {
			setError("No se puede buscar una pelicula vacia");
			return;
		}

		if (search.match(/^\d+$/)) {
			setError("No se puede buscar una pelicula con numero");
			return;
		}

		if (search.length < 3) {
			setError("La busqueda debe tener al menos 3 caracteres");
			return;
		}
		if (search.startsWith(" ")) {
			setError("No se puede empezar la busqueda con un espacio");
			return;
		}

		setError(null);
	}, [search]);

	return { search, setSearch, error };
}
