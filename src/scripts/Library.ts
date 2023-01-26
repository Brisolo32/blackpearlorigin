import { invoke } from '@tauri-apps/api/tauri';
import type { Game } from './Interfaces';

/**
 * Typescript Function -> Rust Function
 * - Starts the game on the path argument
 *
 * @param {string} path
 * @returns {Promise<void>} Nothing
 */
export const runGame = async (path: string): Promise<void> =>
	await invoke('run_game', { path: path });

/**
 * Typescript Function -> Rust Function
 * - Deletes the game from the DB using the id
 *
 * @param {number} id
 * @returns {Promise<void>} Nothing
 */
export const deleteGame = async (id: number): Promise<void> => {
	await invoke('delete_from_db', { id: id })
		.then(() => {
			console.log('Deleted from db');
		})
		.catch((error) => {
			console.log(error);
		});
};

/**
 * Typescript Function -> Rust Function
 * - Gets all games from the DB and returns it
 * 	 as an Array of objects
 *
 * @returns {Promise<unknown>} An array of games object
 */
export const getGames = async (): Promise<unknown> => {
	const games = await invoke('get_from_db')
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.log(error);
			return error;
		});
	return games;
};

/**
 * Typescript Function -> Rust Function
 * - Saves game on DB
 *
 * @param title
 * @param executablePath
 * @param description
 * @param imagePath
 * @returns {Promise<void>} Nothing
 */
export const saveData = async (
	title: string,
	executablePath: string,
	description: string,
	imagePath: string
): Promise<void> => {
	await invoke('save_to_db', {
		title: title,
		exePath: executablePath,
		description: description,
		image: imagePath,
	})
		.then(() => {
			console.log('Saved to db');
		})
		.catch((error) => {
			console.log(error);
		});
};

/**
 * Typescript Function -> Rust Function
 * - Edits games in DB based on the id
 *
 * @param {number} id
 * @param {string} title
 * @param {string} executablePath
 * @param {string} description
 * @param {string} imagePath
 * @returns {Promise<void>} Nothing
 */
export const editData = async (
	id: number,
	title: string,
	executablePath: string,
	description: string,
	imagePath: string
): Promise<void> => {
	await invoke('edit_in_db', {
		id: id,
		name: title,
		executable: executablePath,
		description: description,
		image: imagePath,
	})
		.then(() => {
			console.log('Edited in db');
		})
		.catch((error) => {
			console.log(error);
		});
};

/**
 * Typescript Function
 * - Filters games based on an array given and query params
 *
 * @param games
 * @param gameToSearch
 * @returns {Game[]} An array of type Game[]
 */
export const getFilteredGames = (
	games: Game[],
	gameToSearch?: string
): Game[] => {
	if (typeof gameToSearch !== 'undefined') {
		return games.filter((game) => {
			return game.name.toLowerCase().includes(gameToSearch.toLowerCase());
		});
	} else {
		return games;
	}
};

/**
 * Typescript Functiom
 * - Runs the function inside the params
 *
 * @param {VoidFunction} operation
 * @returns {Promise<void>} Nothing
 */
export const operationHandler = async (operation: () => void): Promise<void> =>
	operation();
